export async function getWeather(place) {
  let response;
  const query = "*"; //get all weather data
  const units = "c"; //use SI units
  const URI = "https://query.yahooapis.com/v1/public/yql?q=";
  const YQLQuery = `select%20${query}%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${place}%22)%20and%20u%3D%22${units}%22&format=json`;
  const api_call = await fetch(`${URI}${YQLQuery}`);
  try {
    response = await api_call.json();
  } catch (e) {
    // console.log(e);
  }
  return response;
}

export async function getAstronomy(lat, long) {
  const astronomicalAPICall = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0`
  );
  const astronomyResponse = await astronomicalAPICall.json();
  return astronomyResponse;
}
