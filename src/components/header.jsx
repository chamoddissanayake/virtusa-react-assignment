import React, {Component} from 'react'
import "../styles/headerStyles.css";


export default class header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="header-full-container">

                    <div className="outer-container">
                        <div className="header-menu-item-container">
                            <div className="menu-item">
                                <img src={require('../assets/img/logo-react.png')} alt="React" width="50px" height="50px" />
                            </div>
                            <div className="menu-item">
                                <div className={"headerItem"}>Our Products</div>
                            </div>
                            <div className="menu-item">
                                <div className={"headerItem"}>FAQs</div>
                            </div>
                            <div className="menu-item">
                                <div className={"headerItem"}>Help</div>
                            </div>
                        </div>
                        <div className="header-menu-item-container">
                            <div className="menu-item">
                                <p className={"headerItem"}>Log out</p>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        )
    }
}
