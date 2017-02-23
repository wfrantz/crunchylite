# Crunchylite
I got fed up with all of the cruft Crunchyroll puts on their video pages (comments, sidebars,
basically everything except the video I came to watch). So I wrote a Chrome extension to get rid
of it.

(It seems like all the other browsers have implemented support for the Chrome extension format.
Crunchylite might work on other browsers but I haven't tested it on any of them and the rest of
this README will assume you're using Chrome.)

## Installation
1. Download and extract [the latest code](https://github.com/wfrantz/crunchylite/archive/master.zip).
2. Enable developer mode in [the extension settings page](chrome://extensions).
3. Click "Load unpacked extension..." and select the `crunchylite-master` folder you just unzipped.

Chrome will now nag you about having developer extensions enabled every time you launch it. I will
try to get it on the Chrome Web Store in the near future so you don't have to deal with this.

## What it does
Once you've installed the extension, just browse Crunchyroll as you normally would (I like to
start from the [simulcast calendar](http://www.crunchyroll.com/simulcastcalendar) or
[alphabetical index](http://www.crunchyroll.com/videos/anime/alpha?group=all) page). When you
navigate to a series page (e.g. http://www.crunchyroll.com/chihayafuru) it will automatically sort
the episodes from oldest to newest and expand all the season dropdowns (currently disabled for
some longer series).

When you navigate to an episode page (e.g http://www.crunchyroll.com/barakamon/episode-1-cheerful-child-656707),
instead of showing the regular crufty episode page, Crunchylite will redirect you to a nice simple
page with just the video and controls. This is actually just the pop-out player displayed in a
regular browser tab, enhanced with support for auto-advance (or "autoplay" as CR confusingly calls
it) and the next episode button. Go ahead, marathon your heart out.

## Configuration
If for whatever reason you want to see the normal episode page, you can click the orange square
icon in the Chrome toolbar to toggle redirection on and off.

There's one checkbox in the options menu. When checked, Crunchylite will prompt you to choose
whether to continue to the next episode (if there is one) at the end of each episode. The prompt
dialog will prevent all other browser input until it is answered (yep, it's the JavaScript
`window.confirm` function) so it's disabled by default.
