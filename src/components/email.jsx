import React, {Component} from 'react'
import Main from "./nav";
import Title from "./common/titile";
import "../styles/commonContainerStyles.css";

export default class email extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title : 'Email',
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
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                        <p>Email 1</p>
                    </div>
                </div>

            </div>
        )
    }
}
