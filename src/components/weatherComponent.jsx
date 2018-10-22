import React, { Component } from "react";
import MediaQuery from "react-responsive";
import ErrorMessage from "./errorMessage";
import WeatherDisplayMob from "./mob/weatherDisplay";
import WeatherDisplayWeb from "./web/weatherDisplay";
import YahooLink from "./yahooLink";
import DirectionName from "./functions/directionName";

class Weather extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.searches !== nextProps.searches;
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
        const directionName = DirectionName(direction);
        const windString = directionName + " tuul, " + speedMS + " m/s.";

        //make string of  temperature
        const { condition } = response.query.results.channel.item;
        const temp = condition.temp;
        const tempString = temp + " °C";

        //get condition related image and text
        const { code, text } = condition;
        //is it day or night
        let dayOrNight = "d";
        let today = new Date();
        const now = +today;
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        today = yyyy + "/" + mm + "/" + dd;
        const sunriseTime = +new Date(
          today + " " + this.props.sunrise + " UTC"
        );
        const sunsetTime = +new Date(today + " " + this.props.sunset + " UTC");
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
