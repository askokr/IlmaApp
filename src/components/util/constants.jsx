export const DirectionName = degrees => {
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
};

export const FindClosestDegrees = number => {
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
};
