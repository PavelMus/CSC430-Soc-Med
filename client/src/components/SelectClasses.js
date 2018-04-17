import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";
import * as M from "materialize-css";

class SelectClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "",
      classList: "",
      class_cart: [],
      selected_classes: [],
      formInit: "",
      selectedType: "",
      renderModal: false
    };
  }

  componentDidMount() {
    let elem = document.getElementById("cType");
    let init = M.FormSelect.init(elem);
    this.setState({ formInit: init });
    this.props.fetchTeachers("/api/teacher-list");
  }

  componentWillUnmount() {
    this.state.formInit.destroy();
  }

  getTeacherName = id => {
    let teacher = this.props.teachers.list.find(teacher => {
      return teacher._id == id;
    });
    return teacher.displayName;
  };

  selectedClassType = e => {
    e.preventDefault();
    this.setState({ selectedType: e.target.value }, this.loadClasses);
  };

  loadClasses = () => {
    axios.get(`${"/api/class-list"}/${this.state.selectedType}`)
    .then(res => {
      this.setState({ classes: res.data }, this.generateClassList);
    });
  };

  addClass = e => {
    e.preventDefault();
    let elem = document.getElementById(e.target.value);
    elem.classList.add("disabled");
    elem.innerText = "selected";
    this.updateCart(e.target.value);
  };

  removeFromCart = e => {
    e.preventDefault();
    let _class_cart = this.state.class_cart;
    let _class = _class_cart.find(cls=>{return cls.key === e.target.value + "cart"});
    let index = _class_cart.indexOf(_class);
    _class_cart.splice(index, 1);

    let _selected_classes = this.state.selected_classes;
    let _selected = _selected_classes.find(id => {return id === e.target.value});
    let _s_index = _selected_classes.indexOf(_selected);
    _selected_classes.splice(_s_index, 1);

    this.setState({class_cart: _class_cart, 
      selected_classes: _selected_classes}, 
      this.updateCartButton);

    let elem = document.getElementById(e.target.value);
    elem.classList.remove("disabled");
    elem.innerText = "select";
  }

  updateCartButton = () => {
    let elem = document.getElementById("checkout_button");
    if(this.state.class_cart.length !== 0){
      elem.classList.remove("disabled");
    }else{
      elem.classList.add("disabled");
    }
  }

  updateCart = class_id =>{
    let _class = this.state.classes.find(_class =>{
      return _class._id == class_id;
    });
    let list = this.state.class_cart;
    list.push(
        <React.Fragment key={_class._id + "cart"}>
          <li className="col s2">{_class.type}{_class.level}</li>
          <li className="col s6">{_class.subject}</li>
          <li className="col s2">{_class.section}</li>
          <button className="col s2 btn-small" value={class_id} onClick={this.removeFromCart}>
            <i className="material-icons">delete</i>
          </button>
        </React.Fragment>
      );
    let selected = this.state.selected_classes;
    selected.push(class_id)
    this.setState({class_cart: list, 
      selected_classes: selected}, 
      this.updateCartButton);
  }

  generateClassList = () => {
    let _classList = this.state.classes.map(_class => {
      let user_classes = this.props.user.classes;
      if(user_classes.find(x => {
        return x._id === _class._id;
      })){}else{
      return (
        <React.Fragment key={_class._id}>
          <li className="col s2">
            {_class.type}
            {_class.level}
          </li>
          <li className="col s4">{_class.subject}</li>
          <li className="col s3">{this.getTeacherName(_class.teacher)}</li>
          <li className="col s2">{_class.section}</li>
          <li className="col s1">
            <button
              id={_class._id}
              value={_class._id}
              onClick={this.addClass}
              className="waves-effect waves-light btn-small"
            >
              select
            </button>
          </li>
        </React.Fragment>
      );
    }
    });
    this.setState({ classList: _classList });
  };

  submitClassRequest = () => {
    let _classes = this.state.classes;
    let selected = this.state.selected_classes;
    let add_classes = [];
    _classes.map(cls => {
      var i;
      for(i = 0; i < selected.length; i++){
        if(cls._id === selected[i]) add_classes.push(cls);
      }
    });
    let data = {user: this.props.user._id, classes: add_classes};
    axios.put("/api/add_class_to_user", data).then(res => {
      this.setState({renderModal: true});
    });
  }

  backToFrontPage = () => {
    this.props.history.push("/");
  }

  renderModal = () => {
    return (
      <React.Fragment>
        <div className="modal-underlay" />
        <div className="modal">
          <div className="modal-content">
            <h5>Classes Added</h5>
            <p>You will have to wait for a teacher or an administrator to verify your class selection.</p>
          </div>
          <div className="modal-footer">
            <button onClick={this.backToFrontPage}>close</button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  //The function waits for the fetchTeacher reducer to finish grabbing the data
  // of the teachers from the database before rendering out the form in order to prevent
  // undefined errors
  renderForm = () => {
    switch (this.props.teachers) {
      case []:
        return "";
      default:
        return (
          <form className="col s8" onSubmit={this.onClassSubmit}>
              <div className="col s12 input-field">
                <select
                  defaultValue="1"
                  id="cType"
                  onChange={this.selectedClassType}
                >
                  <option disabled value="1">
                    Select Class Type
                  </option>
                  <option value="CSC">CSC</option>
                  <option value="ENG">ENG</option>
                  <option value="MTH">MTH</option>
                </select>
                <label>Class Type</label>
              </div>
              <ul id="class-list" className="col s12">
                <li className="col s2">Class</li>
                <li className="col s4">Subject</li>
                <li className="col s3">Instructor</li>
                <li className="col s2">Section</li>
                <div className="col s12 divider" />
                {this.state.classList}
              </ul>
          </form>
        );
    }
  };

  render() {
    return (
      <div id="class-select-area" className="container">
        <div className="row">
          <div id="class-cart" className="col s4">
            <h6>Selected Classes</h6>
            <div className="divider" />
            <ul className="col s12">
              {this.state.class_cart}
            </ul>
            <button id="checkout_button" 
                    className="col s12 btn-small disabled"
                    onClick={this.submitClassRequest}
                    > submit request</button>
          </div>
          {this.renderForm()}
        </div>
        {this.state.renderModal?this.renderModal():""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { teachers: state.teachers, user: state.user };
};
export default connect(mapStateToProps, actions)(SelectClasses);
