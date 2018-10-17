import React, { Component } from "react";

import YahooLink from "./yahooLink";

class Weather extends Component {
  // find wind direction name
  directionName(degrees) {
    const directionNames = [
      "Põhja",
      "Kirde",
      "Ida",
      "Kagu",
      "Lõuna",
      "Edela",
      "Lääne",
      "Loode"
    ];
    const directionName = directionNames[this.findClosestDegrees(degrees)];
    return directionName;
  }
  //find wind direction
  findClosestDegrees(number) {
    const directionDegrees = [0, 45, 90, 135, 180, 225, 270, 315];
    let closest = number;
    let closestDegrees = 0;

    for (let i = 0; i < directionDegrees.length; i++) {
      let currentDistance = Math.abs(number - directionDegrees[i]);

      if (currentDistance < closest) {
        closestDegrees = i;
        closest = currentDistance;
      }
    }
    return closestDegrees;
  }

  composeElements = () => {
    const { response } = this.props;
    if (response !== "") {
      //make string of wind result
      const { wind } = response.query.results.channel;
      const direction = parseInt(wind.direction);
      const speedMS = Math.round(parseInt(wind.speed) / 3.6);
      const directionName = this.directionName(direction);
      const windString = directionName + " tuul, " + speedMS + " m/s.";

      //get link to result
      const { link } = response.query.results.channel.item;
      const linkParts = link.split("*");
      const weatherLink = linkParts[1];

      //get temperature
      const { condition } = response.query.results.channel.item;
      const temp = condition.temp;
      const tempString = temp + " °C";

      //get condition image
      const { description } = response.query.results.channel.item;
      const image = description.split('"')[1];

      return (
        <div>
          <p>{tempString}</p>
          <p>{windString}</p>
          <img src={image} />
          <YahooLink link={weatherLink} />
        </div>
      );
    } else {
      return (
        <div>
          <p>Nothing to show</p>

          <YahooLink link="https://www.yahoo.com/?ilc=401" />
        </div>
      );
    }
  };

  render() {
    return <div>{this.composeElements()}</div>;
  }
}

export default Weather;
