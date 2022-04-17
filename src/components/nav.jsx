import React, {Component} from 'react'
import {Link} from "react-router-dom";
import "../styles/navStyles.css";

export default class nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
    }


    componentDidMount() {
        console.log(window.location.pathname);
        const path = window.location.pathname.split('/');
        const pathArr = path.filter((el) => {
            return el !== "";
        });
        this.setSelectedTabStr(pathArr[0])
    }

    setSelectedTabStr(givenPath) {
        if (givenPath === 'home') {
            this.setState({selectedTab: 'home'})
        } else if (givenPath === 'devices') {
            this.setState({selectedTab: 'devices'})
        } else if (givenPath === 'email') {
            this.setState({selectedTab: 'email'})
        } else if (givenPath === 'messages') {
            this.setState({selectedTab: 'messages'})
        } else if (givenPath === 'orders') {
            this.setState({selectedTab: 'orders'})
        } else if (givenPath === 'profile') {
            this.setState({selectedTab: 'profile'})
        } else if (givenPath === 'returns') {
            this.setState({selectedTab: 'returns'})
        } else if (givenPath === 'services') {
            this.setState({selectedTab: 'services'})
        } else if (givenPath === 'contacts') {
            this.setState({selectedTab: 'contacts'})
        } else {
            this.setState({selectedTab: 'noPage'})
        }
    }

    getCurrentTabStyle(givenType) {
        return "color: 'purple', height: \"3px\",\"background-color\": \"#333\"";
    }

    render() {
        return (
            <div className={"fullNavContainer"}>
                <div className={"itemsContainer"}>
                    <div className={"navItem"}>
                        <Link style={{textDecoration: 'none'}} to="/home">
                            <p style={{color: this.getColorIsSelected('home')}} className={"navTxt"}>Home</p>
                        </Link>
                        <hr
                            style={{
                                color: this.getColorIsSelected('home'),
                                height: this.getThickness('home'),
                                backgroundColor: this.getColorIsSelected('home')
                            }}/>
                    </div>
                    <div className={"navItem"}>
                        <Link style={{textDecoration: 'none'}} to="/devices">
                            <p style={{color: this.getColorIsSelected('devices')}} className={"navTxt"}>Devices</p>
                        </Link>
                        <hr
                            style={{
                                color: this.getColorIsSelected('devices'),
                                height: this.getThickness('devices'),
                                backgroundColor: this.getColorIsSelected('devices')
                            }}/>
                    </div>
                    <div className={"navItem"}>
                        <Link style={{textDecoration: 'none'}} to="/orders">
                            <p style={{color: this.getColorIsSelected('orders')}} className={"navTxt"}>Orders</p>
                        </Link>
                        <hr
                            style={{
                                color: this.getColorIsSelected('orders'),
                                height: this.getThickness('orders'),
                                backgroundColor: this.getColorIsSelected('orders')
                            }}/>
                    </div>

                    <div className={"navItem"}>
                        <Link style={{textDecoration: 'none'}} to="/services">
                            <p style={{color: this.getColorIsSelected('services')}} className={"navTxt"}>Services</p>
                        </Link>
                        <hr
                            style={{
                                color: this.getColorIsSelected('services'),
                                height: this.getThickness('services'),
                                backgroundColor: this.getColorIsSelected('services')
                            }}/>
                    </div>

                    <div className={"navItem"}>
                        <Link style={{textDecoration: 'none'}} to="/returns">
                            <p style={{color: this.getColorIsSelected('returns')}} className={"navTxt"}>Returns</p>
                        </Link>
                        <hr
                            style={{
                                color: this.getColorIsSelected('returns'),
                                height: this.getThickness('returns'),
                                backgroundColor: this.getColorIsSelected('returns')
                            }}/>
                    </div>
                    <div className={"navItem"}>
                        <Link style={{textDecoration: 'none'}} to="/contacts">
                            <p style={{color: this.getColorIsSelected('contacts')}} className={"navTxt"}>Contacts</p>
                        </Link>
                        <hr
                            style={{
                                color: this.getColorIsSelected('contacts'),
                                height: this.getThickness('contacts'),
                                backgroundColor: this.getColorIsSelected('contacts')
                            }}/>
                    </div>
                    <div className={"navItem"}>
                        <Link style={{textDecoration: 'none'}} to="/messages">
                            <p style={{color: this.getColorIsSelected('email')}} className={"navTxt"}>Messages</p>
                        </Link>
                        <hr
                            style={{
                                color: this.getColorIsSelected('messages'),
                                height: this.getThickness('messages'),
                                backgroundColor: this.getColorIsSelected('messages')
                            }}/>
                    </div>
                    <div className={"navItem"}>
                        <Link style={{textDecoration: 'none'}} to="/profile">
                            <p style={{color: this.getColorIsSelected('profile')}} className={"navTxt"}>Profile</p>
                        </Link>
                        <hr
                            style={{
                                color: this.getColorIsSelected('profile'),
                                height: this.getThickness('profile'),
                                backgroundColor: this.getColorIsSelected('profile')
                            }}/>
                    </div>
                    <div className={"navItem"}>
                        <Link style={{textDecoration: 'none'}} to="/email">
                            <p style={{color: this.getColorIsSelected('email')}} className={"navTxt"}>Email</p>
                        </Link>
                        <hr
                            style={{
                                color: this.getColorIsSelected('email'),
                                height: this.getThickness('email'),
                                backgroundColor: this.getColorIsSelected('email')
                            }}/>
                    </div>













                </div>
            </div>

        )
    }


    getColorIsSelected(currentTab) {
        if (currentTab === this.state.selectedTab) {
            return 'green'
        } else {
            return 'black'
        }
    }

    getThickness(currentTab) {
        if (currentTab === this.state.selectedTab) {
            return '3px'
        } else {
            return '0px'
        }
    }
}
