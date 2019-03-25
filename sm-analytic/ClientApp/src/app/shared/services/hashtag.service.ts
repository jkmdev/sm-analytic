import { Injectable } from '@angular/core';

@Injectable()
export class HashtagService {

  constructor() { }

  mostCommonUserHashtags(hashtagCount) {

    if (!hashtagCount) return {};

    var chartData = [];
    var chartLabels = [];

    if (this.hashtagCount) {
      chartData = [{
        data: Object.values(hashtagCount)
      }];
      chartLabels = Object.keys(hashtagCount);
    }

    return {
      'title': "Most Common Hashtags from User",
      'subTitle': "Compares most used hashtags.",
      'chartLabels': chartLabels,
      'chartData': chartData
    };

  }

  publicPostsWithHashtags(searchedHashtags) {

    if (!searchedHashtags) return {};

    var chartData = [];
    var chartLabels = [];

    if (searchedHashtags) {
      chartData = [{
        data: Object.values(searchedHashtags)
      }];
      chartLabels = Object.keys(searchedHashtags);
    }

    return {
      'title': "Amount of Posts that use Your Hashtags",
      'subTitle': "Shows the amount of (popular) posts made by other users that use hashtags you commonly use.",
      'chartLabels': chartLabels,
      'chartData': chartData
    };

  }

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
