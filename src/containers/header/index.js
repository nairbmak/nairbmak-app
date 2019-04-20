import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import branch from '../../statics/img/branch.svg';

class Header extends Component {

  render() {
    return (
      <header className="site-header">
        <div className="container">
          <div className="row">
            <div className="col-1">
              <div className="logo">
                <a href={window.location.origin}>
                  <img src={branch} alt="" />
                </a>
              </div>
            </div>
            <div className="col">
              <div className="row justify-content-end">
                <NavLink className="router col-2" activeClassName="active" to="/report">
                  <span>ADR/ADE Report</span>
                </NavLink>
                <NavLink className="router col-2" activeClassName="active" to="/view">
                  <span>Find Report</span>
                </NavLink>
                <NavLink className="router col-2" activeClassName="active" to="/explorer">
                  <span>Explorer</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </header >
    );
  }
}

export default Header;