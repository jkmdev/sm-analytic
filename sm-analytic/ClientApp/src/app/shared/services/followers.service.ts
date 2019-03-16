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
    const yearsFromCurrent = 12;
    const currentYear = new Date().getFullYear();

    for (var year = currentYear; year > (currentYear - yearsFromCurrent); year--) {
      data.push(
        { data: 0, label: year}
      );
    }

    console.log(followers);

    followers.forEach((follower) => {
      data.forEach((entry) => {
        if (this.getYear(follower.createdAt) == entry.label) {
          entry.data++;
        }
      });
    });

    return data;

  }

  getYear(dateString) {
    return new Date(
      Date.parse(dateString)
    ).getFullYear()
  }

}
