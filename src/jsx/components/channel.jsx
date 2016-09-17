import React, {Component} from 'react';

class Channel extends Component {
    
    constructor() {
        super();
        this.baseURL = "http://twitch.tv/";
    }

    render() {
        return (
            <div className={this.props.state + " channel col-md-3"}>
                <a href={this.props.url}>
                <div className="inner-container">
                    <img src={this.props.logo} alt="logo image"/>
                    <h3 className="name">{this.props.name}</h3>
                    <p className="title">{this.props.title}</p>
                    <p className="description">{this.props.description}</p>
                    <h3 className="state">{this.props.state}</h3>
                </div>
                </a>
            </div>
        );
    }
}

export default Channel;