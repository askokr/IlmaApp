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

  correctTimeString(time) {
    const timeSplitAtSpace = time.split(" ");
    const timeSpliAtColon = timeSplitAtSpace[0].split(":");
    let timeCorrected;
    if (timeSpliAtColon[1].length === 1) {
      timeCorrected =
        timeSpliAtColon[0] +
        ":0" +
        timeSpliAtColon[1] +
        " " +
        timeSplitAtSpace[1];
    } else {
      timeCorrected = time;
    }
    return timeCorrected;
  }

  composeElements = () => {
    const { response } = this.props;
    if (response.query.results.channel) {
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
      const code = condition.code;
      const { astronomy } = response.query.results.channel;

      var today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1; //January is 0!
      const yyyy = today.getFullYear();
      today = yyyy + "/" + mm + "/" + dd;
      const sunrise = this.correctTimeString(astronomy.sunrise);
      const sunset = this.correctTimeString(astronomy.sunset);
      const sunriseTime = +new Date(today + " " + sunrise);
      const sunsetTime = +new Date(today + " " + sunset);
      const now = +new Date();
      let dayOrNight;
      if (now <= sunsetTime && now >= sunriseTime) {
        dayOrNight = "d";
      } else {
        dayOrNight = "n";
      }

      const imagelink = `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${code}${dayOrNight}.png`;
      // const { description } = response.query.results.channel.item;
      // const imagelink = description.split('"')[1];

      return (
        <React.Fragment>
          <div className="d-flex flex-row justify-content-center">
            <div className="flex-column d-flex justify-content-center">
              <div>
                <span style={{ fontSize: "5em" }}>{tempString}</span>
              </div>{" "}
              <div className=" align-self-center">
                <span style={{ fontSize: "2em" }}>{windString}</span>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <img src={imagelink} />
                </div>
              </div>
            </div>
            <div />
          </div>
          <YahooLink link={weatherLink} />
        </React.Fragment>
      );
    } else {
      return (
        <div>
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
