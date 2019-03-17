import { Injectable } from '@angular/core';

@Injectable()
export class FollowersService {

  constructor() { }

  /**
   * Determines when each follower made their account
   * Return array of years counting when followers joined
   **/
  joinedAt(followers) {

    if (!followers) return [];

    var data = [];
    const yearsFromCurrent = 8;
    const currentYear = new Date().getFullYear();

    for (var year = (currentYear - yearsFromCurrent); year <= currentYear; year++) {
      data.push(
        { data: [0], label: year.toString()}
      );
    }

    followers.forEach((follower) => {
      data.forEach((entry) => {
        if (this.getYear(follower.createdAt) == entry.label) {
          entry.data[0]++;
        }
      });
    });

    return [{
      data: this.yearsToArray(data), label: "Years"
    }];

  }

  getYear(dateString) {
    return new Date(
      Date.parse(dateString)
    ).getFullYear()
  }

  yearsToArray(years) {
    var arr = [];
    years.forEach((year) => {
      arr.push(year.data)
    });
    return arr;
  }

}
