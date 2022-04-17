import React, {Component} from 'react'
import "../../styles/statusBannerStyles.css";

export default class statusBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
            subTitle: this.props.subTitle,
            title: this.props.title
        }
    }

    render() {
        return (
            <div className={"statusBannerStyles"}
                 style={{backgroundColor: this.state.status === true ? "green" : "red"}}>
                <div className={"contentContainer"}>
                    {this.state.status === true ? (
                        //Success start
                        <div>
                            <div className={"imgTxtContainer"}>
                                <div className={"imgTxtItem"}>
                                    <img src={require('../../assets/img/check.png')} alt="React" width="20px"
                                         height="20px"/>
                                </div>
                                <div className={"imgTxtItem"}>
                                    <div className={"titleCls"}>
                                        {this.state.title}
                                    </div>
                                    <div className={"subTitleCls"}>
                                        {this.state.subTitle}
                                    </div>
                                </div>
                            </div>


                        </div>
                        //Success end
                    ) : (
                        //error start
                        <div>
                            <div className={"imgTxtContainer"}>
                                <div className={"imgTxtItem"}>
                                    <img src={require('../../assets/img/remove.png')} alt="React" width="20px"
                                         height="20px"/>
                                </div>
                                <div className={"imgTxtItem"}>
                                    <div className={"titleCls"}>
                                        {this.state.title}
                                    </div>
                                    <div className={"subTitleCls"}>
                                        {this.state.subTitle}
                                    </div>
                                </div>
                            </div>


                        </div>
                        //error start
                    )}
                </div>

            </div>

        )
    }
}
