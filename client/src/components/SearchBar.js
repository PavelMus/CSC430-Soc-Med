import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div id="header-search-bar" className="col m3 l4 xl5">
        <form>
          <div className="input-field">
            <input id="search" type="search" required />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
