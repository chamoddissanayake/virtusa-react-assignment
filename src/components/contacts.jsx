import React, {Component} from 'react'
import Main from "./nav";
import {Link} from "react-router-dom";
import "../styles/commonContainerStyles.css";
import Title from "./common/titile";
import StatusBanner from "./common/statusBanner";

import "../styles/contactsTableMain.css";
import "../styles/contactsTableUtil.css";
import "../styles/contactsStyles.css";
import UserServices from '../services/userServices';
import "../styles/updatePopupStyles.css";
import ValidationErr from "./common/validationErr";
import "../styles/updateFormStyles.css";
import ContactsMobileCard from "./contactMobileCard";

export default class contacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Contacts',
            titles: ["Mr.", "Mrs.", "Miss"],
            subTitle: 'Manage team member roles for BT Accounts and roles - swiftly and instantly',
            data: [],
            currentPopupItemForUpdate: {},

            formData: {
                title: '', firstName: '', lastName: '', mobile: '', altEmail: '', marketingPref: false
            },
            formValidation: {
                firstName_isTouched: false,
                lastName_isTouched: false,
                mobile_isTouched: false,
                mobile_pattern_isCorrect: false,
                alt_email_pattern: false,
                alt_email_Touched: false
            },
            bnrUpdateStatus: true,
            bnrUpdateTitle: 'Contact Updated',
            bnrUpdateSubTitle: 'contact updated successfully',
            brnUpdateIsVisible: false,

            bnrDeleteStatus: true,
            bnrDeleteTitle: 'Contact Deleted',
            bnrDeleteSubTitle: 'contact deleted successfully',
            brnDeleteIsVisible: false,

            firstNameValidationStatus: false,
            lastNameValidationStatus: false,

            mobileValidationStatus_fill: false,
            mobileValidationStatus_pattern: false,
            mobileValidationStatus_length: false,

            altEmailStatus: false
        }
        this.userService = new UserServices();
    }

    handleFormDropDownChange(selectedTitle) {

        this.setState(prevState => ({
            formData: {
                ...prevState.formData, title: selectedTitle
            }
        }))
    }

    onChangeFirstNameTxtBx(evt) {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData, firstName: evt.target.value
            }, formValidation: {
                ...prevState.formValidation, firstName_isTouched: true
            }
        }), () => {
            this.firstNameValidation()
        })


    }

    onChangeLastNameTxtBx(evt) {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData, lastName: evt.target.value
            }, formValidation: {
                ...prevState.formValidation, lastName_isTouched: true
            }
        }), () => {
            this.lastNameValidation()
        })
    }

    onChangeMobileTxtBx(evt) {

        const inputPhoneNum = evt.target.value;
        const status = this.checkStringOnlyContainsNumbers(inputPhoneNum);
        if (status === true) {
            this.setState(prevState => ({
                formData: {
                    ...prevState.formData, mobile: evt.target.value,
                }, formValidation: {
                    ...prevState.formValidation,
                    mobile_isTouched: true,
                    mobile_pattern_isCorrect: true
                }
            }), () => {
                this.mobileValidation_fill()
                this.mobileValidation_pattern()
                this.mobileValidation_length()
            })
        } else {
            this.setState(prevState => ({
                formData: {
                    ...prevState.formData
                }, formValidation: {
                    ...prevState.formValidation,
                    mobile_isTouched: true,
                    mobile_pattern_isCorrect: false
                }
            }), () => {
                this.mobileValidation_fill()
                this.mobileValidation_pattern()
                this.mobileValidation_length()
            })
        }


    }
    checkStringOnlyContainsNumbers(str) {
        return /^[0-9]+$/.test(str);
    }
    onChangeAltEmailTxtBx(evt) {
        const inputMail = evt.target.value;
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (regex.test(inputMail) === false) {
            this.setState(prevState => ({
                formData: {
                    ...prevState.formData, altEmail: inputMail,
                }, formValidation: {
                    ...prevState.formValidation, alt_email_Touched: true, alt_email_pattern: false,
                }
            }), () => {
                this.altEmailValidation()
            })
        } else {
            this.setState(prevState => ({
                formData: {
                    ...prevState.formData, altEmail: inputMail,
                }, formValidation: {
                    ...prevState.formValidation, alt_email_Touched: true, alt_email_pattern: true,
                }
            }), () => {
                this.altEmailValidation()
            })
        }

    }


    componentDidMount() {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData, title: 'Mr.'
            }
        }))
    }

    onChangeValueMarketing(event) {

        var marketPrefStatus = false
        if (event.target.value === 'yes') {
            marketPrefStatus = true
        } else if (event.target.value === 'not') {
            marketPrefStatus = false
        }

        this.setState(prevState => ({
            formData: {
                ...prevState.formData, marketingPref: marketPrefStatus,
            }
        }));
    }

    updateStatus = (updateStatusData) => {
        console.log("%%%***")
        console.log(updateStatusData)
        this.closeForm()
        this.userService.fetchAllUsersList(this.getListOfUsers);

        this.setState({
            bnrUpdateTitle: 'Contact Updated',
            bnrUpdateSubTitle: updateStatusData.firstName + ' was updated successfully',
            brnUpdateIsVisible: true
        }, () => {
            const timer = setTimeout(() => {
                this.setState({brnUpdateIsVisible: false})
            }, 5000);
        })


    }

    updateContactFormSubmit() {
        const readyStatus = this.checkReadyToSubmit()
        if (readyStatus ===''){
            this.userService.updateUser(this.updateStatus, this.state.formData);
        }else{
            alert(readyStatus)
            return
        }
    }

    checkReadyToSubmit() {
        let statusMsg = '';
        if (this.state.formData.firstName === '') {
            statusMsg = 'Please fill first name'
        } else if (this.state.formData.lastName === '') {
            statusMsg = 'Please last first name'
        } else if (this.state.formData.mobile === '') {
            statusMsg = 'Please fill mobile number'
        }

        else if (!this.mobileNumValidation_num(this.state.formData.mobile)) {
            statusMsg = 'Mobile number is not valid'
        } else if (!this.mobileNumValidation_length(this.state.formData.mobile)) {
            statusMsg = 'Mobile number must be 10 digits'
        } else if (!this.state.formData.altEmail !== '') {
            if (!this.altEmailValidation_pattern(this.state.formData.altEmail)) {
                statusMsg = 'Alternate email is not in valid format'
            }
        } else if (!this.email_Validation_pattern(this.state.formData.email)) {
            statusMsg = 'Email is not in valid format'
        } else if (!this.passwordRepasswordConfirmation(this.state.formData.password, this.state.formData.rePassword)) {
            statusMsg = 'Password and re-password is not same'
        }

        return statusMsg
    }

    getListOfUsers = (allUsers) => {
        this.setState({data: allUsers});
    }

    deletedUser = (delUserData) => {
        this.userService.fetchAllUsersList(this.getListOfUsers);
        this.setState({
            bnrDeleteTitle: 'Contact Deleted',
            bnrDeleteSubTitle: delUserData.firstName + ' was deleted successfully',
            brnDeleteIsVisible: true
        }, () => {
            const timer = setTimeout(() => {
                this.setState({brnDeleteIsVisible: false})
            }, 5000);
        })
    }

    componentDidMount() {
        this.userService.fetchAllUsersList(this.getListOfUsers);
        // https://stackoverflow.com/questions/46750263/react-js-how-to-do-service-layer-call
    }

    getCurrentTitle() {
        if (this.state.formData.title === 'Mr.') {
            return "Mr."
        } else if (this.state.formData.title === 'Mrs.') {
            return "Mrs."
        } else if (this.state.formData.title === 'Miss') {
            return "Miss"
        }

    }


    render() {
        return (<div>

            <div style={this.getBannerVisibilityUpdate()}>
                <StatusBanner
                    status={this.state.bnrUpdateStatus}
                    subTitle={this.state.bnrUpdateSubTitle}
                    title={this.state.bnrUpdateSubTitle}
                />
            </div>

            <div style={this.getBannerVisibilityDelete()}>
                <StatusBanner
                    status={this.state.bnrDeleteStatus}
                    subTitle={this.state.bnrDeleteSubTitle}
                    title={this.state.bnrDeleteSubTitle}
                />
            </div>

            <Main/>
            <div className="section-container">
                <div className="general-container">
                    <div className={"divTitleAndAddContainer"}>
                        <div className={"titleAndAddItem"}>
                            <Title title={this.state.title} subTitle={this.state.subTitle}/>
                        </div>
                        <div className={"titleAndAddItem"}>
                            <div className={"addContactBtn"}>
                                {/*Add New Contact*/}
                                <Link style={{textDecoration: 'none', color: 'white'}} to="/contacts/add">Add New
                                    Contact</Link>
                            </div>
                        </div>
                    </div>
                    {/*<Link to="/contacts/add"><p>Add contact</p></Link>*/}
                    <br/>

                    <div className="loginPopup">
                        <div className="formPopup" id="popupForm">

                            <div className="fullFormContainer">
                                <div className={"closeContainer"} onClick={this.closeForm.bind(this)}>
                                    <img src={require('../assets/img/close.png')} alt="X" width="20px" height="20px"/>
                                </div>
                                <div className="txt-container">
                                    <h1>Please enter your details</h1>
                                </div>
                                <form>
                                    {/*drop-down start*/}
                                    <div className="q-item-container">
                                        <div>
                                            <label className="bold-lbl">Title </label>
                                        </div>
                                        <select className="form-item-drop custom-select"
                                                value={this.getCurrentTitle()}
                                                onChange={e => this.handleFormDropDownChange(e.target.value)}>
                                            {this.state.titles.map(function (titleItem, index) {
                                                return <option key={index}>{titleItem}</option>
                                            })}
                                        </select>
                                    </div>
                                    {/*drop-down end*/}


                                    {/*First Name Section Start*/}

                                    <div className="q-item-container">
                                        <div>
                                            <label className="bold-lbl" htmlFor="firstName">First Name</label>
                                        </div>
                                        <div>
                                            <input className="form-item" id="firstName" type="text"
                                                   formcontrolname="firstName"
                                                   value={this.state.formData.firstName}
                                                   onChange={evt => this.onChangeFirstNameTxtBx(evt)}/>
                                        </div>
                                        {this.state.firstNameValidationStatus &&
                                            <div className="text-danger">
                                                <ValidationErr errorMsg={"Please fill First Name"}/>
                                            </div>}

                                    </div>
                                    {/*First Name Section end*/}

                                    {/*Last Name Section Start*/}

                                    <div className="q-item-container">
                                        <div>
                                            <label className="bold-lbl" htmlFor="lastName">Last Name</label>
                                        </div>
                                        <div>
                                            <input className="form-item" id="lastName" type="text"
                                                   formcontrolname="lastName"
                                                   value={this.state.formData.lastName}
                                                   onChange={evt => this.onChangeLastNameTxtBx(evt)}/>
                                        </div>
                                        {this.state.lastNameValidationStatus &&
                                            <div className="text-danger">
                                                <ValidationErr errorMsg={"Please fill Last Name"}/>
                                            </div>}
                                    </div>
                                    {/*Last Name Section end*/}

                                    {/*Mobile Number Section Start*/}

                                    <div className="q-item-container">
                                        <div>
                                            <label className="bold-lbl" htmlFor="mobile">Mobile Number</label>
                                        </div>
                                        <div>
                                            <input className="form-item" id="mobile" type="text"
                                                   formcontrolname="mobile"
                                                   value={this.state.formData.mobile}
                                                   onChange={evt => this.onChangeMobileTxtBx(evt)}/>
                                        </div>
                                        {this.state.mobileValidationStatus_fill &&
                                            <div className="text-danger">
                                                <ValidationErr errorMsg={"Please fill Mobile Number"}/>
                                            </div>
                                        }
                                        {this.state.mobileValidationStatus_pattern &&
                                            <div className="text-danger">
                                                <ValidationErr errorMsg={"Phone number must be a valid number"}/>
                                            </div>}
                                        {this.state.mobileValidationStatus_length &&
                                            <div className="text-danger">
                                                <ValidationErr errorMsg={"Phone number must be 10 digits"}/>
                                            </div>}
                                    </div>
                                    {/*Mobile Number Section end*/}

                                    {/*Alternative email starts*/}
                                    <div className="q-item-container">
                                        <div>
                                            <label className="bold-lbl" htmlFor="altEmail">Alternative Email
                                                (optional) </label>
                                        </div>
                                        <div>
                                            <input className="form-item" id="altEmail" type="text"
                                                   formcontrolname="altEmail"
                                                   value={this.state.formData.altEmail}
                                                   onChange={evt => this.onChangeAltEmailTxtBx(evt)}/>
                                        </div>
                                        {this.state.altEmailStatus &&
                                            <div className="text-danger">
                                                <ValidationErr
                                                    errorMsg={"Your email address has been entered incorrectly"}/>
                                            </div>}
                                    </div>
                                    {/*Alternative email ends*/}

                                    <hr className="hr60"/>
                                    <br/>
                                    <div>
                                        <div className="q-item-container">
                                            {/*Marketing Preference start*/}
                                            <div className="q-item-container">
                                                <div className="txt-container">
                                                    <div>
                                                        <h2>Marketing Preferences</h2>
                                                    </div>
                                                    <div>
                                                        <p>Would you like to kept up to date with our offers and
                                                            services.</p>
                                                    </div>
                                                </div>

                                                <div className="hori-container">
                                                    <div className="hori-item "
                                                         onChange={this.onChangeValueMarketing.bind(this)}>
                                                        <input id="yes" type="radio"
                                                               className="custom-control-input"
                                                               value="yes" name="marketingPref"
                                                               formcontrolname="marketingPref"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="yes"> Yes </label>
                                                    </div>

                                                    <div className="hori-item"
                                                         onChange={this.onChangeValueMarketing.bind(this)}>
                                                        <input id="no" type="radio" className="custom-control-input"
                                                               defaultChecked={true}
                                                               value="no" name="marketingPref"
                                                               formcontrolname="marketingPref"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="no"> No </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Marketing Preference end*/}
                                        </div>
                                        {/*Re-password end*/}
                                        <hr className="hr60"/>

                                        {/*submit starts*/}
                                        <div className="q-item-container"></div>
                                        <div className="hori-container">
                                            <div className="hori-item">
                                                <Link style={{textDecoration: 'none'}} to="/contacts">
                                                    <button type="button" onClick={this.closeForm.bind(this)}
                                                            className=" pri-color-outline">Back
                                                    </button>
                                                </Link>
                                            </div>

                                            <div className="hori-item">
                                                <button type="button" onClick={this.updateContactFormSubmit.bind(this)}
                                                        className="pri-color">Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/*submit ends*/}

                                </form>
                            </div>


                        </div>
                    </div>


                    <div className={"lg-screen"}>
                        {/*Large screen starts*/}
                        <div className="limiter">
                            <div className="container-table100">
                                <div className="wrap-table100">
                                    <div className="table">

                                        <div className="row header">
                                            <div className="cell">
                                                Name
                                            </div>
                                            <div className="cell">
                                                Email
                                            </div>
                                            <div className="cell">
                                                Mobile
                                            </div>
                                            <div className="cell">
                                                Alternative Email
                                            </div>
                                            <div className="cell2">
                                                Actions
                                            </div>
                                        </div>

                                        {this.state.data.map((item, i) => <div className="row" key={i}>
                                            <div className="cell" data-title="Full Name">
                                                {item.title} {' '} {item.firstName}{item.lastName}
                                            </div>
                                            <div className="cell" data-title="Email">
                                                {item.email}
                                            </div>
                                            <div className="cell" data-title="Mobile">
                                                {item.mobile}
                                            </div>
                                            <div className="cell" data-title="AltEmail">
                                                {item.altEmail}
                                            </div>
                                            <div className="cell" data-title="Actions">
                                                <div className={"editDeleteContainer"}>
                                                    <div className={"editDeleteItem"}
                                                         onClick={() => this.deletePressed(item)}
                                                    >
                                                        <img src={require('../assets/img/delete.png')} alt="X"
                                                             width="18px"
                                                             height="18px"/>
                                                    </div>
                                                    <div className={"editDeleteItem"}
                                                         onClick={() => this.editPressed(item)}
                                                    >
                                                        <img src={require('../assets/img/pencil.png')} alt="E"
                                                             width="18px"
                                                             height="18px"/>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Large screen ends*/}

                    </div>
                    <div className={"sm-screen"}>

                        {this.state.data.map(userItem => <ContactsMobileCard key={userItem.id} user={userItem}
                                                                             deleteContactPressed={this.deleteContactPressed}
                                                                             editContactPressed={this.editContactPressed}/>
                            // {console.log(userItem)}
                        )}

                        <div className="add-new-contact-mobile">
                            {/*Add New Contact*/}
                            <Link style={{textDecoration: 'none', color: 'white'}} to="/contacts/add">Add New
                                Contact</Link>
                        </div>
                    </div>


                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>


        </div>)
    }

    editContactPressed = (userObjForUpdate) => {
        this.setState({formData: userObjForUpdate})
        document.getElementById("popupForm").style.display = "block";
    }
    deleteContactPressed = (userObjForDelete) => {
        this.userService.deleteUser(this.deletedUser, userObjForDelete.id);
    }

    deletePressed(item) {
        this.userService.deleteUser(this.deletedUser, item.id);
    }

    editPressed(item) {
        this.setState({formData: item})
        document.getElementById("popupForm").style.display = "block";
    }

    closeForm() {
        document.getElementById("popupForm").style.display = "none";
    }

    getBannerVisibilityUpdate() {
        if (this.state.brnUpdateIsVisible === true) {
            // return "block"
            return {display: "block"};
        } else {
            // return "none"
            return {display: "none"};
        }
    }


    getBannerVisibilityDelete() {
        if (this.state.brnDeleteIsVisible === true) {
            // return "block"
            return {display: "block"};
        } else {
            // return "none"
            return {display: "none"};
        }
    }

    firstNameValidation() {
        if (this.state.formValidation.firstName_isTouched === true && this.state.formData.firstName === '') {
            this.setState({firstNameValidationStatus: true})
        } else {
            this.setState({firstNameValidationStatus: false})
        }
    }

    lastNameValidation() {
        if (this.state.formValidation.lastName_isTouched === true && this.state.formData.lastName === '') {
            this.setState({lastNameValidationStatus: true})
        } else {
            this.setState({lastNameValidationStatus: false})
        }
    }

    mobileValidation_fill() {
        if (this.state.formValidation.mobile_isTouched === true && this.state.formData.mobile === '') {
            this.setState({mobileValidationStatus_fill: true})
        } else {
            this.setState({mobileValidationStatus_fill: false})
        }
    }

    mobileValidation_pattern() {
        if (this.state.formValidation.mobile_isTouched === true &&
            this.state.formValidation.mobile_pattern_isCorrect === false) {
            this.setState({mobileValidationStatus_pattern: true})
        } else {
            this.setState({mobileValidationStatus_pattern: false})
        }
    }

    mobileValidation_length() {
        if (this.state.formValidation.mobile_isTouched === true &&
            this.state.formData.mobile.length !== 10) {
            this.setState({mobileValidationStatus_length: true})
        } else {
            this.setState({mobileValidationStatus_length: false})
        }
    }

    altEmailValidation() {
        if (this.state.formValidation.alt_email_Touched === true && this.state.formData.altEmail !== "" &&
            this.state.formValidation.alt_email_pattern === false) {
            this.setState({altEmailStatus: true})
        } else {
            this.setState({altEmailStatus: false})
        }
    }

    mobileNumValidation_num(mobile) {
        let number = parseInt(mobile);
        if (isNaN(number)) {
            return false;
        } else {
            return true;
        }
    }

    mobileNumValidation_length(mobile) {
        if (mobile.length === 10) {
            return true;
        } else {
            return false;
        }
    }

    email_Validation_pattern(email) {
        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(email);
    }

    altEmailValidation_pattern(altEmail) {
        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(altEmail);
    }

    passwordRepasswordConfirmation(password, rePassword) {
        if (password === rePassword) {
            return true;
        } else {
            return false;
        }
    }
}
