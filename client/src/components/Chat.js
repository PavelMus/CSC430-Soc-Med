import socketIO from "socket.io-client";
import React, { Component } from "react";
import { connect } from 'react-redux';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "https://nameless-lake-54965.herokuapp.com",
      messages: [],
      socketInterval: null,
      socket: null,
      textbox: ""
    };
  }
  // https://nameless-lake-54965.herokuapp.com

  socketInit = () =>{
    if(this.state.socket == null){
      let socket = socketIO(this.state.endpoint);
      this.setState({socket: socket}, this.checkSockets);
    }
    
  }
  componentDidMount() {
   // if (!this.state.socketInterval){
     // let pollInterval = setInterval(
     //   this.checkSockets,
     //   1000
      //);
      this.socketInit();
      //this.setState({socketInterval: pollInterval});
  //  }
  }
  componentWillUnmount() {
    this.state.socketInterval && clearInterval(this.state.socketInterval);
    this.setState({socketInterval: null});
  }

  updateChat = (msg) => {
    let newChat = this.state.messages.concat(msg.message);
    console.log(this.state.textbox);
    
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
            <p>{this.props.user.displayName}: {data}</p>
           ))}
          </div>
        );
    }
  }

  checkSockets = () => {
    this.state.socket.on("text", message => { 
      console.log(message);
      this.updateChat(message);
    });
    this.state.socket.on('socket-data', (data) =>{
      console.log(data);
    });
  }

  sendText = (e) => {
    e.preventDefault();
    //const socket = socketIO(this.state.endpoint);
    //console.log(e.taget);
    
    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.
 
    this.state.socket.emit("text", {message: this.state.textbox});
    
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  };
  // adding the function
  setColor = color => {
    this.setState({ color });
  };
  onTextChange = (e) => {
    e.preventDefault();
    this.setState({textbox: e.target.value});
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div id="chat-box">
            {this.renderChat()}
        </div>
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

var mapStateToProps = state =>{
  return {user: state.auth}
}

export default connect(mapStateToProps)(Chat);