let changeCCAssistantState = document.getElementById("CCAssistantSwitch");
let changeITSCAssistantState = document.getElementById("ITSCAssistantSwitch");
let refreshState = document.getElementById("AutoRefreshSwitch");
let notificationsState = document.getElementById("NotificationsSwitch");

chrome.storage.sync.get(["enabled", "itsc", "refresh", "notifications"], function(data) {
	changeCCAssistantState.checked = data.enabled;
	changeITSCAssistantState.checked = data.itsc;
	refreshState.checked = data.refresh;
	notificationsState.checked = data.notifications;
});

changeCCAssistantState.onclick = function () {
	let state = changeCCAssistantState.checked;
	
	if (state) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(
				tabs[0].id,
				{allFrames: true, frameId: 0, code: "runCCAssistant()"});
		});
	} else {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(
				tabs[0].id,
				{allFrames: true, frameId: 0, code: "disableCCAssistant();"});
		});
	}
	
	changeCCAssistantState.checked = state;
	
	chrome.storage.sync.set({enabled: state}, function() {
		console.log("UDit Call Center Assistant has been " + (state ? "enabled" : "disabled"));
	});
};

changeITSCAssistantState.onclick = function () {
	let state = changeITSCAssistantState.checked;
	
	if (state) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(
				tabs[0].id,
				{allFrames: true, frameId: 0, code: "runITSCAssistant()"});
		});
	} else {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(
				tabs[0].id,
				{allFrames: true, frameId: 0, code: "disableITSCAssistant();"});
		});
	}
	
	changeITSCAssistantState.checked = state;
	
	chrome.storage.sync.set({itsc: state}, function() {
		console.log("UDit ITSC Assistant has been " + (state ? "enabled" : "disabled"));
	});
};

refreshState.onclick = function () {
	let state = refreshState.checked;
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{allFrames: true, frameId: 0, code: "CCAssistantAutoRefresh = " + (state ? "true" : "false") + ";"});
	});
	
	refreshState.checked = state;
	
	chrome.storage.sync.set({refresh: state}, function() {
		console.log("AutoRefresh has been " + (state ? "enabled" : "disabled"));
	});
};

notificationsState.onclick = function () {
	let state = notificationsState.checked;
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{allFrames: true, frameId: 0, code: "CCAssistantNotifications = " + (state ? "true" : "false") + ";"});
	});
	
	notificationsState.checked = state;
	
	chrome.storage.sync.set({notifications: state}, function() {
		console.log("Notifications have been " + (state ? "enabled" : "disabled"));
	});
};