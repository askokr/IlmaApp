import React from "react";
import FindClosestNumber from "./findClosestNumber";

const WindString = ({ direction, windSpeed }) => {
  console.log(windSpeed);
  console.log(direction);
  const directionInt = parseInt(direction);
  const speedMS = Math.round(parseInt(windSpeed) / 3.6);
  const directionDegrees = [0, 45, 90, 135, 180, 225, 270, 315];
  const directionNames = [
    "põhja",
    "kirde",
    "ida",
    "kagu",
    "lõuna",
    "edela",
    "lääne",
    "loode"
  ];
  const directionName =
    directionNames[
      (
        <FindClosestNumber
          arrayToSearch={directionDegrees}
          number={directionInt}
        />
      )
    ];
  const windString = directionName + " tuul, " + speedMS + " m/s";
  return windString;
};

export default WindString;
