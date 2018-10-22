import React from "react";
import MediaQuery from "react-responsive";
import YahooLink from "../yahooLink";

const WeatherDisplayMob = ({
  city,
  tempString,
  text,
  windString,
  imagelink,
  weatherLink
}) => {
  return (
    <React.Fragment>
      <MediaQuery query="(orientation: portrait)">
        <span className="results results-city">{city}:</span>
        <div className="flex-column d-flex justify-content-center">
          <div>
            <span className="results results-temperature">{tempString}</span>
          </div>
          <div>
            <span className="results results-wind">{windString}</span>
          </div>
          <div>
            <img src={imagelink} alt={text} />
          </div>
        </div>
        <div />
        <YahooLink link={weatherLink} />
      </MediaQuery>
      <MediaQuery query="(orientation: landscape)">
        <div className="d-flex flex-row justify-content-center">
          <div>
            <span className="results results-city vertical">{city}</span>
          </div>
          <div>
            <span className="results results-temperature">{tempString}</span>
          </div>
          <div>
            <span className="results results-wind">{windString}</span>
          </div>
          <div>
            <img className="results-image" src={imagelink} alt={text} />
          </div>
        </div>
        <YahooLink link={weatherLink} />
      </MediaQuery>
    </React.Fragment>
  );
};
export default WeatherDisplayMob;
