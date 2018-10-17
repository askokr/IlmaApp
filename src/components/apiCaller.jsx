import React, { Component } from "react";

class APICaller extends Component {
  //find wind direction
  findIndexClosestNumber(arrayToSearch, number) {
    let closest = number;
    let indexOfClosest = 0;

    for (let i = 0; i < arrayToSearch.length; i++) {
      let currentDistance = Math.abs(number - arrayToSearch[i]);

      if (currentDistance < closest) {
        indexOfClosest = i;
        closest = currentDistance;
      }
    }
    return indexOfClosest;
  }
  //enter initiates search
  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleWeather();
    }
  };

  handleWeather = async e => {
    //constants for plain language response
    const directionDegrees = [0, 45, 90, 135, 180, 225, 270, 315];
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
    //get parts for call
    const place = this.props.place; //get place string from input
    const query = "*"; //get all weather data
    const units = "c"; //use SI units
    const URI = "https://query.yahooapis.com/v1/public/yql?q=";
    const YQLQuery = `select%20${query}%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${place}%22)%20and%20u%3D%22${units}%22&format=json`;
    //make the call
    const api_call = await fetch(`${URI}${YQLQuery}`);
    const response = await api_call.json();
    //handle wind results
    const windResult = response.query.results.channel.wind;
    const direction = parseInt(windResult.direction);
    const speedMS = Math.round(parseInt(windResult.speed) / 3.6);

    const directionName =
      directionNames[this.findIndexClosestNumber(directionDegrees, direction)];
    const windString = directionName + " tuul, " + speedMS + " m/s";

    //get link to result
    const linkResponse = response.query.results.channel.item.link;
    const linkParts = linkResponse.split("*");
    const link = linkParts[1];
    //handle forecast results
    const forecast = response.query.results.channel.item.forecast;

    console.log(link);
    console.log(windString);
    console.log(forecast);

    //authenticate
    const client_id =
      "dj0yJmk9a2x6QXZISFBhRmNrJmQ9WVdrOWFURldlRXB3TjJzbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1jMQ--";
    const response_type = "id_token";
    const redirect_uri = "https://stupefied-bose-586d60.netlify.com/";
    const endpoint = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${client_id}response_type=${response_type}&${redirect_uri}`;
    const auth_call = await fetch(endpoint);
    console.log(auth_call);
  };

  render() {
    return (
      <div>
        <div>
          <div className="input-group m-4">
            <input
              type="text"
              value={this.props.place}
              maxLength="42"
              onChange={this.props.onPlaceInput}
              onKeyPress={this.handleEnter}
              placeholder={"Sisesta kohanimi"}
              className="form-control"
            />
            <div className="input-group-append">
              <button onClick={this.handleWeather} className="btn btn-primary">
                Otsi ilma
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default APICaller;
