import React, { Component } from "react";
import axios from 'axios'
import config from '../../config/config'

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username:'',
        carNumber:'',
        firstName:'',
        lastName:'',
        error:'',
        success:'',
        cars:[]
    };

  }

  async componentDidMount(){

    const userData=JSON.parse(sessionStorage.getItem('userData'));
    const response=await axios.get(`${config.host}/get_all_user_cars?username=${userData.username}`);
    this.setState({
        username:userData.username,
        firstName:userData.firstName,
        lastName:userData.lastName,
        cars:response.data.data
    },()=>{
            console.log(this.state.cars);
    });
  }
  onChange=(e)=>{
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit=(e)=>{
    e.preventDefault();
    const data = {
        username: this.state.username,
        carNumber:this.state.carNumber
    };
    this.add_car(data);
  }

  add_car=async (data)=>{
    try{
            const response =await axios.post(`${config.host}/add_car`,data);
            if (response.data.status==='successful') {
            this.setState({success:`Car ${data.carNumber} added succefully`,error:''})
            }
            else{
            this.setState({success:'', error:`Car ${data.carNumber} already exist!`})
            }
    }
    catch(e){
        console.log(e);
    }
  }

  render() {

    return (
      <div className="login">
       <h1>Dashboard</h1>
       <h2>Welcome {this.state.firstName} {this.state.lastName}</h2>
       <form onSubmit={this.onSubmit}>
            <label>Add a new car: </label>
            <input type="text" name="carNumber" value={this.state.carNumber} onChange={this.onChange}></input>
            <input
                  type="submit"
                  value="Submit"
            />
            <p>{this.state.error}{this.state.success}</p>
       </form>
      </div>
    );
  }
}


export default DashBoard;