import React, { Component } from "react";
import MediaQuery from "react-responsive";
import ErrorMessage from "./errorMessage";
import { DirectionName } from "./util/constants";
import WeatherDisplayMob from "./mob/weatherDisplay";
import WeatherDisplayWeb from "./web/weatherDisplay";
import YahooLink from "./yahooLink";

class Weather extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.updateSwitch !== nextProps.updateSwitch;
  }
  //compose elements for display
  composeElements = () => {
    const { response, sunrise, sunset } = this.props;
    if (response !== "") {
      try {
        //make string of wind result
        const { wind } = response.query.results.channel;
        const direction = parseInt(wind.direction);
        const speedMS = Math.round(parseInt(wind.speed) / 3.6);
        const directionName = DirectionName(direction);
        const windString = directionName + " tuul, " + speedMS + "\u00a0m/s.";

        //make string of  temperature
        const { condition } = response.query.results.channel.item;
        const temp = condition.temp;
        const tempString = temp + "\u00a0°C";

        //get condition related image and text
        const { code, text } = condition;
        //is it day or night
        let dayOrNight;
        const now = +new Date();
        let sunriseTime = +new Date(sunrise);
        let sunsetTime = +new Date(sunset);

        if (now <= sunsetTime && now >= sunriseTime) {
          dayOrNight = "d";
        } else {
          dayOrNight = "n";
        }
        const imagelink = `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${code}${dayOrNight}.png`;
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
