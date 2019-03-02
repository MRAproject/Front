import React, { Component } from "react";
import { connect } from "react-redux";
import { addCar,carsLoading } from "../../actions/carsActions";
import Spinner from "../common/spinner/spinner";

class AddCar extends Component {
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
    this.setState({
      username: this.props.userData.userData.username
    });

    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({
      error:nextProps.carsData.errorAdd,
      success:nextProps.carsData.successAdd
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
    this.props.addCar(data);
    
  };

  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div className="dashboard">

          <h1>Add car</h1>
          <form onSubmit={this.onSubmit}>
            <label>Add new car: </label>
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
  { addCar,carsLoading }
)(AddCar);
