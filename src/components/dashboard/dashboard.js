import React, { Component } from "react";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { Doughnut, Bar } from "react-chartjs-2";
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

const data = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ],
  text: "23%"
};

const data_v2 = {
  labels: [
    "00:00 - 04:00",
    "04:00 - 08:00",
    "08 - 12",
    "12 - 16",
    "16 - 20 ",
    "20 - 00"
  ],
  datasets: [
    {
      label: "Percentage",
      data: [70, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1
    }
  ]
};
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
          max: 100,
          callback: function(value) {
            return value + "%";
          }
        },
        scaleLabel: {
          display: true,
          labelString: "Percentage"
        }
      }
    ]
  }
};

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
    const isInside = 100;
    const capacity = 300;
    return (
      <div>
        <Navbar />
        <div className="content">
          <div className="dashboard">
            <h1>Dashboard</h1>
            <h2>
              Welcome {this.state.firstName} {this.state.lastName}
            </h2>
            <div className="dashboard__content">
              <div className="manage__content dashboard__left">
                <h3 className="manage__header">Manage Cars</h3>
                <ReactTable
                  data={this.state.times}
                  columns={this.state.timesColumns}
                  className="manage__table"
                />
              </div>
              <div className="dashboard__right">
                <Doughnut data={data} />
                <Bar data={data_v2} options={options} />
              </div>
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
