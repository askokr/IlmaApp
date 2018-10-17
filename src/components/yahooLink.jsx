import React from "react";

const YahooLink = ({ link }) => {
  return (
    <div className="d-flex justify-content-center m-4">
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
  );
};

export default YahooLink;
