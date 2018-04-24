import socketIO from "socket.io-client";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Fixedmenu from "./Fixedmenu";
import axios from "axios";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:5000",
      socket: null,
      textbox: "",
      roomID: "",
      chatLog: [],
      currentChat: [],
      users: []
      //uploadInterval: null
    };
  }
  // https://nameless-lake-54965.herokuapp.com

  componentDidMount() {
    this.socketInit();
    document.getElementById("sendmessage").addEventListener(
      "keydown",
      e => {
        e.preventDefault();
        if (e.keyCode == 13) this.sendText();
      },
      false
    );
    //if (!this.state.uploadInterval)
    //this.state.uploadInterval = setInterval(
    //  this.uploadCurrentChat,
    //  10000
    //);
  }

  uploadCurrentChat = (data) => {
    console.log("UPLOADING ON: " + data.date);
    axios
      .put(`${"/api/chat_history_save"}/${this.state.roomID}`, data);
  };

  socketInit = () => {
    if (this.props.user == null) {
      setTimeout(this.socketInit, 100);
    } else if (this.state.socket === null) {
      let socket = socketIO(this.state.endpoint);
      socket.on("private response", data => {
        this.updateChat(data);
      });
      let users = this.getUsers();
      let new_roomID = this.generateRoomID(users);
      this.setState(
        { socket: socket, roomID: new_roomID, users: users },
        this.loadChatHistory
      );
    }
  };

  getUsers = () => {
    let user1 = this.props.user._id;
    let user2 = this.props.location.pathname.slice(6);
    let users = [];
    users.push(user1);
    users.push(user2);
    return users;
  };

  generateRoomID = users => {
    let index = 0;
    let roomId = "";
    if (users[0].length < users[1].length) {
      index = users[0].length;
    } else {
      index = users[1].length;
    }
    for (var i = 0; i < index; i++) {
      let temp1 = users[0].slice(i, i + 1);
      let temp2 = users[1].slice(i, i + 1);
      let tempRoomIdPart = String(parseInt(temp1, 16) + parseInt(temp2, 16));
      roomId += tempRoomIdPart;
    }
    return roomId;
  };

  loadChatHistory = () => {
    axios.get(`${"/api/chat_history"}/${this.state.roomID}`).then(res => {
      let msg = res.data.message;
      if (msg == "NOT FOUND") {
        axios
          .post(
            `${"/api/chat_history"}/${this.state.roomID}/${
              this.state.users[0]
            }/${this.state.users[1]}`
          )
          .then(res => {
            this.loadChatHistory();
          });
      } else {
        console.log(res.data);

        this.mapChatHistory(res.data);
      }
    });
  };

  mapChatHistory = data => {
    let chat_data = data.content.map(text => {
      console.log(text.date);
      return (
          <p key={text.date}>
            {text.displayName}: {text.message}
          </p>
      );
    });
    this.setState({ chatLog: chat_data }, this.connectToRoom);
  };

  connectToRoom = () => {
    this.state.socket.emit("subscribe", this.state.roomID);
  };

  componentWillUnmount() {
    console.log("UNMOUNT");
    window.removeEventListener("sendmessage",
    () => window.requestAnimationFrame(this.sendText), false);
    //this.uploadCurrentChat();
    //this.state.uploadInterval && clearInterval(this.state.uploadInterval);
    //this.setState({uploadInterval: null});
    this.state.socket.disconnect();
  }

  updateChat = data => {
    let newChat = this.state.currentChat.concat(data);
    this.setState({ currentChat: newChat });
  };

  renderChat = () => {
    switch (this.state.currentChat) {
      case []:
        return "";
      default:
        return (
          <React.Fragment>
            {this.state.currentChat.map(data => {
              return (
                <p key={data.date}>
                  {data.displayName}: {data.message}
                </p>
              );
            })}
          </React.Fragment>
        );
    }
  };

  sendText = e => {
    e.preventDefault();
    let data = {
      displayName: this.props.user.displayName,
      message: this.state.textbox,
      date: Date.now()
    };

    this.uploadCurrentChat(data);

    this.state.socket.emit("private message", {
      room: this.state.roomID,
      displayName: this.props.user.displayName,
      message: this.state.textbox,
      date: data.date
    });

    this.setState({ textbox: "" });
  };

  onTextChange = e => {
    e.preventDefault();
    this.setState({ textbox: e.target.value });
  };

  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="col s12 m2 l2 xl2">
            <Fixedmenu />
          </div>
          <div
            className="col s12 m2 l8 xl8 offset-l1 offset-xl1"
            style={{ textAlign: "center" }}
          >
            <div id="chat-box">
              {this.state.chatLog}
              {this.renderChat()}
            </div>
            <div className="input-field col s10">
              <form id="textarea1" onSubmit={this.sendText}>
                <input
                  type="text"
                  onChange={this.onTextChange}
                  value={this.state.textbox}
                  className="materialize-textarea"
                />
              </form>
            </div>
            <div className="col s2">
              <button
                id="sendmessage"
                className="btn"
                form="textarea1"
                type="submit"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(Chat));
