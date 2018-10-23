import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";

class Input extends Component {
  shouldComponentUpdate(nextProps) {
    const update = this.props.updateSwitch !== nextProps.updateSwitch;
    if (update) {
      let input = document.getElementById("input");
      input.value = "";
    }
    return update;
  }

  render() {
    const { onEnter, onPlaceInput, onSearch } = this.props;
    return (
      <div className="d-flex flex-column">
        <div>
          <DebounceInput
            minLength={1}
            debounceTimeout={500}
            id="input"
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
