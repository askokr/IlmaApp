import React from "react";
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
    </React.Fragment>
  );
};
export default WeatherDisplayMob;