import React, { Component } from "react";
import { connect } from "react-redux";
import {editUserLoading,editUser } from "../../actions/userActions";
import Spinner from "../common/spinner/spinner";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username:'',
        firstName:'',
        lastName:'',
        password:'',
        capacity:'',
        error: "",
        success: ""
      }
    };
  

  componentDidMount() {

    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({
      username:this.props.userData.userData.username,
      firstName:this.props.userData.userData.firstName,
      lastName:this.props.userData.userData.lastName,
      password:this.props.userData.userData.password,
      capacity:this.props.userData.userData.capacity
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({
      error:nextProps.userData.errorEdit,
      success:nextProps.userData.successEdit
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      username:this.state.username,
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      password:this.state.password,
      capacity:this.state.capacity
    };
    this.props.editUserLoading();
    this.props.editUser(data);
  };


  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div className="dashboard">

          <h1>Edit user</h1>
          <form onSubmit={this.onSubmit}>
            <label>username: </label>
             <input
              required={true}
              type="text"
              disabled={true}
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
             <br/>
             <label>password: </label>
             <input
              required={true}
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br/>
            <label>First name: </label>
            <input
              required={true}
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.onChange}
            />
            <br/>
             <label>Last name: </label>
            <input
              required={true}
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.onChange}
            />
            <br/>
            <label>capcity: </label>
             <input
              required={true}
              type="text"
              name="capacity"
              value={this.state.capacity}
              onChange={this.onChange}
            />
            <br/>
            <input type="submit" value="Submit" />
            <p>
              {this.state.error}
              {this.state.success}
            </p>
          </form>

        
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    carsData: state.carsData,
    loading: state.userData.loading,
    userData: state.userData,
  };
};

export default connect(
  mapStateToProps,{editUserLoading,editUser}
)(EditUser);
