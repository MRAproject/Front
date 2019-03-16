import React, { Component } from "react";
import { connect } from "react-redux";
import { removeCar,addCar,carsLoading,getAllCars } from "../../actions/carsActions";
import Spinner from "../common/spinner/spinner";
import ReactTable from "react-table";

class ManageCars extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username:'',
        carNumber: "",
        errorAdd: "",
        successAdd: "",
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
      }
    };
  

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
      cars: nextProps.carsData.cars,
      errorAdd:nextProps.carsData.errorAdd,
      successAdd:nextProps.carsData.successAdd
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
  
  onSubmitRemove = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      carNumber: this.state.carNumber
    };
    this.props.carsLoading();
    this.props.removeCar(data);
  };


  render() {
      return (
        <div className="dashboard">
    <h1>Manage Cars</h1>
    <br/>
          <h1>Add new car</h1>
          <form onSubmit={this.onSubmitAdd}>
            <input
              required={true}
              type="text"
              name="carNumber"
              placeholder="Enter car number"
              value={this.state.carNumber}
              onChange={this.onChange}
            />
            <input type="submit" value="Submit" />
            <p>
              {this.state.errorAdd}
              {this.state.successAdd}
            </p>
          </form>   
          <h1>Remove car</h1>
          <form onSubmit={this.onSubmitRemove}>
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

          {this.props.loading?<Spinner />:  <ReactTable data={this.state.cars} columns={this.state.usersColums} />}
        
   
        </div>
      );
    
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
  { getAllCars,removeCar,carsLoading,addCar }
)(ManageCars);
