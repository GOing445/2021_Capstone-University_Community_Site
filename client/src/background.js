browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Hellloooooooooooooooooooooo!");
  console.log("Hello from the background", request, sender, sendResponse);
  request.onMessage.addListener(function () {
    var newURL = "http://nisuwainc.cafe24app.com/auth/google";
    chrome.tabs.create({ url: newURL });
  });
});

chrome.extension.onConnect.addListener(function (port) {
  console.log("Connected .....");
  port.onMessage.addListener(function (msg) {
    console.log("message recieved" + msg);
    port.postMessage("Hi Popup.js");
    var newURL = "http://nisuwainc.cafe24app.com/auth/google";
    chrome.tabs.create({ url: newURL });
  });
});
