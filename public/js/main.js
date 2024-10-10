(()=>{"use strict";var t=function(){function t(){}return t.bytesToAddr=function(t,e){return e<<8|t},t.hex=function(t){return t.toString(16).toUpperCase()},t}();function e(e,r,o){e.setAreg(o),console.log("Loaded ".concat(t.hex(e.getAreg())," into A"))}function r(e,r,o){r.write(e.getAreg(),o),console.log("Stored ".concat(t.hex(e.getAreg())," into memory at ").concat(t.hex(o)))}function o(e,r,o){e.setPC(o),console.log("Jumped to ".concat(t.hex(o)))}var n,i=new Map([[169,{method:e,addrMode:1,cycles:2}],[165,{method:e,addrMode:2,cycles:3}],[181,{method:e,addrMode:3,cycles:4}],[173,{method:e,addrMode:5,cycles:4}],[189,{method:e,addrMode:6,cycles:4}],[185,{method:e,addrMode:7,cycles:4}],[161,{method:e,addrMode:11,cycles:6}],[177,{method:e,addrMode:12,cycles:5}],[133,{method:r,addrMode:2,cycles:3}],[149,{method:r,addrMode:3,cycles:4}],[141,{method:r,addrMode:5,cycles:4}],[157,{method:r,addrMode:6,cycles:5}],[153,{method:r,addrMode:7,cycles:5}],[129,{method:r,addrMode:11,cycles:6}],[145,{method:r,addrMode:12,cycles:6}],[76,{method:o,addrMode:5,cycles:3}],[108,{method:o,addrMode:10,cycles:5}]]),c=new Map([[0,1],[1,1],[2,2],[3,2],[4,2],[5,3],[6,3],[7,3],[8,1],[9,2],[10,3],[11,3],[12,3]]),s=new Map([[0,function(t,e,r){return null}],[1,function(t,e,r){return r[0]}],[2,function(t,e,r){return t.read(r[0])}],[3,function(t,e,r){return t.read(r[0]+e.getXreg())}],[4,function(t,e,r){return t.read(r[0]+e.getYreg())}],[5,function(e,r,o){return e.read(t.bytesToAddr(o[0],o[1]))}],[6,function(e,r,o){return e.read(t.bytesToAddr(o[0],o[1])+r.getXreg())}],[7,function(e,r,o){return e.read(t.bytesToAddr(o[0],o[1])+r.getYreg())}],[8,function(t,e,r){return e.getAreg()}],[9,function(t,e,r){var o=128&~r[0]?r[0]:r[0]-256;return t.read(e.getPC()+o)}],[10,function(e,r,o){var n=e.read(t.bytesToAddr(o[0],o[1]));return e.read(n)}],[11,function(e,r,o){var n=e.read(t.bytesToAddr(o[0],o[1])+r.getXreg());return e.read(n)}],[12,function(e,r,o){var n=e.read(t.bytesToAddr(o[0],o[1]));return e.read(n+r.getYreg())}]]),u=function(){function t(){this.Areg=0,this.Xreg=0,this.Yreg=0,this.PC=32768,this.SP=0,this.Cflag=!1,this.Zflag=!1,this.Nflag=!1}return t.prototype.reset=function(){this.Areg=0,this.Xreg=0,this.Yreg=0,this.PC=32768,this.SP=0,this.Cflag=!1,this.Zflag=!1,this.Nflag=!1},t.prototype.executeOperation=function(t,e){var r=e,o=this.PC-32768,n=r.read(o);if(i.has(n)){for(var u=i.get(n),d=u.addrMode,a=c.get(d),f=new Uint8Array(a),h=0;h<a;h++)f[h]=r.read(o+h);var l=s.get(d)(t,this,f);u.method(this,t,l),this.PC+=a}else console.log("Invalid or unimplemented opcode: ".concat(n)),this.PC++},t.prototype.setPC=function(t){this.PC=t,console.log("SET PC: ",this.PC)},t.prototype.getPC=function(){return this.PC},t.prototype.setAreg=function(t){this.Areg=255&t,this.setFlags(t),console.log("SET AREG: ",this.Areg)},t.prototype.setXreg=function(t){this.Xreg=255&t,this.setFlags(t)},t.prototype.setYreg=function(t){this.Yreg=255&t,this.setFlags(t)},t.prototype.getAreg=function(){return this.Areg},t.prototype.getXreg=function(){return this.Xreg},t.prototype.getYreg=function(){return this.Yreg},t.prototype.setFlags=function(t){if(-1!==t){var e=t;this.Cflag=this.overflow,this.Zflag=0===e,this.Nflag=!(128&~e)}},t.prototype.getFlags=function(){return{Z:this.Zflag,N:this.Nflag,C:this.Cflag}},t}(),d=function(){function t(t,e){this.memory=e||new Uint8Array(t).fill(0)}return t.prototype.read=function(t){return this.memory[t]},t.prototype.write=function(t,e){this.memory[e]=t},t}(),a=(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),f=function(t){function e(e,r){return t.call(this,e,r)||this}return a(e,t),e}(d),h=function(){function t(){this.cpu=new u,this.ram=new f(2048),this.currentPrgRom=null}return t.prototype.loadProgram=function(t){this.cpu.reset(),this.currentPrgRom=t},t.prototype.step=function(){this.cpu.executeOperation(this.ram,this.currentPrgRom)},t}(),l=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}(),g=function(t){function e(e){return t.call(this,e.length,e)||this}return l(e,t),e}(d),p=new Uint8Array(13).fill(0);p[0]=169,p[1]=105,p[2]=133,p[3]=1,p[4]=165,p[5]=1,p[6]=133,p[7]=2,p[8]=76,p[9]=0,p[10]=128;var y=new g(p),m=new h;m.loadProgram(y),setInterval((function(){m.step()}),500)})();