// ==UserScript==
// @name         Youtube Dislike Count Reenabler
// @namespace    https://twitter.com/rirurinuser
// @version      1.0
// @description  Youtube is now fixed
// @author       rirurin
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

let overwrittenElement;

(function() {
    'use strict';
    window.addEventListener('yt-navigate-finish', function () {
        setTimeout(function(){
            showYoutubeDislikeCount()
        }, 500)
    });

    function showYoutubeDislikeCount() {
        let stars = window.yt.config_.SBOX_SETTINGS.SEARCHBOX_COMPONENT.__dataHost.parentComponent.__data.data.playerResponse.videoDetails.averageRating
        let title = window.yt.config_.SBOX_SETTINGS.SEARCHBOX_COMPONENT.__dataHost.parentComponent.__data.data.playerResponse.videoDetails.title
        let likes = parseInt(document.querySelector("#button[aria-label^='like this video']").getAttribute('aria-label').split('with ')[1].split(' ')[0].replaceAll(',',''))
        let dislikes = Math.round(likes/((stars- 1)/4) - likes)
        let elements = document.getElementsByClassName("ytd-toggle-button-renderer")
        if (overwrittenElement == null) {
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].innerHTML == "Dislike") {
                    overwrittenElement = elements[i]
                }
            }
        }
        if (overwrittenElement == null) {
            console.log("Could not find dislike text - you may not have that thing youtube decided to put on us")
        } else {
            overwrittenElement.innerHTML = dislikes
        }
        console.log(`${title} has ${likes} likes and ${dislikes} dislikes`)
    }

    showYoutubeDislikeCount()

})();