import React, { Component } from "react";

class Rightsection extends Component {
  constructor(props) {
    super(props);

    this.dropdownClick = this.dropdownClick.bind(this);
  }

  dropdownClick(e) {
    e.preventDefault();

    console.log(e.target.parentNode.target);
    let element = document.getElementById(e.target.target);
    if (!element.classList.contains("show")) {
      element.classList.add("show");
    } else {
      element.classList.remove("show");
    }
  }

  render() {
    return (
      <div id="right-section">
        <div className="right-section-wrapper">
          <h4 className="myclassesheader">My Classes</h4>
          <div className="divider"></div>
          <div className="dropdown">
            {/*/First class below*/}

            <a
              target="class1"
              onClick={this.dropdownClick}
              className="hoverable dropbtn"
            >
              <i className="left-icon material-icons">code</i>
              <span>CSC 430</span>
              <i className="right-icon material-icons">arrow_drop_down</i>
            </a>

            <div id="class1">
              <ul>
                <li>
                  <a href="#">Announcements</a>
                </li>
                <li>
                  <a href="#">Content</a>
                </li>
                <li>
                  <a href="#">Teacher</a>
                </li>
                <li>
                  <a href="#">Classmates</a>
                </li>
              </ul>
            </div>

            {/*/Second class below*/}
            <a
              target="class2"
              onClick={this.dropdownClick}
              className="hoverable dropbtn"
            >
              <i className="left-icon material-icons">code</i>
              <span>CSC 429</span>
              <i className="right-icon material-icons">arrow_drop_down</i>
            </a>
            <div id="class2">
              <ul>
                <li>
                  <a href="#">Announcements</a>
                </li>
                <li>
                  <a href="#">Content</a>
                </li>
                <li>
                  <a href="#">Teacher</a>
                </li>
                <li>
                  <a href="#">Classmates</a>
                </li>
              </ul>
            </div>

            {/*/Third class below*/}
            <a
              target="class3"
              onClick={this.dropdownClick}
              className="hoverable dropbtn"
            >
              <i className="left-icon material-icons">code</i>
              <span>CSC 446</span>
              <i className="right-icon material-icons">arrow_drop_down</i>
            </a>
            <div id="class3">
              <ul>
                <li>
                  <a href="#">Announcements</a>
                </li>
                <li>
                  <a href="#">Content</a>
                </li>
                <li>
                  <a href="#">Teacher</a>
                </li>
                <li>
                  <a href="#">Classmates</a>
                </li>
              </ul>
            </div>
            {/*/Fourth class below*/}
            <a
              target="class4"
              onClick={this.dropdownClick}
              className="hoverable dropbtn "
            >
              <i className="left-icon material-icons">code</i>
              <span>MTH 338</span>
              <i className="right-icon material-icons">arrow_drop_down</i>
            </a>
            <div id="class4">
              <ul>
                <li>
                  <a href="#">Announcements</a>
                </li>
                <li>
                  <a href="#">Content</a>
                </li>
                <li>
                  <a href="#">Teacher</a>
                </li>
                <li>
                  <a href="#">Classmates</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Rightsection;
