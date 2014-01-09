//http://www.codewars.com/dojo/katas/5270f22f862516c686000161
String.prototype.toBase64 = (function(){
  var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var b64hash = {}; b64chars.split('').forEach(function(v,i){b64hash[v]=i});
  var b64pos = [18, 12, 6, 0];
  var b64and = b64pos.map(function(v){return 63<<v});
  return function toBase64 () {
    var length = this.length;
    var count, encoded = [], b64string = "";
    var i, extra;
    for (var index=0;index<length;index++) {
      if (!(index % 3)) count = 0;
      count <<= 8;
      count |= this.charCodeAt(index);
      if (index % 3 == 2) encoded.push(count);
      }
    encoded.forEach(function(v){
      for (i=0;i<4;i++)
        b64string += b64chars[ (v & b64and[i]) >> b64pos[i] ];
      });
    if (extra = length % 3) {
      count <<= 24 - 8 * extra;
      for (i=0;i<extra+1;i++)
        b64string += b64chars[ (count & b64and[i]) >> b64pos[i] ];
      for (i=0;i<3-extra;i++)
        b64string += '=';
      }
    return b64string
    }
  })();
  
String.prototype.fromBase64 = (function(){
  var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var b64hash = {}; b64chars.split('').forEach(function(v,i){b64hash[v]=i});
  var asciiPos = [16, 8, 0];
  var asciiAnd = asciiPos.map(function(v){return 255<<v});
  return function fromBase64 () {
    var offset = +(this[this.length-1]=='=') + +(this[this.length-2]=='=');
    var string = this.replace(/=/g,'');
    var length = string.length;
    var count, decoded = [], asciiString = "";
    for (var index=0;index<length;index++) {
      if (!(index % 4)) count = 0;
      count <<= 6;
      count |= b64hash[string[index]];
      if (index % 4 == 3) decoded.push(count);
      }
    if (offset) decoded.push(count << (offset * 6));
    var decLen = decoded.length-1;
    decoded.forEach(function(v,I){
      asciiString += String.fromCharCode.apply(null, 
        (decLen==I ? asciiPos.slice(0,3-offset) : asciiPos)
          .map(function(c,i){return (v & asciiAnd[i]) >> c}))  
      });
    return asciiString
    }
  })()