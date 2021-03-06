import React, { Component } from "react";
import { connect } from "react-redux";
import { editUserLoading, editUser } from "../../actions/userActions";
import Navbar from "../common/navbar/navbar";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      capacity: "",
      error: "",
      success: ""
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
      password: this.props.userData.userData.password,
      capacity: this.props.userData.userData.capacity,
      success: "",
      error: ""
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState(
      {
        error: nextProps.userData.errorEdit,
        success: nextProps.userData.successEdit
      },
      () => {
        if (this.state.error || this.state.success) {
          const message = this.state.error
            ? this.state.error
            : this.state.success;
          alert(message);
        }
      }
    );
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, success: "", error: "" });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      capacity: this.state.capacity
    };
    // this.props.editUserLoading();
    this.props.editUser(data);
  };

  render() {
    return (
      <div>
        <Navbar />

        <div className="content">
          <div className="edituser">
            <div className="edituser__content">
              <div className="edituser__header">
                <h1>Edit user</h1>
              </div>
              <form onSubmit={this.onSubmit} className="edituser__form">
                <div className="edituser__form__group">
                  <label className="edituser__form__label">username:</label>
                  <input
                    required={true}
                    type="text"
                    disabled={true}
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    className="edituser__form__input"
                  />
                </div>
                <div className="edituser__form__group">
                  <label className="edituser__form__label" htmlFor="password">
                    password:
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    className="edituser__form__input"
                    id="password"
                  />
                </div>
                <div className="edituser__form__group">
                  <label className="edituser__form__label" htmlFor="firstName">
                    First name:
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChange}
                    className="edituser__form__input"
                    id="firstName"
                  />
                </div>

                <div className="edituser__form__group">
                  <label className="edituser__form__label" htmlFor="lastName">
                    Last name:
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChange}
                    className="edituser__form__input"
                    id="lastName"
                  />
                </div>

                <div className="edituser__form__group">
                  <label className="edituser__form__label" htmlFor="capcity">
                    capcity:
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="capacity"
                    value={this.state.capacity}
                    onChange={this.onChange}
                    className="edituser__form__input"
                    id="capcity"
                  />
                </div>

                <div className="edituser__form__submit">
                  <input
                    type="submit"
                    value="Submit"
                    className="edituser__form__submit-input"
                  />
                </div>
              </form>
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
    loading: state.userData.loading,
    successEdit: state.userData.successEdit,
    userData: state.userData
  };
};

export default connect(
  mapStateToProps,
  { editUserLoading, editUser }
)(EditUser);
