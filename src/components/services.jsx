import React, {Component} from 'react'
import {Link} from "react-router-dom";
import Main from "./nav";
import "../styles/commonContainerStyles.css";
import Title from "./common/titile";

export default class services extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title : 'Services',
            subTitle : 'Manage team member roles for BT Accounts and roles - swiftly and instantly'
        }

    }

    render() {
        return (
            <div>
                <Main/>
                <div className="section-container">
                    <div className="general-container">
                        <Title title={this.state.title} subTitle={this.state.subTitle}/>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                        <p>Services 1</p>
                    </div>
                </div>
            </div>
        )
    }
}
