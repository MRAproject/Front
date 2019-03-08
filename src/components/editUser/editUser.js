import React, { Component } from "react";
import { connect } from "react-redux";
import {carsLoading } from "../../actions/carsActions";
import Spinner from "../common/spinner/spinner";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username:'',
        firstName:'',
        lastName:'',
        error: "",
        success: ""
      }
    };
  

  componentDidMount() {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({
      firstName: this.props.userData.userData.firstName,
      lastName: this.props.userData.userData.lastName
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    // this.setState({
    //   error:nextProps.userData.errorEdit,
    //   success:nextProps.userData.successEdit
    // })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    // const data = {
    //   username: this.state.username,
    //   carNumber: this.state.carNumber
    // };
    // this.props.carsLoading();
    // this.props.removeCar(data);
  };


  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div className="dashboard">

          <h1>Edit user</h1>
          <form onSubmit={this.onSubmit}>
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
    loading: state.carsData.loading,
    userData: state.userData,
  };
};

export default connect(
  mapStateToProps,null
)(EditUser);
