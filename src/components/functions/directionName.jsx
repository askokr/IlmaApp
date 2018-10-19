import FindClosestDegrees from "./findClosestDegrees";

function DirectionName(degrees) {
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
  const directionName = directionNames[FindClosestDegrees(degrees)];
  return directionName;
}

export default DirectionName;
