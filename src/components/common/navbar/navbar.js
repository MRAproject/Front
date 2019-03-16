import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { logout, logoutLoading } from "../../../actions/userActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutLoading();
    this.props.logout();
  };

  render() {
    const { username } = this.props.userData.userData;
    const authLinks = (
      <nav className="nav">
        <ul className="nav__list">
          <NavLink className="nav__item" to="/dashboard" activeClassName="nav__item-active">
            <li className="nav__item__link">Dashbaord</li>
          </NavLink>
          <NavLink className="nav__item" to="/edituser" activeClassName="nav__item-active">
            <li className="nav__item__link">Edit user</li>
          </NavLink>
          <NavLink className="nav__item" to="/manageCars" activeClassName="nav__item-active">
            <li className="nav__item__link">Mangage cars</li>
          </NavLink>
          <NavLink to="/" onClick={this.onLogoutClick} className="nav__item">
            <li className="nav__item__link">Logout</li>
          </NavLink>
        </ul>
      </nav>
    );

    return <nav className="navbar">{username ? authLinks : null}</nav>;
  }
}

const mapStateToProps = state => ({
  userData: state.userData
});

export default withRouter(connect(
  mapStateToProps,
  { logout, logoutLoading }
)(Navbar));
