import React, { Component } from "react";
// import axios from "axios";
// import config from "../../config/config";
import ReactTable from "react-table";
import { connect } from "react-redux";
import {
  getAllCars,
  getAllCarsLoading,
  addCar
} from "../../actions/carsActions";
// import { getUser } from "../../actions/userActions";
import "react-table/react-table.css";
import Spinner from "../common/spinner/spinner";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "amitmarko",
      firstName: "",
      lastName: "",
      addCar: {
        carNumber: "",
        error: "",
        success: ""
      },
      removeCar: {
        carNumber: "",
        error: "",
        success: ""
      },
      cars: [],
      usersColums: [
        {
          Header: "Car number",
          accessor: "carNumber" // String-based value accessors!
        },
        {
          Header: "Is inside",
          accessor: "isInside"
        }
      ]
    };
  }

  componentDidMount() {
    // const userData = sessionStorage.getItem("userData");
    this.props.getAllCarsLoading();
    this.props.getAllCars("amitmarko");
    // this.setState({
    //   username: userData.username,
    //   firstName: userData.firstName,
    //   lastName: userData.lastName
    // });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ cars: nextProps.cars });
  }
  onChangeAddCar = e => {
    this.setState({
      addCar: {
        carNumber: e.target.value,
        error: "",
        success: ""
      }
    });
  };
  onChangeRemoveCar = e => {
    this.setState({
      removeCar: {
        carNumber: e.target.value,
        error: "",
        success: ""
      }
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitAddCar = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      carNumber: this.state.addCar.carNumber
    };
    this.addCar(data);
  };
  onSubmitRemoveCar = e => {
    e.preventDefault();
    // const data = {
    //   username: this.state.username,
    //   carNumber: this.state.removeCar.carNumber
    // };
    // this.removeCar(data);
  };

  // removeCar = async data => {
  //   let cars = this.state.cars;
  //   cars.push({
  //     username: this.state.username,
  //     carNumber: data.newCar.carNumber,
  //     isInside: 0
  //   });
  //   console.log(cars);
  //   console.log(cars.length);

  //   try {
  //     const response = await axios.post(`${config.host}/add_car`, data);
  //     if (response.data.status === "successful") {
  //       this.setState({
  //         removeCar: {
  //           success: `Car ${data.carNumber} added succefully`,
  //           error: ""
  //         },
  //         cars: cars
  //       });
  //     } else {
  //       this.setState({
  //         removeCar: {
  //           success: "",
  //           error: `Car ${data.carNumber} already exist!`
  //         }
  //       });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  addCar = async data => {
    let cars = this.state.cars;
    cars.push({
      username: this.state.username,
      carNumber: data.carNumber,
      isInside: 0
    });
    try {
      this.props.addCar(data);
      this.props.getAllCarsLoading();
      this.props.getAllCars(this.state.username);
    } catch (e) {
      console.log(e);
    }
  };

  logout = e => {
    sessionStorage.removeItem("userData");
    this.props.history.push("/");
  };

  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div className="login">
          <input type="button" onClick={this.logout} value="Log out" />
          <h1>Dashboard</h1>
          <h2>
            Welcome {this.state.firstName} {this.state.lastName}
          </h2>
          <form onSubmit={this.onSubmitAddCar}>
            <label>Add a new car: </label>
            <input
              type="text"
              name="carNumber"
              value={this.state.addCar.carNumber}
              onChange={this.onChangeAddCar}
            />
            <input type="submit" value="Submit" />
            <p>
              {this.state.addCar.error}
              {this.state.addCar.success}
            </p>
          </form>

          <form onSubmit={this.onSubmitRemoveCar}>
            <label>Remove a car: </label>
            <input
              type="text"
              name="carNumber"
              value={this.state.removeCar.carNumber}
              onChange={this.onChangeRemoveCar}
            />
            <input type="submit" value="Submit" />
            <p>
              {this.state.removeCar.error}
              {this.state.removeCar.success}
            </p>
          </form>
          <ReactTable data={this.props.cars} columns={this.state.usersColums} />
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    cars: state.carsData.cars,
    loading: state.carsData.loading
  };
};

export default connect(
  mapStateToProps,
  { getAllCars, getAllCarsLoading, addCar }
)(DashBoard);
