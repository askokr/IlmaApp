import React, { Component } from "react";
import YahooLink from "./yahooLink";
import MediaQuery from "react-responsive";

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
    if (response !== "") {
      //make string of wind result
      try {
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
        const { code, text } = condition;

        const imagelink = `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${code}d.png`;
        // const { description } = response.query.results.channel.item;
        // const imagelink = description.split('"')[1];

        return (
          <React.Fragment>
            <MediaQuery minDeviceWidth={1224}>
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
                  <img src={imagelink} alt={text} />
                </div>
                <div />
              </div>
              <YahooLink link={weatherLink} />
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
              <div className="flex-column d-flex justify-content-center">
                <div>
                  <span style={{ fontSize: "5em" }}>{tempString}</span>
                </div>{" "}
                <div className=" align-self-center">
                  <span style={{ fontSize: "2em" }}>{windString}</span>
                </div>
                <div>
                  <img src={imagelink} alt={text} />
                </div>
              </div>
              <div />
              <YahooLink link={weatherLink} />
            </MediaQuery>
          </React.Fragment>
        );
      } catch (e) {
        return (
          <React.Fragment>
            <div className="d-flex flex-row justify-content-center">
              <span style={{ fontSize: "2em" }}>
                Miskit läks valesti, proovi uuesti
              </span>
              <div />
            </div>
            <YahooLink link="https://www.yahoo.com/?ilc=401" />
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
