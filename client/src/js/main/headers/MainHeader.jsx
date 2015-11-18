/* eslint no-unused-vars:0*/
"use strict";
import React, { Component } from "react";
import { Route, Link } from "react-router";

const ACTIVE_CLASS = "selected";


export default class MainHeader extends Component {

    _logout() {
        localStorage.setItem("userInfo", "");
    }

    render() {
        return (
            <header>
                <div className="fixed-header clear-fix multi-column">

                    <div className="app-logo left clear-fix large-text m-none">
                        <span className="left">
                                {"make"}
                        </span>
                        <b className="left">
                                {"news"}
                        </b>
                    </div>

                    <div className="user-info right">
                        <Link to="/" onClick={this._logout} className="link">{"Logout"}</Link>
                    </div>

                    <div className="flexible t-center">
                        <ul className="menu-list">
                            <li>
                                <Link to="/configure/categories" activeClassName={ACTIVE_CLASS}>
                                    <img src="../../../images/newspaper.jpg" />
                                    <span>{"Configure"}</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/surf" activeClassName={ACTIVE_CLASS}>
                                    <img src="../../../images/newspaper.jpg" />
                                    <span>{"Surf"}</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/park" activeClassName={ACTIVE_CLASS}>
                                    <img src="../../../images/newspaper.jpg" />
                                    <span>{"Park"}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

            </header>
        );
    }
}

MainHeader.displayName = "Main Header";


