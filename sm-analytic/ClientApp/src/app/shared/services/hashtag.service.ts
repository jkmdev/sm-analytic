import { Injectable } from '@angular/core';

@Injectable()
export class HashtagService {

  constructor() { }

  hashtagCount(tweets) {

    var hashtags = {};

    tweets.forEach((tweet) => {
      if (!tweet.retweetedTweet) {

        tweet.hashtags.forEach((hashtag) => {

          if (hashtags.hasOwnProperty(hashtag.text)) {
            hashtags[hashtag.text]++;
          } else {
            hashtags[hashtag.text] = 1;
          }

        });

      }
    });

    return hashtags;

  }

  allHashtagsUsed(tweets) {

    var hashtags = [];

    tweets.forEach((tweet) => {
      if (!tweet.retweetedTweet) {
        tweet.hashtags.forEach((hashtag) => {
          if (hashtags.indexOf(hashtag.text) === -1) {
            hashtags.push(hashtag.text);
          }
        });

      }
    });

    return hashtags;

  }

  postsWithHashtag(tweets) {

    var hashtags = this.allHashtagsUsed(tweets);


  }

}
