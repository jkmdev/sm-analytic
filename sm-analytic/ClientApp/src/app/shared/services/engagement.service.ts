import { Injectable } from '@angular/core';

@Injectable()
export class EngagementService {

  constructor() { }

  calcEngagementByHour(tweets) {
    var daysInWeek = 24;
    return this.calcEngagement(tweets, daysInWeek, this.getHour);
  }

  calcEngagementByDay(tweets) {
    var hoursInDay = 7;
    return this.calcEngagement(tweets, hoursInDay, this.getDay);
  }

  calcEngagementTotal(tweets) {
    return this.calcEngagement(tweets, 0, x => 0);
  }

  // returns whole number integer indicating hour of day
  getHour(date): number {
    return new Date(date).getHours();
  }

  // returns whole number integer indicating day of the week
  getDay(date): number {
    return new Date(date).getDay();
  }

  calcEngagement(tweets, range, getTime: Function) {

    var engagementData = [
      { data: [], label: 'Tweets' },
      // { data: [], label: 'Quotes' },
      // { data: [], label: 'Replies' },
      { data: [], label: 'Retweets' }
    ];

    engagementData.forEach((type) => {
      for (var i = 0; i < range; i++) {
        type.data[i] = 0;
      }
    });

    tweets.forEach((tweet) => {

      var timeTweeted: number = getTime(tweet.createdAt);

      engagementData.forEach((type) => {

        switch (type.label) {
          case 'Tweets': type.data[timeTweeted] += tweet.favoriteCount;
            break;
          // case 'Quotes': type.data[timeTweeted] += tweet.quoteCount;
          //   break;
          // case 'Replies': type.data[timeTweeted] += tweet.replyCount;
          //   break;
          case 'Retweets': type.data[timeTweeted] += tweet.retweetCount;
            break;
          default: break;
        }

      });

    });

    return engagementData;

  }

}

  //TODO: implement below function

  /* calcEngagementByWeek(tweets) {
    var hoursInDay = 24;
    return this.calcEngagement(tweets, hoursInDay, this.getDay);
  } */
