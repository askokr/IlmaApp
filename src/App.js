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
    sunset: "",
    updateSwitch: false
  };

  handleAPICall = async () => {
    let response, astronomyResponse;
    let place = this.state.place;
    const updateSwitch = !this.state.updateSwitch;
    if (place !== "") {
      const query = "*"; //get all weather data
      const units = "c"; //use SI units
      const URI = "https://query.yahooapis.com/v1/public/yql?q=";
      const YQLQuery = `select%20${query}%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${place}%22)%20and%20u%3D%22${units}%22&format=json`;
      const api_call = await fetch(`${URI}${YQLQuery}`);
      try {
        response = await api_call.json();
        try {
          const { lat, long } = response.query.results.channel.item;
          const astronomicalAPICall = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0`
          );
          astronomyResponse = await astronomicalAPICall.json();
          let { sunrise, sunset } = astronomyResponse.results;
          this.setState({ sunrise, sunset });
        } catch (e) {
          // console.log(e);
        }
      } catch (e) {
        // console.log(e);
      }
      place = "";
      this.setState({ place, response, updateSwitch });
    }
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleAPICall();
    }
  };

  handleNewLink = e => {
    const link = e;
    this.setState({ link });
  };

  handlePlaceInput = e => {
    const place = e.target.value;
    this.setState({ place });
  };

  render() {
    return (
      <div className="mobileHider">
        <div>
          <header className="App-header">
            <h1>IlmaÄpp</h1>
          </header>
        </div>
        <div>
          <Clouds />
          <div className="container search-container">
            <Input
              onPlaceInput={this.handlePlaceInput}
              onEnter={this.handleEnter}
              onSearch={this.handleAPICall}
              updateSwitch={this.state.updateSwitch}
            />
            <Weather
              response={this.state.response}
              updateSwitch={this.state.updateSwitch}
              sunrise={this.state.sunrise}
              sunset={this.state.sunset}
            />
          </div>
        </div>
        <GHCorner
          href="https://github.com/askokr/IlmaApp.git"
          positon="top-right"
          bgColor="blue"
          size="6.05em"
          ariaLabel="Check my code"
        />
      </div>
    );
  }
}

export default App;
