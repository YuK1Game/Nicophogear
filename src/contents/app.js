console.log('loaded!');

import $ from 'jquery';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    $('[name="comment]').val('コメントテスト');
    return;
});