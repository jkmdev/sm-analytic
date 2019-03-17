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

}
