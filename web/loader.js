function convertDataURIToBinary(base64) {
          var raw = window.atob(base64);
          var rawLength = raw.length;

          var array = new Uint8Array(new ArrayBuffer(rawLength));
          for (i = 0; i < rawLength; i++) {
              array[i] = raw.charCodeAt(i) & 0xff;
          }
          return array;
      }

var paramsObj = {};
var parameters = document.location.search.substring(1).split("&");

parameters.forEach(function (item) { paramsObj[item.split("=")[0].toLowerCase()] = item.split("=")[1]; });

let xhr = new XMLHttpRequest();

xhr.open('GET', `https://rest.synatic.com/jaamautomationdev/pdf-viewer/document/${paramsObj.docid}`);
xhr.setRequestHeader('x-api-key', paramsObj.xid);
xhr.send();

var DEFAULT_URL = ''

xhr.onload = function() {
  if (xhr.status == 200) { 
	DEFAULT_URL = convertDataURIToBinary(JSON.parse(this.response).Content);
	var script = document.createElement('script');
	script.src = 'viewer.js';

	document.head.appendChild(script);
	xhr.open('DELETE', `https://rest.synatic.com/jaamautomationdev/pdf-viewer/document/${paramsObj.docid}`);
	xhr.setRequestHeader('x-api-key', paramsObj.xid);
	xhr.send();
  }
};