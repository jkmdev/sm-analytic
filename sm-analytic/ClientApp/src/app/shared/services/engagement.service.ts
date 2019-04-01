import { Injectable } from '@angular/core';

@Injectable()
export class EngagementService {

  constructor() { }

  engagementByHourData(tweets) {

    var chartLabels = {};

    for (var i = 0; i < 24; i++) {
      chartLabels[i] = `${i}:00`;
    }

    var chartData = tweets ? this.calcEngagementByHour(tweets) : [];

    return {
      'title': "Posting Times vs. Engagement (Hourly)",
      'subTitle': "Shows a relationship between when a tweet was posted and how many likes, etc it has for a given hour.",
      'chartLabels': Object.values(chartLabels),
      'chartData': chartData
    };

  }

  engagementByDayData(tweets) {

    var chartLabels = {
      0: "Monday",
      1: "Tuesday",
      2: "Wednesday",
      3: "Thursday",
      4: "Friday",
      5: "Saturday",
      6: "Sunday"
    };

    var chartData = tweets ? this.calcEngagementByDay(tweets) : [];

    return {
      'title': "Posting Times vs. Engagement (Daily)",
      'subTitle': "Shows a relationship between when a tweet was posted and how many likes, etc it has for a given day.",
      'chartLabels': Object.values(chartLabels),
      'chartData': chartData
    };

  }

  engagementTotalData(tweets) {

    var chartLabels = {
      0: "Tweets",
      1: "Retweets"
    };

    var chartData = tweets ? this.calcEngagementTotal(tweets) : [];

    return {
      'title': "Total Engagement",
      'subTitle': "",
      'chartLabels': Object.values(chartLabels),
      'chartData': chartData
    };

  }

  topTweets(tweets) {

    var simplerTweets = [];

    if (tweets) {

      tweets.sort((a, b) => { //sort descending by favourites
        return b.favoriteCount - a.favoriteCount;
      });

      if (tweets.length > 3) tweets = tweets.slice(0, 3);

      tweets.forEach((tweet, index) => {

        const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(tweet.createdAt);
        const day = date.getDate();
        const month = monthList[date.getMonth()];
        const year = date.getFullYear();

        simplerTweets.push({
          text: tweet.fullText,
          score: tweet.favoriteCount,
          user: tweet.createdBy.name,
          handle: tweet.createdBy.screenName,
          link: tweet.url,
          date: `${month} ${day}, ${year}`
        });
      });

    }

    return simplerTweets;
 
  }

  calcEngagementByHour(tweets) {
    var daysInWeek = 24;
    return this.calcEngagement(tweets, daysInWeek, this.getHour);
  }

  calcEngagementByDay(tweets) {
    var hoursInDay = 7;
    return this.calcEngagement(tweets, hoursInDay, this.getDay);
  }

  calcEngagementTotal(tweets) {
    return this.calcTotals(tweets);
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
      { data: [], label: 'Retweets' }
    ];

    engagementData.forEach((type) => {
      for (var i = 0; i < range; i++) {
        type.data[i] = 0;
      }
    });

    tweets.forEach((tweet) => {

      var timeTweeted: number = getTime(tweet.createdAt);

      if (!tweet.retweetedTweet) {

        engagementData.forEach((type) => {

          switch (type.label) {
            case 'Tweets': type.data[timeTweeted] += tweet.favoriteCount;
              break;
            case 'Retweets': type.data[timeTweeted] += tweet.retweetCount;
              break;
            default: break;
          }

        });

      }

    });

    return engagementData;

  }

  calcTotals(tweets) {

    var engagementData = [{
      data: [0, 0]
    }];

    tweets.forEach((tweet) => {

      if (!tweet.retweetedTweet) {

        engagementData[0].data[0] += tweet.favoriteCount;
        engagementData[0].data[1] += tweet.retweetCount;

      }

    });

    return engagementData;

  }

}


