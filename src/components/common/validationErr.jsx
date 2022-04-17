import React, {Component} from 'react'
import "../../styles/valicationErrStyle.css";

export default class validationErr extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: this.props.errorMsg
        }
    }

    render() {
        return (
            <div className="err-full-container">
                <div className="arrow-up"></div>
                <div className="msg-container">
                    <div className="img-container">
                        <img src={require('../../assets/img/warning.png')} alt="X" height="20px"/>
                    </div>

                    <span className="msgTxt">{this.state.errorMsg}</span>
                </div>
            </div>

        )
    }
}
