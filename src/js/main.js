var typeNumber = 4;
var errorCorrectionLevel = 'L';
l = document.links;
for(var i=0; i<l.length; i++) {
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(l[i].href);
  qr.make();
  var qrc = document.createElement("div");
  qrc.innerHTML = "<h2>"+l[i].innerHTML+"</h2><p>"+l[i].href+"</p>"+qr.createImgTag(10, 0, l[i].href);
  document.getElementById("qrcodes").appendChild(qrc);
}
