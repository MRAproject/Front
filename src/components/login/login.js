import React, { Component } from "react";
import { connect } from "react-redux";
import { login, loginLoading } from "../../actions/userActions";
import Spinner from "../common/spinner/spinner";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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

  componentWillReceiveProps = nextProps => {
    if (nextProps.userData.username) {
      sessionStorage.setItem("userData", JSON.stringify(nextProps.userData));
      this.props.history.push(`/dashboard`);
      return;
    } else {
      this.setState({ error: "User name or passowrd inccorect" });
    }
  };

  loginUser = data => {
    this.props.loginLoading();
    this.props.login(data);
  };
  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div className="login">
          {/* <video className="login__video" autoPlay muted loop>
            <source src={require('../../../assets/videos/video_login_2.mp4')} type="video/mp4" />
            Your browser is not supported!
          </video> */}
          <div className="login__content">
            <h1 className="login__header">Sign in</h1>
            <form onSubmit={this.onSubmit} className="login__form">
              <div className="login__form__group">
                <input
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.onChange}
                  className="login__input"
                  placeholder="Username"
                  required
                  autoFocus
                />
                <label className="login__form__label">Username</label>
              </div>
              <div className="login__form__group">
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  className="login__input"
                  placeholder="Password"
                  required
                />
                <label className="login__form__label">Password</label>
              </div>
              <div className="login__btn">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
                />
              </div>
              <p className="login__error">{this.state.error}</p>
            </form>
          </div>
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

export default connect(
  mapStateToProps,
  { login, loginLoading }
)(Login);
