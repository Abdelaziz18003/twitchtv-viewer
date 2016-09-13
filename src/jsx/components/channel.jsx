import React, {Component} from 'react';

class Channel extends Component {
    
    constructor() {
        super();
        this.baseURL = "http://twitch.tv/";
    }

    render() {
        return (
            <div>
                <a href={this.props.url}>
                    <img src={this.props.logo} alt="logo image"/>
                    <h3>{this.props.name} ({this.props.state})</h3>
                    <p>{this.props.title}</p>
                    <p>{this.props.description}</p>
                </a>
            </div>
        );
    }
}

export default Channel;