import React, {Component} from 'react'
import Main from "./nav";
import "../styles/commonContainerStyles.css";
import Title from "./common/titile";
import ValidationErr from "./common/validationErr";
import "../styles/contactsAddStyles.css";
import {Link} from 'react-router-dom'
import UserServices from '../services/userServices';
import StatusBanner from "./common/statusBanner";

export default class contactsAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Add New Contact',
            subTitle: 'Manage team member roles for BT Accounts and roles - swiftly and instantly',
            titles: ["Mr.", "Mrs.", "Miss"],
            formData: {
                title: '',
                firstName: '',
                lastName: '',
                mobile: '',
                altEmail: '',
                email: '',
                password: '',
                rePassword: '',
                marketingPref: false
            },
            formValidation: {
                firstName_isTouched: false,
                lastName_isTouched: false,
                mobile_isTouched: false,
                mobile_pattern_isCorrect: false,
                alt_email_pattern: false,
                alt_email_Touched: false,
                email_isTouched: false,
                email_pattern: false,
                password_isTouched: false,
                rePassword_isTouched: false,
            },
            bnrAddStatus: true,
            bnrAddTitle: 'Contact Added',
            bnrAddSubTitle: 'contact added successfully',
            brnAddIsVisible: false,

            firstNameValidationStatus: false,
            lastNameValidationStatus: false,

            mobileValidationStatus_fill: false,
            mobileValidationStatus_pattern: false,
            mobileValidationStatus_length: false,

            altEmailStatus: false,

            emailStatus_fill: false,
            emailStatus_pattern: false,

            passwordStatus_fill: false,
            passwordStatus_length: false,
            passwordStatus_status: false,

            rePasswordStatus_fill: false,
            rePasswordStatus_equal: false
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

    onChangemobileTxtBx(evt) {
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

    onChangeEmailTxtBx(evt) {

        const inputMail = evt.target.value;
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (regex.test(inputMail) === false) {
            this.setState(prevState => ({
                formData: {
                    ...prevState.formData, email: inputMail,
                }, formValidation: {
                    ...prevState.formValidation, email_Touched: true, email_pattern: false,
                }
            }), () => {
                this.emailValidation_fill()
                this.emailValidation_pattern()
            })
        } else {
            this.setState(prevState => ({
                formData: {
                    ...prevState.formData, email: inputMail,
                }, formValidation: {
                    ...prevState.formValidation, email_Touched: true, email_pattern: true,
                }
            }), () => {
                this.emailValidation_fill()
                this.emailValidation_pattern()
            })
        }

    }

    onChangePasswordTxtBx(evt) {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData, password: evt.target.value
            }, formValidation: {
                ...prevState.formValidation, password_isTouched: true
            }
        }), () => {
            this.passwordValidation_fill()
            this.passwordValidation_length()
            this.passwordValidation_status()
        })
    }

    onChangeRePasswordTxtBx(evt) {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData, rePassword: evt.target.value,
            }, formValidation: {
                ...prevState.formValidation, rePassword_isTouched: true
            }
        }), () => {
            this.rePasswordValidation_fill()
            this.rePasswordValidation_equal()
        })
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

    addStatus = (addStatusData) => {
        this.setState({
            bnrAddTitle: 'Contact Added',
            bnrAddSubTitle: addStatusData.firstName + ' was added successfully',
            brnAddIsVisible: true
        }, () => {
            const timer = setTimeout(() => {
                this.setState({brnAddIsVisible: false})
            }, 5000);
        })

    }

    addContactFormSubmit() {
        const readyStatus = this.checkReadyToSubmit()
        if (readyStatus === '') {
            this.userService.addNewUser(this.addStatus, this.state.formData);
        } else {
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
        } else if (this.state.formData.email === '') {
            statusMsg = 'Please fill email'
        } else if (this.state.formData.password === '') {
            statusMsg = 'Please fill password'
        } else if (this.state.formData.rePassword === '') {
            statusMsg = 'Please fill password again'
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


        // console.log("mobileNumValidation_num ->",this.mobileNumValidation_num(this.state.formData.mobile))
        // console.log("mobileNumValidation_length ->",this.mobileNumValidation_num(this.state.formData.mobile))
        // console.log("altEmailValidation_pattern ->",this.altEmailValidation_pattern(this.state.formData.altEmail))
        // console.log("email_Validation_pattern ->",this.email_Validation_pattern(this.state.formData.email))
        // console.log("passwordRepasswordConfirmation ->",this.passwordRepasswordConfirmation(this.state.formData.password, this.state.formData.rePassword))
        return statusMsg
    }

    render() {
        return (<div>
            <div style={this.getBannerVisibilityAdd()}>
                <StatusBanner
                    status={this.state.bnrAddStatus}
                    subTitle={this.state.bnrAddSubTitle}
                    title={this.state.bnrAddSubTitle}
                />
            </div>
            <Main/>
            <div className="section-container">
                <div className="general-container">
                    <Title title={this.state.title} subTitle={this.state.subTitle}/>
                    <br/>
                    <div className="form-container">
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
                                    <input className="form-item" id="mobile"
                                           input type="tel"
                                           formcontrolname="mobile"
                                           onChange={evt => this.onChangemobileTxtBx(evt)}/>
                                </div>
                                {this.state.mobileValidationStatus_fill &&
                                    <div className="text-danger">
                                        <ValidationErr errorMsg={"Please fill Mobile Number"}/>
                                    </div>}
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
                                           onChange={evt => this.onChangeAltEmailTxtBx(evt)}/>
                                </div>
                                {this.state.altEmailStatus &&
                                    <div className="text-danger">
                                        <ValidationErr
                                            errorMsg={"Your email address has been entered incorrectly"}/>
                                    </div>}

                                <div className={"smTopGap"}>
                                    <div className="sm-lbl">
                                        This'll help you recover your account if you're unable to use your main
                                        email
                                    </div>
                                </div>
                            </div>
                            {/*Alternative email ends*/}

                            <hr className="hr60"/>
                            <br/>

                            <div>
                                <div className="txt-container">
                                    <h1>Please set your login details</h1>
                                </div>
                                {/*Username section starts*/}
                                <div className="q-item-container">
                                    <div>
                                        <label className="bold-lbl" htmlFor="username">Username/email: </label>
                                    </div>
                                    <div>
                                        <input className="form-item" id="username" type="text"
                                               formcontrolname="username"
                                               onChange={evt => this.onChangeEmailTxtBx(evt)}/>
                                    </div>
                                    <div className={"smTopGap"}>
                                        <div className="sm-lbl">
                                            This is the email we contact you with. We can't change it later.
                                        </div>
                                        <div className="sm-lbl">
                                            So please choose correctly
                                        </div>
                                    </div>

                                    <div className="text-danger">

                                    </div>
                                    {this.state.emailStatus_fill &&
                                        <div className="text-danger">
                                            <ValidationErr errorMsg={"Please fill your Username"}/>
                                        </div>}

                                    {this.state.emailStatus_pattern &&
                                        <div className="text-danger">
                                            <ValidationErr
                                                errorMsg={"Your email address has been entered incorrectly"}/>
                                        </div>}

                                </div>
                                {/*Username section ends*/}

                                {/*Password section starts*/}
                                <div className="q-item-container">
                                    <div>
                                        <label className="bold-lbl" htmlFor="password">Password: </label>
                                    </div>
                                    <div>
                                        <input className="form-item" id="password" type="password"
                                               formcontrolname="password"
                                               onChange={evt => this.onChangePasswordTxtBx(evt)}/>
                                    </div>

                                    {this.state.passwordStatus_fill &&
                                        <div className="text-danger">
                                            <ValidationErr errorMsg={"Please fill your Password"}/>
                                        </div>
                                    }

                                    {this.state.passwordStatus_length &&
                                        <div className="text-danger">
                                            <ValidationErr errorMsg={"Password must be longer than 8 characters"}/>
                                        </div>
                                    }

                                    {this.state.passwordStatus_status &&
                                        <div className="text-danger">
                                            <ValidationErr
                                                errorMsg={"Password must be included atleast a capital letter, number and special character"}/>
                                        </div>
                                    }

                                </div>
                                {/*Password section ends*/}

                                {/*Re-password start*/}
                                <div className="q-item-container">
                                    <div>
                                        <label className="bold-lbl" htmlFor="rePassword">Re Password: </label>
                                    </div>
                                    <div>
                                        <input className="form-item" id="rePassword" type="password"
                                               formcontrolname="rePassword"
                                               onChange={evt => this.onChangeRePasswordTxtBx(evt)}/>
                                    </div>
                                    {this.state.rePasswordStatus_fill &&
                                        <div className="text-danger">
                                            <ValidationErr errorMsg={"Please fill Password again"}/>
                                        </div>}
                                    {this.state.rePasswordStatus_equal &&
                                        <div className="text-danger">
                                            <ValidationErr errorMsg={"Passwords are not equal"}/>
                                        </div>}
                                    <hr className="hr60"/>
                                    <br/>
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
                                                <input id="yes" type="radio" className="custom-control-input"
                                                       value="yes" name="marketingPref"
                                                    // onClick={this.marketingPrefCheckStatus(true)}
                                                       formcontrolname="marketingPref"/>
                                                <label className="custom-control-label" htmlFor="yes"> Yes </label>
                                            </div>

                                            <div className="hori-item"
                                                 onChange={this.onChangeValueMarketing.bind(this)}>
                                                <input id="no" type="radio" className="custom-control-input"
                                                       defaultChecked={true}
                                                       value="no" name="marketingPref"
                                                       formcontrolname="marketingPref"/>
                                                <label className="custom-control-label" htmlFor="no"> No </label>
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
                                            <button type="button" className=" pri-color-outline">Back</button>
                                        </Link>
                                    </div>

                                    <div className="hori-item">
                                        <button type="button" onClick={this.addContactFormSubmit.bind(this)}
                                                className="pri-color">Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/*submit ends*/}

                        </form>
                    </div>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>)
    }

    getBannerVisibilityAdd() {
        if (this.state.brnAddIsVisible === true) {
            // return "block"
            return {display: "block"};
        } else {
            // return "none"
            return {display: "none"};
        }
    }

    isIncludeSpecialCharacters() {
        const password = this.state.formData.password;
        console.log(password)
        if (
            this.checkGivenStringHasOneOrMoreNumbers(password) &&
            this.checkGivenStringHasOneOrMoreCapitalLetters(password) &&
            this.checkGivenStringHasOneOrMoreSpecialCharacters(password)
        ) {
            return true
        } else {
            return false
        }
    }

    checkGivenStringHasOneOrMoreNumbers(str) {
        var regex = /[0-9]/g;
        return regex.test(str);
    }

    checkGivenStringHasOneOrMoreCapitalLetters(str) {
        var regex = /[A-Z]/g;
        return regex.test(str);
    }

    checkGivenStringHasOneOrMoreSpecialCharacters(str) {
        var regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        return regex.test(str);
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


    emailValidation_fill() {
        if (this.state.formValidation.email_isTouched === true && this.state.formData.email === '') {
            this.setState({emailStatus_fill: true})
        } else {
            this.setState({emailStatus_fill: false})
        }
    }

    emailValidation_pattern() {
        if (this.state.formValidation.email_Touched === true && this.state.formValidation.email_pattern === false) {
            this.setState({emailStatus_pattern: true})
        } else {
            this.setState({emailStatus_pattern: false})
        }
    }


    passwordValidation_fill() {
        if (this.state.formValidation.password_isTouched === true && this.state.formData.password === '') {
            this.setState({passwordStatus_fill: true})
        } else {
            this.setState({passwordStatus_fill: false})
        }
    }

    passwordValidation_length() {
        if (this.state.formValidation.password_isTouched === true && this.state.formData.password.length <= 8) {
            this.setState({passwordStatus_length: true})
        } else {
            this.setState({passwordStatus_length: false})
        }
    }

    passwordValidation_status() {
        if (this.state.formValidation.password_isTouched === true && !this.isIncludeSpecialCharacters()) {
            this.setState({passwordStatus_status: true})
        } else {
            this.setState({passwordStatus_status: false})
        }
    }

    rePasswordValidation_fill() {
        if (this.state.formValidation.rePassword_isTouched === true && this.state.formData.rePassword === '') {
            this.setState({rePasswordStatus_fill: true})
        } else {
            this.setState({rePasswordStatus_fill: false})
        }
    }

    rePasswordValidation_equal() {
        if (this.state.formValidation.rePassword_isTouched === true &&
            this.state.formData.password !== this.state.formData.rePassword && this.state.formData.rePassword !== '') {
            this.setState({rePasswordStatus_equal: true})
        } else {
            this.setState({rePasswordStatus_equal: false})
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
