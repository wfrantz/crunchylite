'use strict';

if (document.querySelectorAll('.season').length === 1 || document.querySelectorAll('.season .group-item').length <= 52) {
	Array.from(document.querySelectorAll('.season-dropdown:not(.open)'))
		.forEach((element) => element.dispatchEvent(new MouseEvent('click')));
	var oldestFirstButton = document.getElementById('subtabs_videos_oldest');
	if (oldestFirstButton) {
		oldestFirstButton.removeAttribute('href');
		oldestFirstButton.dispatchEvent(new MouseEvent('click'));
	}
}