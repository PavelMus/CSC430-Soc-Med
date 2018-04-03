import React, { Component } from "react";

class Rightsection extends Component {
  constructor(props) {
    super(props);

    this.dropdownClick = this.dropdownClick.bind(this);
  }
  dropdownClick(e){
    let dropdown = document.getElementById("myDropdown");

    //let clicked = (this.props.showDropdown ===)
  }

  render() {
    return (
      <div className="col s12 m3 l3 xl3 offset-xl4" id="right-section">
        <h4>My Classes</h4>

        <div className="dropdown">
          <button onClick={this.dropdownClick} className="dropbtn">Dropdown</button>


          <div id="classesDropdown" className="(this.props.showDropdown)">
            <ul>
              <li><a href="#">CSC 430</a></li>
              <li><a href="#">CSC 429</a></li>
              <li><a href="#">CSC 446</a></li>
              <li><a href="#">MTH 338</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Rightsection;
