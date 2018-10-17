import React, { Component } from "react";
import APICall from "./components/apiCaller";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    place: ""
  };
  handlePlaceInput = e => {
    const place = e.target.value;
    this.setState({ place });
  };

  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <h1>IlmaÄpp</h1>
        </header>
        <div>
          {/* <a
            href="https://www.yahoo.com/?ilc=401"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <img
              src="https://poweredby.yahoo.com/purple.png"
              width="134"
              height="29"
              alt="Weather info from Yahoo!"
            />{" "}
          </a> */}
        </div>
        <div className="container">
          <APICall
            onPlaceInput={this.handlePlaceInput}
            place={this.state.place}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
