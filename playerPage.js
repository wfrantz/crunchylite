'use strict';

chrome.runtime.onMessage.addListener(function (msg) {
	if (msg.nextMediaId && window.confirm('Continue to next episode?')) {
		window.location.href = 'http://www.crunchyroll.com/popout?media_id=' + msg.nextMediaId +
			'&video_format=108&video_encode_quality=80&time=0';
	}
});

var mediaIdMatch = location.search.match(/media_id=(\d+)/);
if (mediaIdMatch) {
	var metadataRequest = new XMLHttpRequest();
	metadataRequest.open('GET',
		'http://www.crunchyroll.com/xml/?req=RpcApiVideoPlayer_GetMediaMetadata&media_id=' +
			mediaIdMatch[1]);
	metadataRequest.addEventListener('load', function () {
		var episodeNumberElement = this.responseXML.getElementsByTagName('episode_number')[0];
		var seriesTitleElement = this.responseXML.getElementsByTagName('series_title')[0];
		if (seriesTitleElement && seriesTitleElement.textContent) {
			if (episodeNumberElement && episodeNumberElement.textContent) {
				document.title = 'Episode ' + episodeNumberElement.textContent +
					' | ' + seriesTitleElement.textContent;
			} else {
				document.title = seriesTitleElement.textContent;
			}
			document.title += ' - Crunchyroll';
		}
	});
	metadataRequest.send();
}
