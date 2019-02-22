import React, { Component } from "react";
import axios from 'axios'
import config from '../../config/config'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "amitmarko",
      password: "12345",
      error:""
    };
  }
  componentDidMount(){
    if(sessionStorage.getItem('userData')){
      this.props.history.push('/dashboard');
    }
  }

  onChange=(e)=>{
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit=(e)=>{
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    this.loginUser(data);
  }

  loginUser=async (data)=>{
    try{
        const response =await axios.post(`${config.host}/login`,data)
        if (response.status===200) {
          sessionStorage.setItem('userData',JSON.stringify(response.data.data));
          this.props.history.push(`/dashboard`);
          return;
        }
    }
    catch(e){
        console.log(e);
        this.setState({error:'Incorrect username or password'})
    }
     

  }
  render() {

    return (
      <div className="login">
              <h1>Log In</h1>
              <form onSubmit={this.onSubmit}>
                <input
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <br/>
                 <input
                  name="password"
                  type="passowrd"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <br/>
                <input
                  type="submit"
                  value="Submit"
                />
              <p>{this.state.error}</p>
              </form>
      </div>
    );
  }
}

export default Login;