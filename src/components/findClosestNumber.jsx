function FindClosestNumber(props) {
  const { arrayToSearch, number } = props;
  let closest = number;
  let indexClosest = 0;

  for (let i = 0; i < arrayToSearch.length; i++) {
    let currentDistance = Math.abs(number - arrayToSearch[i]);

    if (currentDistance < closest) {
      indexClosest = i;
      closest = currentDistance;
    }
  }
  return indexClosest;
}

export default FindClosestNumber;
