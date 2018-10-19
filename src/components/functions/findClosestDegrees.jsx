function FindClosestDegrees(number) {
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
}

export default FindClosestDegrees;
