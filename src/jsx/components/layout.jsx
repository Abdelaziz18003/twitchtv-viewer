import React, {Component} from 'react';
import ChannelsBox from "./channels-box.jsx";
import $ from "jquery";

class Layout extends Component {

    constructor() {
        super();

        this.defaultLogo = "http://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_purple.png";

        this.state = {
            navigationState: "All",
            allState: "active",
            onlineState: "",
            offlineState: "",
            closedState: ""
        }
    }

    _navigateTo(state) {
        switch(state) {
            case "all": {
                this.setState({
                    allState: "active",
                    onlineState: "",
                    offlineState: "",
                    closedState: ""
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
                    offlineState: "",
                    closedState: ""
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
                    offlineState: "active",
                    closedState: ""
                });

                $(".online").hide();
                $(".offline").show();
                $(".closed").hide();
                break;
            }

            case "closed": {
                this.setState({
                    allState: "",
                    onlineState: "",
                    offlineState: "",
                    closedState: "active"
                });

                $(".online").hide();
                $(".offline").hide();
                $(".closed").show();
                break;
            }
        }
    }

    render() {
        return (
            <div>
                <div className="header text-center">
                <img src={this.defaultLogo} alt="Twitch.tv logo"/>
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

                            <li role="presentation" className={this.state.closedState} onClick={this._navigateTo.bind(this, "closed")} >
                                <a href="#">closed</a>
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