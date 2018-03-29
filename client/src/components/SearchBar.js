import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div className="col m4 l5 xl5">
        <form id="header-search-bar">
          <div className="input-field">
            <input id="search" type="search" required />
            <label className="label-icon" for="search">
              <i class="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
