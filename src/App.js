import React, { Component } from "react";
import APICall from "./components/apiCaller";
import GHCorner from "react-gh-corner";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    place: "",
    link: "https://www.yahoo.com/?ilc=401"
  };
  handlePlaceInput = e => {
    const place = e.target.value;
    this.setState({ place });
  };
  //
  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleWeather();
    }
  };

  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <h1>IlmaÄpp</h1>
        </header>
        <div />
        <GHCorner
          href="https://github.com/askokr/IlmaApp.git"
          positon="top-right"
          bgColor="blue"
          size={95}
          ariaLabel="Check my project"
        />
        <div />
        <div className="container">
          <APICall
            onPlaceInput={this.handlePlaceInput}
            place={this.state.place}
          />
        </div>

        <div>
          <a href={this.state.link} target="_blank" rel="noopener noreferrer">
            {" "}
            <img
              src="https://poweredby.yahoo.com/purple.png"
              width="134"
              height="29"
              alt="Weather info from Yahoo!"
            />{" "}
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
