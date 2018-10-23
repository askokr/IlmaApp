import React from "react";
import MediaQuery from "react-responsive";
import YahooLink from "../yahooLink";

const WeatherDisplayWeb = ({
  city,
  imagelink,
  tempString,
  text,
  weatherLink,
  windString
}) => {
  return (
    <React.Fragment>
      <MediaQuery query="(min-width: 800px)">
        <span className="results results-city">{city}:</span>
        <div className="d-flex flex-row justify-content-center">
          <div className="flex-column d-flex justify-content-center">
            <div>
              <span className="results results-temperature">{tempString}</span>
            </div>
            <div>
              <span className="results results-wind">{windString}</span>
            </div>
          </div>
          <div>
            <img src={imagelink} alt={text} />
          </div>
          <div />
        </div>
        <YahooLink link={weatherLink} />
      </MediaQuery>
      <MediaQuery query="(max-width: 800px)">
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
    </React.Fragment>
  );
};
export default WeatherDisplayWeb;
