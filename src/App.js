import React, { Component } from "react";
import Clouds from "./components/clouds";
import GHCorner from "react-gh-corner";
import Input from "./components/input";
import Weather from "./components/weatherComponent";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    place: "",
    response: "",
    sunrise: "",
    sunset: ""
  };
  handlePlaceInput = e => {
    const place = e.target.value;
    this.setState({ place });
  };
  //
  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleAPICall();
    }
  };

  handleNewLink = e => {
    const link = e;
    this.setState({ link });
  };

  handleAPICall = async e => {
    //get parts for call
    let place = this.state.place; //get place string from input
    const query = "*"; //get all weather data
    const units = "c"; //use SI units
    const URI = "https://query.yahooapis.com/v1/public/yql?q=";
    const YQLQuery = `select%20${query}%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${place}%22)%20and%20u%3D%22${units}%22&format=json`;
    //make the call
    // Authorization not really needed right now, 2000 unauthorized calls a day OK
    const api_call = await fetch(`${URI}${YQLQuery}`);
    let response, astronomyResponse;
    try {
      response = await api_call.json();
    } catch (e) {
      console.log(e);
    }
    this.setState({ response });
    place = "";
    this.setState({ place });
    try {
      const { lat, long } = response.query.results.channel.item;
      const astronomicalAPICall = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}`
      );
      astronomyResponse = await astronomicalAPICall.json();
      const { sunrise, sunset } = astronomyResponse.results;
      this.setState({ sunrise, sunset });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <h1>IlmaÄpp</h1>
        </header>
        <GHCorner
          href="https://github.com/askokr/IlmaApp.git"
          positon="top-right"
          bgColor="blue"
          size="95px"
          ariaLabel="Check my code"
        />
        <div>
          <Clouds />
          <div className="container search-container">
            <Input
              onPlaceInput={this.handlePlaceInput}
              place={this.state.place}
              onEnter={this.handleEnter}
              onSearch={this.handleAPICall}
            />
            <Weather
              response={this.state.response}
              sunrise={this.state.sunrise}
              sunset={this.state.sunset}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
