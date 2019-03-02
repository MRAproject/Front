import React, { Component } from "react";
import ReactTable from "react-table";
import { connect } from "react-redux";
import {
  getAllCars,
  carsLoading,
  addCar,
  removeCar,
} from "../../actions/carsActions";
import "react-table/react-table.css";
import Spinner from "../common/spinner/spinner";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      capcity:0,
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

    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({
      username: this.props.userData.userData.username,
      firstName: this.props.userData.userData.firstName,
      lastName: this.props.userData.userData.lastName,
      capcity:this.props.userData.userData.capcity
    },()=>{
      this.props.carsLoading();
      this.props.getAllCars(this.state.username);
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({ 
      cars: nextProps.carsData.cars
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };




  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div className="dashboard">

      
          <h1>Dashboard</h1>
          <h2>
            Welcome {this.state.firstName} {this.state.lastName}
          </h2>
          <ReactTable data={this.state.cars} columns={this.state.usersColums} />
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
  { getAllCars, carsLoading, addCar,removeCar }
)(DashBoard);
