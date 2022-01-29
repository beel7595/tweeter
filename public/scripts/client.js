/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

    const showErrorMessage = function (message) {
        $("#error-message").text(message);
        $("#error-message").slideDown("slow");
    }

    const showOffErrorMessage = function () {
        $("#error-message").hide();
    }

    $('#createTweet').submit(function (e) {
        e.preventDefault();
        const text = $("#tweet-text").val();
        showOffErrorMessage();
        if (text === "" || text === null) {
            showErrorMessage("no input!");
            return;
        }
        if (text.length > 140) {
            showErrorMessage("over 140 limit!");
            return;
        }

        const str = $("form").serialize();
        $.ajax('http://localhost:8080/tweets', {
            method: 'POST', data: str, complete: (xhr, status) => {
                if (status === "success") {
                    loadTweets();
                    $("#tweet-text").val("");
                    const counter = 140 - $("#tweet-text").val().length;
                    $("#counter").text(counter);
                }
            }
        })
    });
    const escape = function (str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };


    const createTweetElement = function (tweetData) {
        return $(`
            <article class="tweet">
                <header>
                <img src=${tweetData.user.avatars}>
                <span class="tweet-name">${tweetData.user.name}</span>
                <span class="tweet-userName">${tweetData.user.handle}</span>
                </header>
                <div class="tweet-content">
                ${escape(tweetData.content.text)}
                </div>
                <footer>
                <span id="tweet-time1" class="tweet-time">${timeago.format(tweetData.created_at)}</span>
                <div class="tweet-footer-icons">
                    <i class="fas fa-solid fa-flag"></i>
                    <i class="fas fa-solid fa-retweet"></i>
                    <i class="fas fa-solid fa-heart"></i>
                </div>
                </footer>
          </article>`)
    }


    const renderTweets = function (tweets) {
        const $tweet = tweets.reverse().map(tweetData => {
            return createTweetElement(tweetData);
        })

        $('#tweets-container').html($tweet);
    }


    const loadTweets = function () {
        $.ajax('http://localhost:8080/tweets', { method: 'GET' })
            .then(function (results) {
                renderTweets(results);
            });
    }
    loadTweets();
});

