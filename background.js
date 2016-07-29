'use strict';

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        var mediaIdMatch = details.url.match(/^http:\/\/www\.crunchyroll\.com\/[a-z0-9-]+\/[a-z0-9-]*-(\d+)(\?t=\d+)?$/);

        if (mediaIdMatch) {
            var timeCode = 0;
            // Query param t is used when the page URL is updated to 'catch up' with autoplay mode after exiting fullscreen.
            if (mediaIdMatch[2]) {
                timeCode = mediaIdMatch[2].substring(3);
                // Exiting fullscreen with the recommended videos view showing (resulting in t=0, for some reason)
                // should not cause the episode you just watched to start playing again... stupidly high timecode
                // will make the player jump directly to the recommended videos view.
                if (timeCode === '0') timeCode = 9999;
            }
            return { redirectUrl: 'http://www.crunchyroll.com/popout?media_id=' + mediaIdMatch[1] +
                '&video_format=108&video_encode_quality=80&time=' + timeCode };
        } else {
            return {};
        }
    },
    // filters
    {
        urls: [ 'http://www.crunchyroll.com/*/*-*' ],
        types: [ 'main_frame' ]
    },
    // extraInfoSpec
    [ 'blocking' ]
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        chrome.storage.local.get('showNextEpisodeDialog', function (options) {
            if (!options.showNextEpisodeDialog) return;
            var mediaIdMatch = details.url.match(/id=(\d+)/);
            if (mediaIdMatch) {
                var nextEpisodeRequest = new XMLHttpRequest();
                nextEpisodeRequest.open('GET',
                    'http://www.crunchyroll.com/xml/?req=RpcApiVideoPlayer_GetAutoAdvanceTarget&media_id=' + mediaIdMatch[1]);
                nextEpisodeRequest.addEventListener('load', function () {
                    var nextMediaIdMatch = this.responseText.match(/<url>.*-(\d+)<\/url>/);
                    if (nextMediaIdMatch) chrome.tabs.sendMessage(details.tabId, {nextMediaId: nextMediaIdMatch[1]});
                });
                nextEpisodeRequest.send();
            }
        });
    },
    {
        urls: [
            'http://www.crunchyroll.com/xml/?media%5Fid=*&req=RpcApiMedia%5FGetRecommendedMedia',
            'http://www.crunchyroll.com/xml/?req=RpcApiMedia%5FGetRecommendedMedia&media%5Fid=*'
        ]
    }
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var queryParamToAppend = '&enable_next=1';
        if (!details.url.endsWith(queryParamToAppend)) return { redirectUrl: details.url + queryParamToAppend };
        else return {};
    },
    { urls: [ 'http://www.crunchyroll.com/xml/?req=RpcApiVideoPlayer_GetStandardConfig&*' ] },
    [ 'blocking' ]
);
