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
      intervalId: "",
      timesColumns: [
        {
          Header: "Car Number",
          accessor: "carNumber" // String-based value accessors!
        },
        {
          Header: "Enter",
          accessor: "enter" // String-based value accessors!
        },
        {
          Header: "Exit",
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
    const intervalId = setInterval(this.getData, 1000);
    this.setState(
      {
        username: this.props.userData.userData.username,
        firstName: this.props.userData.userData.firstName,
        lastName: this.props.userData.userData.lastName,
        capacity: this.props.userData.userData.capacity,
        intervalId
      },
      () => {
        this.props.carsLoading();
        this.props.get_times(this.state.username);
        this.props.getAllCars(this.state.username);
      }
    );
  }

  getData = () => {
    this.props.get_times(this.state.username);
    this.props.getAllCars(this.state.username);
  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

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
      // username: nextProps.carsData.username,
      cars: nextProps.carsData.cars,
      times: nextProps.carsData.times,
      carsInside
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const isInside = this.state.carsInside;
    let total_enteries = 0;
    const data = {
      labels: ["cars inside", "free space"],
      datasets: [
        {
          data: [isInside, this.state.capacity - isInside],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"]
        }
      ],
      text: "23%"
    };

    let bucket = [0, 0, 0, 0, 0, 0];

    function isInRange(value) {
      var ranges = [
        ["00:00", "03:59"],
        ["04:00", "07:59"],
        ["08:00", "11:59"],
        ["12:00", "15:59"],
        ["16:00", "19:59"],
        ["20:00", "23:59"]
      ];

      ranges.forEach((range, idx) => {
        if (value >= range[0] && value <= range[1]) {
          bucket[idx]++;
        }
      });
    }

    this.state.times.forEach(element => {
      total_enteries++;
      const date_string = element["enter"];
      const HH_MM = date_string
        .toString()
        .split(",")[1]
        .trim();
      isInRange(HH_MM);
    });

    const data_v2 = {
      labels: [
        "00:00 - 03:59",
        "04:00 - 07:59",
        "08:00 - 11:59",
        "12:00 - 15:59",
        "16:00 - 19:59",
        "20:00 - 23:59"
      ],
      datasets: [
        {
          label: "Percentage",
          data: [
            (bucket[0] / total_enteries) * 100,
            (bucket[1] / total_enteries) * 100,
            (bucket[2] / total_enteries) * 100,
            (bucket[3] / total_enteries) * 100,
            (bucket[4] / total_enteries) * 100,
            (bucket[5] / total_enteries) * 100
          ],
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

    return (
      <div>
        <Navbar />
        <div className="content">
          <div className="dashboard">
            <span className="dashboard__username">
              Welcome {this.state.firstName} {this.state.lastName}
            </span>
            <div className="dashboard__content">
              <div className="manage__content dashboard__left">
                <h3 className="manage__header">Entries information</h3>
                <ReactTable
                  data={this.state.times}
                  columns={this.state.timesColumns}
                  className="manage__table"
                />
              </div>
              <div className="dashboard__right">
                <div className="dashboard__right__doughnut">
                  <Doughnut data={data} />
                </div>
                <div className="dashboard__right__graph">
                  <Bar data={data_v2} options={options} />
                </div>
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
