import React, { Component } from "react";
import { connect } from "react-redux";
import { removeCar,carsLoading } from "../../actions/carsActions";
import Spinner from "../common/spinner/spinner";

class RemoveCar extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username:'',
        carNumber: "",
        error: "",
        success: ""
      }
    };
  

  componentDidMount() {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }
    this.setState({
      username: this.props.userData.userData.username
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({
      error:nextProps.carsData.errorRemove,
      success:nextProps.carsData.successRemove
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      carNumber: this.state.carNumber
    };
    this.props.carsLoading();
    this.props.removeCar(data);
  };


  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div className="dashboard">

          <h1>Remove car</h1>
          <form onSubmit={this.onSubmit}>
            <label>Remove car: </label>
            <input
              required={true}
              type="text"
              name="carNumber"
              value={this.state.carNumber}
              onChange={this.onChange}
            />
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
  mapStateToProps,
  { removeCar,carsLoading }
)(RemoveCar);
