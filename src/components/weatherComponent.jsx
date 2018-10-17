import React, { Component } from "react";
import MediaQuery from "react-responsive";
import ErrorMessage from "./errorMessage";
import WeatherDisplayMob from "./mob/weatherDisplay";
import WeatherDisplayWeb from "./web/weatherDisplay";
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

  //compose elements for display
  composeElements = () => {
    const { response } = this.props;
    if (response !== "") {
      try {
        //make string of wind result
        const { wind } = response.query.results.channel;
        const direction = parseInt(wind.direction);
        const speedMS = Math.round(parseInt(wind.speed) / 3.6);
        const directionName = this.directionName(direction);
        const windString = directionName + " tuul, " + speedMS + " m/s.";

        //make string of  temperature
        const { condition } = response.query.results.channel.item;
        const temp = condition.temp;
        const tempString = temp + " °C";

        //get condition related image and text
        const { code, text } = condition;
        const imagelink = `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${code}d.png`;
        // const { description } = response.query.results.channel.item;
        // const imagelink = description.split('"')[1];

        //get link to Yahoo Weather
        const { link } = response.query.results.channel.item;
        const linkParts = link.split("*");
        const weatherLink = linkParts[1];

        //get city name
        const { city } = response.query.results.channel.location;

        return (
          <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
              <WeatherDisplayWeb
                city={city}
                tempString={tempString}
                text={text}
                windString={windString}
                imagelink={imagelink}
                weatherLink={weatherLink}
              />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
              <WeatherDisplayMob
                city={city}
                tempString={tempString}
                text={text}
                windString={windString}
                imagelink={imagelink}
                weatherLink={weatherLink}
              />
            </MediaQuery>
          </React.Fragment>
        );
      } catch (e) {
        return (
          <React.Fragment>
            <ErrorMessage />
          </React.Fragment>
        );
      }
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
