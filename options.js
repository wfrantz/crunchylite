'use strict';

document.addEventListener('DOMContentLoaded', function () {
	getLocalOption('showNextEpisodeDialog',
		value => document.getElementById('showNextEpisodeDialog').checked = value);

	document.getElementById('showNextEpisodeDialog').addEventListener('click', function (e) {
		setLocalOptions({ showNextEpisodeDialog: e.target.checked });
	});
});

// TODO eliminate duplication
function getLocalOption(optionName, callback) {
	getLocalOptions(options => callback(options[optionName]));
}

function getLocalOptions(callback) {;
	chrome.storage.local.get({ disabled: false, showNextEpisodeDialog: false }, callback);
}

var setLocalOptions = chrome.storage.local.set;
