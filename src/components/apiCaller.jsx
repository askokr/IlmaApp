import React, { Component } from "react";

class APICaller extends Component {
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

  handleWeather = async e => {
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
    const place = this.props.place;

    const URI = "https://query.yahooapis.com/v1/public/yql?q=";
    const YQLQuery = `select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${place}%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

    const api_call = await fetch(`${URI}${YQLQuery}`);
    const response = await api_call.json();

    const windResult = response.query.results.channel.wind;
    const direction = parseInt(windResult.direction);
    const speedMS = Math.round(parseInt(windResult.speed) / 3.6);
    const directionName =
      directionNames[this.findIndexClosestNumber(directionDegrees, direction)];
    const windString = directionName + " tuul, " + speedMS + " m/s";

    const forecast = response.query.results.channel.item.forecast;

    console.log(windString);
    console.log(forecast[0]);
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleWeather();
    }
  };

  render() {
    return (
      <div>
        <div>
          <div class="input-group m-4">
            <input
              type="text"
              value={this.props.place}
              maxLength="42"
              onChange={this.props.onPlaceInput}
              onKeyPress={this.handleEnter}
              placeholder={"Sisesta kohanimi"}
              className="form-control"
            />
            <div class="input-group-append">
              <button onClick={this.handleWeather} className="btn btn-primary">
                {" "}
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
