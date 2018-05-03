import socketIO from "socket.io-client";
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Fixedmenu from "./Fixedmenu";
import axios from "axios";
import uuid from "uuid";

const initialState = {
  endpoint: "https://csibridge.herokuapp.com/",
  current_url: "",
  socket: null,
  textbox: "",
  roomID: "",
  chatLog: [],
  currentChat: [],
  users: [],
  other_user: "",
  other_user_avatar: "",
  other_user_name: "",
  skip: 0
};
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  // Heroku deployment endpoint string "https://csibridge.herokuapp.com/"
  // Local chat endpoint string "http://localhost:5000"
  componentDidMount() {
    this.initializeComponent();
  }

  initializeComponent = () => {
    this.socketInit();
    this.keyDownInit();
    this.getOtherUser(this.props.location.pathname);
    this.scrollToBottom();
  }

  getOtherUser = url => {
    let user_id = url.slice(6);
    axios.get(`${"/api/user"}/${user_id}`).then(res => {
      this.setState({
        other_user: res.data, other_user_avatar: res.data.avatar, other_user_name: res.data.displayName
      });
  });
}

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.removeEventListener(
        "sendmessage",
        () => window.requestAnimationFrame(this.sendText),
        false
      );
      this.state.socket.disconnect();
      this.setState(initialState, this.initializeComponent);
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  keyDownInit = () => {
    if (document.getElementById("sendmessage")) {
      document.getElementById("sendmessage").addEventListener(
        "keydown",
        e => {
          e.preventDefault();
          if (e.keyCode == 13) this.sendText();
        },
        false
      );
    } else {
      setTimeout(this.keyDownInit, 50);
    }
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
      this.setState({
          socket: socket,
          roomID: new_roomID,
          users: users
        },
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
    let skip = this.calculateSkip();
    axios
      .get(`${"/api/chat_history"}/${this.state.roomID}/${skip}`)
      .then(res => {
        this.mapChatHistory(res.data);
      });
  };

  calculateSkip = () => {
    let skip = this.state.skip;
    if (skip == 0) {
      this.setState({
        skip: skip + 20
      });
      return 0;
    } else {
      this.setState({
        skip: skip + 20
      });
      return skip;
    }
  };

  mapChatHistory = data => {
    if(this.state.other_user){
      let chat_data = data.map(chat => {
        let class_name = "";
        let user_avatar = "";
        if (chat.user_id == this.props.user._id) {
          class_name = "my-messages";
        } else {
          class_name = "other-messages";
          user_avatar = ( 
          <img width="30px" height="30px" className = "other-user-avatar"
            src = {this.state.other_user_avatar}/>
          );
        }
        return ( 
        <div key = {chat.key} className = {class_name}> 
          {user_avatar} 
          <p> 
            {chat.message} 
          </p> 
        </div>
        );
      });
      this.setState({chatLog: chat_data}, this.connectToRoom);
    }else{
      setTimeout(()=>this.mapChatHistory(data), 200);
    }
  };

  connectToRoom = () => {
    this.state.socket.emit("subscribe", this.state.roomID);
  };

  componentWillUnmount() {
    console.log("UNMOUNT");
    window.removeEventListener(
      "sendmessage",
      () => window.requestAnimationFrame(this.sendText),
      false
    );
    this.state.socket.disconnect();
  }

  updateChat = data => {
    let newChat = this.state.currentChat.concat(data);
    this.setState({
      currentChat: newChat
    });
  };

  renderChat = () => {
    switch (this.state.currentChat) {
      case []:
        return "";
      default:
        return ( 
        <React.Fragment> {
            this.state.currentChat.map(data => {
              let class_name = "";
              let user_avatar = "";
              if (data.user_id == this.props.user._id) {
                class_name = "my-messages";
              } else {
                class_name = "other-messages";
                user_avatar = ( 
                <img width="30px" height="30px" className = "other-user-avatar"
                  src = {this.state.other_user_avatar}/>
                );
              }
              return ( 
              <div key = {data.key} className = {class_name}>
              {user_avatar}
                <p key> 
                {data.message} 
                </p>
              </div>
              );
            })
            } 
        </React.Fragment>
        );
    }
  };

  renderChatInput = () => {
    if (this.props.user) {
      return ( 
      <div className = "send-container">
        <img className = "circle"
        src = {this.props.user.avatar} />
        <div className = "input-wrapper" >
          <form id = "textarea1"
          onSubmit = {this.sendText} >
            <input type = "text"
            onChange = {this.onTextChange}
            value = {this.state.textbox}
            placeholder = "Input message here" />
          </form> 
        </div>
        <button id = "sendmessage"
          className = "btn"
          form = "textarea1"
          type = "submit" >
          <i className="material-icons">send</i> 
        </button> 
      </div>
      );
    } else {
      return "";
    }
  };

  sendText = e => {
    e.preventDefault();
    this.state.socket.emit("private message", {
      room: this.state.roomID,
      user_id: this.props.user._id,
      user_name: this.props.user.displayName,
      key: uuid(),
      message: this.state.textbox,
      date: Date.now()
    });

    this.setState({
      textbox: ""
    });
  };

  onTextChange = e => {
    e.preventDefault();
    this.setState({
      textbox: e.target.value
    });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return ( 
    <div id = "content-section-container" className = "container">
      <div className = "row" id = "content-area-row">
        <div className = "col l2 xl2 hide-on-med-and-down">
          <Fixedmenu />
        </div> 
        <div className = "col s12 m12 l8 xl8" style = {{textAlign: "center"}}>
          <div id="chat-header" className="z-depth-1">
            <h4>{this.state.other_user_name}</h4>
          </div>
          <div id = "chat-box" className="z-depth-1" > 
            {this.state.chatLog} 
            {this.renderChat()} 
            <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}/>
          </div> 
          {this.renderChatInput()} 
        </div> 
      </div> 
    </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(Chat));