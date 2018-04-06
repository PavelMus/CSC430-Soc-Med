import socketIO from "socket.io-client";
import React, { Component } from "react";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:5000",
      messages: [],
      socketInterval: null,
      socket: null,
      textbox: ""
    };
  }
  // https://nameless-lake-54965.herokuapp.com
  componentDidMount() {
    if (!this.state.socketInterval){
      let pollInterval = setInterval(
        this.checkSockets,
        1000
      );
      let socket = socketIO(this.state.endpoint);

      this.setState({socketInterval: pollInterval, socket: socket});
    }
  }
  componentWillUnmount() {
    this.state.socketInterval && clearInterval(this.state.socketInterval);
    this.setState({socketInterval: null});
  }

  updateChat = (msg) => {
    let newChat = this.state.messages.concat(msg);
    console.log(msg);
    console.log(this.state.messages);
    
    
    this.setState({messages: newChat});
  }

  renderChat = () => {
    switch (this.state.messages) {
      case []:
        return "";
      default:
        return (
          <div>
           {this.state.messages.map(data => (
            <h6>{data}</h6>
           ))}
          </div>
        );
    }
  }

  checkSockets = () => {
    this.state.socket;
    console.log("socket check");
    this.state.socket.on("recieve-text", message => { 
      this.updateChat(message);
    });
  }

  sendText = (e) => {
    e.preventDefault();
    //const socket = socketIO(this.state.endpoint);
    //console.log(e.taget);
    
    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.
 
    this.state.socket.emit("text", "HELLO");
    
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  };
  // adding the function
  setColor = color => {
    this.setState({ color });
  };
  onTextChange = (e) => {
    this.setState({textbox: e.value});
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
          
        <div className="input-field col s12">
        <form id="textarea1" onSubmit={this.sendText}>
              <input type="text" onChange={this.onTextChange} value={this.state.textbox} className="materialize-textarea"></input>
        </form>
              <button className="btn" form="textarea1" type="submit">SUBMIT</button>
        </div>
      </div>
    );
  }
}
