import React, {Component} from 'react'

export default class titile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            subTitle: this.props.subTitle
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>{this.state.subTitle}</p>
            </div>
        )
    }
}
