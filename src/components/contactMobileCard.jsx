import React, {Component} from 'react'
import "../styles/contactsMobileCardStyle.css";

export default class contactMobileCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    render() {
        return (
            <div className="card">

                <div className="card-top-section">
                    <h4 className="card-title-txt">
                        <b>{this.state.user.title + ' ' + this.state.user.firstName + ' ' + this.state.user.lastName}</b>
                    </h4>
                </div>
                <div className="detail-container">
                    <div>
                        <span><b>Email: </b></span>
                        <span>{this.state.user.email}</span>
                    </div>

                    <div className="middle-item-container">
                        <span><b>Mobile: </b></span>
                        <span>{this.state.user.mobile} </span>
                    </div>

                    <div>
                        <span><b>Alternative Email: </b></span>
                        <span>{this.state.user.altEmail}</span>
                    </div>
                    <hr/>


                    <div className="footer-icons-container">


                        <div className="footer-icons-hori-container">
                            <div className="single-icon-container">
                                <div className="icon-small-container"
                                     onClick={() =>this.props.editContactPressed(this.state.user)}
                                >
                                    <img src={require("../assets/img/pencil.png")} alt="Edit" width="18px"
                                         height="18px"/>
                                </div>
                            </div>
                            <div className="single-icon-container">
                                <div className="icon-small-container"
                                     onClick={() =>this.props.deleteContactPressed(this.state.user)}
                                >
                                    <img src={require('../assets/img/delete.png')} alt="Delete" width="18px"
                                         height="18px"/>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

        )
    }
}
