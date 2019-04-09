import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeCar,
  addCar,
  carsLoading,
  getAllCars
} from "../../actions/carsActions";
import ReactTable from "react-table";
import Navbar from "../common/navbar/navbar";

class ManageCars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      carNumber: "",
      errorAdd: "",
      successAdd: "",
      errorRemove: "",
      successRemove: "",
      intervalId: "",
      cars: [],
      carsColums: [
        {
          Header: "Car number",
          accessor: "carNumber" // String-based value accessors!
        },
        {
          Header: "Is inside",
          accessor: "isInside"
        },
        {
          id: "delete",
          accessor: "carNumber",
          Cell: ({ value }) => (
            <div onClick={() => this.onSubmitRemove({ value })}>
              <img
                className="garbage"
                src="/pictures/garbage.png"
                title="Remove car"
                alt="garbage"
              />
            </div>
          )
        }
      ]
    };
  }

  componentDidMount() {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }
    const intervalId = setInterval(this.getData, 1000);
    this.setState(
      {
        username: this.props.userData.userData.username,
        firstName: this.props.userData.userData.firstName,
        lastName: this.props.userData.userData.lastName,
        capcity: this.props.userData.userData.capcity,
        intervalId
      },
      () => {
        this.props.carsLoading();
        this.props.getAllCars(this.state.username);
      }
    );
  }
  getData = () => {
    console.log("interval manage cars");
    this.props.getAllCars(this.state.username);
  };
  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({
      cars: nextProps.carsData.cars,
      errorAdd: nextProps.carsData.errorAdd,
      successAdd: nextProps.carsData.successAdd,
      errorRemove: nextProps.carsData.errorRemove,
      successRemove: nextProps.carsData.successRemove
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errorAdd: "",
      successAdd: "",
      errorRemove: "",
      successRemove: ""
    });
  };

  onSubmitAdd = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      carNumber: this.state.carNumber
    };
    this.props.carsLoading();
    this.props.addCar(data);
  };

  onSubmitRemove = ({ value }) => {
    const data = {
      username: this.state.username,
      carNumber: value
    };

    this.props.carsLoading();
    this.props.removeCar(data);
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="content">
          <div className="manage">
            <div className="manage__content">
              <h3 className="manage__header">Manage Cars</h3>
              <div className="manage__add">
                <h1 className="manage__add__header">Add new car</h1>
                <form onSubmit={this.onSubmitAdd} className="manage__add__form">
                  <input
                    required={true}
                    type="text"
                    name="carNumber"
                    placeholder="Enter car number"
                    value={this.state.carNumber}
                    onChange={this.onChange}
                    className={
                      "manage__add__form__input" +
                      (this.state.errorAdd ? "__error" : "")
                    }
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="manage__add__form__submit"
                  />
                  <span
                    className={
                      "manage__add__form__span" +
                      (this.state.errorAdd || this.state.errorRemove
                        ? "__error"
                        : "") +
                      (this.state.successAdd || this.state.successRemove
                        ? "__success"
                        : "")
                    }
                  >
                    {this.state.errorAdd}
                    {this.state.successAdd}
                    {this.state.errorRemove}
                    {this.state.successRemove}
                  </span>
                </form>
              </div>

              <ReactTable
                data={this.state.cars}
                columns={this.state.carsColums}
                className="manage__table"
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
  { getAllCars, removeCar, carsLoading, addCar }
)(ManageCars);
