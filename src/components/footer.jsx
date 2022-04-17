import React, {Component} from 'react'
import "../styles/footerStyles.css";

export default class footer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="footer-full-container">
                    <div className="outer-container">
                        <div className="footer-menu-item-container">
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                        </div>
                    </div>


                    <hr className={"footerHr"}/>

                    <div className="outer-container">
                        <div className="footer-menu-item-container">
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                            <div className="menu-item">
                                <div>Menu Item</div>
                            </div>
                        </div>
                        <div className="footer-menu-item-container">
                            <div className="menu-item">
                                <div>© BT 2022</div>
                            </div>
                            <div className="menu-item">
                                <img src={require('../assets/img/logo-react.png')} alt="React" width="30px" height="30px" />
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        )
    }
}
