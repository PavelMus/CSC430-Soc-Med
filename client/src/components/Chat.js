import socketIO from "socket.io-client";
import React, { Component } from "react";
import { connect } from 'react-redux';
import Fixedmenu from "./Fixedmenu";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:5000",
      messages: [],
      socket: null,
      textbox: "",
      roomID: ''
    };
  }
  // https://nameless-lake-54965.herokuapp.com

  componentDidMount() {
    this.socketInit();
    document.getElementById("sendmessage").addEventListener('keydown', e =>{
      e.preventDefault();
      if(e.keyCode == 13) this.sendText();
    }, false);
  }

  socketInit = () =>{
    if(this.props.user == null){
      setTimeout(this.socketInit, 100);
    }
    else if(this.state.socket === null){
      let socket = socketIO(this.state.endpoint);
      socket.on('private response', data => {
        this.updateChat(data.message);
      });
      let new_roomID = this.generateRoomID();
      this.setState({socket: socket, roomID: new_roomID}, this.connectToRoom);
    }
  }

  connectToRoom = () => {
    this.state.socket.emit('subscribe', this.state.roomID);
  }

  generateRoomID = () => {
    let user1 = this.props.user._id;
    let user2 = this.props.location.pathname.slice(6);
    console.log(this.props.location.pathname.slice(6));
    
    let index = 0;
    let roomId = "";
    if(user1.length < user2.length){
      index = user1.length;}
      else{
        index = user2.length;}
    for(var i = 0; i < index; i++){
      let temp1 = user1.slice(i,i+1);
      let temp2 = user2.slice(i, i+1);
      let tempRoomIdPart = String(parseInt(temp1, 16)+parseInt(temp2, 16));
      roomId += tempRoomIdPart;
    }
    return roomId;
  }

  componentWillUnmount() {
    console.log("UNMOUNT");
    this.state.socket.disconnect();
  }

  updateChat = (msg) => {
    let newChat = this.state.messages.concat(msg);
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

  sendText = (e) => {
    e.preventDefault()
    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.
    let temp_message = this.state.textbox;
    this.state.socket.emit('private message', {
      room: this.state.roomID, 
      message: temp_message
    });
    this.setState({textbox:""});
  };

  onTextChange = (e) => {
    e.preventDefault();
    this.setState({textbox: e.target.value});
  }
  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="col s12 m2 l2 xl2">
            <Fixedmenu />
          </div>
          <div className="col s12 m2 l8 xl8 offset-l1 offset-xl1" style={{ textAlign: "center" }}>
            <div id="chat-box">
                {this.renderChat()}
            </div>
            <div className="input-field col s10">
              <form id="textarea1" onSubmit={this.sendText}>
                    <input type="text" onChange={this.onTextChange} value={this.state.textbox} className="materialize-textarea"></input>
              </form>
            </div>
            <div className="col s2">
              <button id="sendmessage" className="btn" form="textarea1" type="submit">SUBMIT</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

var mapStateToProps = state =>{
  return {user: state.user}
}

export default connect(mapStateToProps)(Chat);
