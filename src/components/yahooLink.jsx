import React from "react";

const YahooLink = ({ link }) => {
  return (
    <div className="flex-column d-flex justify-content-center">
      <div className="d-flex flex-row justify-content-center m-4">
        <a href={link} target="_blank" rel="noopener noreferrer">
          {" "}
          <img
            src="https://poweredby.yahoo.com/purple.png"
            width="134"
            height="29"
            alt="Weather info from Yahoo!"
          />{" "}
        </a>
      </div>
      <div className="d-flex flex-row justify-content-center">
        <a
          href="https://sunrise-sunset.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img
            src="https://i.gyazo.com/5b3160abb754202b6a5c063124229b04.png"
            width="134"
            height="29"
            alt="Astronomical info from Sunrise-Sunset"
          />
        </a>
      </div>
    </div>
  );
};

export default YahooLink;
