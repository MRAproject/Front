import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout,logoutLoading } from '../../../actions/userActions';

class Navbar extends Component {

  onLogoutClick=(e)=>{
    e.preventDefault();
    this.props.logoutLoading();
    this.props.logout();
  }

  render() {
    const { username } = this.props.userData.userData;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashboard">
            Dashbaord
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link" to="/addcar">
            Add car
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/removecar">
            Remove car
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/edituser">
            Edit user
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/manageCars">
            Mangage cars
          </NavLink>
        </li>
        <li className="nav-item">
          <a
            href="/"
            onClick={this.onLogoutClick}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar">
   
            {username ? authLinks : null}

      </nav>
    );
  }
}


const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(mapStateToProps, { logout,logoutLoading })(
  Navbar
);