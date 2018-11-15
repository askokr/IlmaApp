import React, { Component } from "react";
import Clouds from "./components/clouds";
import GHCorner from "react-gh-corner";
import Input from "./components/input";
import Weather from "./components/weatherComponent";
import { getWeather, getAstronomy } from "./components/util/apicallers";
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
      response = await getWeather(place);
      try {
        const { lat, long } = response.query.results.channel.item;
        astronomyResponse = await getAstronomy(lat, long);
        let { sunrise, sunset } = astronomyResponse.results;
        this.setState({ sunrise, sunset });
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
