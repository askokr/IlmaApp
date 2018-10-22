import React from "react";
import MediaQuery from "react-responsive";

const YahooLink = ({ link }) => {
  return (
    <React.Fragment>
      <MediaQuery minDeviceWidth={1224}>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center m-4">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {" "}
              <img
                src={require("./images/yahoo.png")}
                width="134"
                height="29"
                alt="Weather info from Yahoo!"
              />{" "}
            </a>
          </div>
          <div className="d-flex justify-content-center">
            <a
              href="https://sunrise-sunset.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img
                src={require("./images/sunrise-sunset.png")}
                width="178"
                height="29"
                alt="Astronomical info from Sunrise-Sunset"
              />
            </a>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1224}>
        <div className="d-flex flex-row justify-content-center m-2">
          <div>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {" "}
              <img
                src={require("./images/yahoo.png")}
                width="134"
                height="29"
                alt="Weather info from Yahoo!"
              />{" "}
            </a>
          </div>
          <div>
            <a
              href="https://sunrise-sunset.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img
                src={require("./images/sunrise-sunset.png")}
                width="178"
                height="29"
                alt="Astronomical info from Sunrise-Sunset"
              />
            </a>
          </div>
        </div>
      </MediaQuery>
    </React.Fragment>
  );
};

export default YahooLink;
