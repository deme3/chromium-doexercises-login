chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.error(request, sender, sendResponse);
	if (request.action == "getStorage") {
		chrome.storage.local.get(["username", "student_id", "password"], function(items) {
			sendResponse(items);
		});
	}
	return true;
});