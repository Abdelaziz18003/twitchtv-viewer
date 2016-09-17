import React, {Component} from 'react';
import ChannelsBox from "./channels-box.jsx";
import $ from "jquery";

class Layout extends Component {

    constructor() {
        super();
        this.state = {
            navigationState: "All",
            allState: "active",
            onlineState: "",
            offlineState: ""
        }
    }

    _navigateTo(state) {
        switch(state) {
            case "all": {
                this.setState({
                    allState: "active",
                    onlineState: "",
                    offlineState: ""
                });

                $(".online").show();
                $(".offline").show();
                $(".closed").show();
                break;
            }

            case "online": {
                this.setState({
                    allState: "",
                    onlineState: "active",
                    offlineState: ""
                });

                $(".online").show();
                $(".offline").hide();
                $(".closed").hide();
                break;
            }

            case "offline": {
                this.setState({
                    allState: "",
                    onlineState: "",
                    offlineState: "active"
                });

                $(".online").hide();
                $(".offline").show();
                $(".closed").hide();
                break;
            }
        }
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1 className="text-center">Twitch.tv Viewer</h1>
                    <div className="container">
                        <ul className="nav nav-tabs nav-justified">
                            <li role="presentation" className={this.state.allState} onClick={this._navigateTo.bind(this, "all")} >
                                <a href="#">All</a>
                            </li>
                            <li role="presentation" className={this.state.onlineState} onClick={this._navigateTo.bind(this, "online")} >
                                <a href="#">Online</a>
                            </li>
                            <li role="presentation" className={this.state.offlineState} onClick={this._navigateTo.bind(this, "offline")} >
                                <a href="#">Offline</a>
                            </li> 
                        </ul>
                    </div>
                </div>
                <ChannelsBox />
            </div>
        );
    }
}

export default Layout;