import React, { Component } from "react";
import ReactTable from "react-table";
import { connect } from "react-redux";
import {
  getAllCars,
  get_times,
  carsLoading,
  addCar,
  removeCar
} from "../../actions/carsActions";
import "react-table/react-table.css";
// import Spinner from "../common/spinner/spinner";
import Navbar from "../common/navbar/navbar";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      capacity: 0,
      cars: [],
      times: [],
      timesColumns: [
        {
          Header: "car number",
          accessor: "carNumber" // String-based value accessors!
        },
        {
          Header: "enter",
          accessor: "enter" // String-based value accessors!
        },
        {
          Header: "exit",
          accessor: "exit"
        }
      ],
      carsInside: 0
    };
  }

  componentDidMount() {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState(
      {
        username: this.props.userData.userData.username,
        firstName: this.props.userData.userData.firstName,
        lastName: this.props.userData.userData.lastName,
        capcity: this.props.userData.userData.capcity
      },
      () => {
        this.props.carsLoading();
        this.props.get_times(this.state.username);
        this.props.getAllCars(this.state.username);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    let carsInside = 0;
    nextProps.carsData.cars.forEach(function(car) {
      if (car.isInside) {
        carsInside++;
      }
    });

    this.setState({
      username: nextProps.carsData.username,
      cars: nextProps.carsData.cars,
      times: nextProps.carsData.times,
      carsInside
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="content">
          <div className="dashboard">
            <h1>Dashboard</h1>
            <h2>
              Welcome {this.state.firstName} {this.state.lastName}
            </h2>
            <div className="dashboard__left">
              <ReactTable
                data={this.state.times}
                columns={this.state.timesColumns}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    carsData: state.carsData,
    loading: state.carsData.loading,
    userData: state.userData
  };
};

export default connect(
  mapStateToProps,
  { getAllCars, get_times, carsLoading, addCar, removeCar }
)(DashBoard);
