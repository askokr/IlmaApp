import React from "react";
import YahooLink from "./yahooLink";

const WeatherDisplayMob = () => {
  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-center">
        <span className="results-error">
          Miskit läks valesti, proovi uuesti!
        </span>
        <div />
      </div>
      <YahooLink link="https://www.yahoo.com/?ilc=401" />
    </React.Fragment>
  );
};
export default WeatherDisplayMob;
