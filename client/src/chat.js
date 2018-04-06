import socketIO from "socket.io-client";
import React, { Component } from "react";

export default class chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "https://nameless-lake-54965.herokuapp.com"
    };
  }

  send = () => {
    const socket = socketIO(this.state.endpoint);

    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.

    socket.emit("change color", "red");
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  };
  // adding the function
  setColor = color => {
    this.setState({ color });
  };
  render() {
    // Within the render method, we will be checking for any sockets.
    // We do it in the render method because it is ran very often.
    const socket = socketIO(this.state.endpoint);

    // socket.on is another method that checks for incoming events from the server
    // This method is looking for the event 'change color'
    // socket.on takes a callback function for the first argument
    socket.on("change color", color => {
      // setting the color of our button
      document.body.style.backgroundColor = color;
    });

    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send()}>Change Color</button>

        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>

      </div>
    );
  }
}
