import React, { Component } from 'react';

class Newsfeed extends Component {
  constructor(props){
    super(props);

    this.state = {term: " "};
  }
  render() {
    return (
      <div className="col s12 m4 l4 xl4" id="newsfeed">
          <h3>News feed</h3>
      </div>


    );
  }
}


export default Newsfeed;
