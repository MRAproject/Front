import React, { Component } from "react";
import { connect } from "react-redux";
import { login,loginLoading } from "../../actions/userActions";
import Spinner from "../common/spinner/spinner";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "amitmarko",
      password: "12345",
      error: ""
    };
  }
  componentDidMount() {
    if (sessionStorage.getItem("userData")) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    this.loginUser(data);
  };

  componentWillReceiveProps=(nextProps)=>{
    if(nextProps.userData.username){
      sessionStorage.setItem("userData", JSON.stringify(nextProps.userData));
      this.props.history.push(`/dashboard`);
    }
  }

  loginUser =  data => {
     this.props.loginLoading();
     this.props.login(data);
  };
  render() {
    if (this.props.loading) {
          return <Spinner />;
    } 
    else {
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
                <br />
                <input
                  name="password"
                  type="passowrd"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <br />
                <input type="submit" value="Submit" />
                <p>{this.state.error}</p>
              </form>
            </div>
          );
  }
}


}

const mapStateToProps = state => {
  return {
    userData: state.userData.userData,
    loading: state.userData.loading
  };
};


export default connect(mapStateToProps,{login,loginLoading})(Login);
