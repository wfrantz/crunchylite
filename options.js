document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({
		showNextEpisodeDialog: false
	}, function (options) {
		document.getElementById('showNextEpisodeDialog').checked = options.showNextEpisodeDialog;
	});

	document.getElementById('showNextEpisodeDialog').addEventListener('click', function (e) {
		chrome.storage.local.set({ showNextEpisodeDialog: e.target.checked });
	});
});
