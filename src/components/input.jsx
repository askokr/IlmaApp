import React, { Component } from "react";

class Input extends Component {
  render() {
    const { place, onPlaceInput, onSearch, onEnter } = this.props;
    return (
      <div className="d-flex flex-column">
        <div>
          <input
            type="text"
            value={place}
            maxLength="42"
            onChange={onPlaceInput}
            onKeyPress={onEnter}
            placeholder={"Sisesta kohanimi"}
            className="form-control search-text"
          />
        </div>
        <div className="align-self-center">
          <button onClick={onSearch} className="btn btn-primary m-2">
            Otsi ilma
          </button>
        </div>
      </div>
    );
  }
}

export default Input;
