import $ from "jquery";
import React, {Component} from 'react';
import Channel from "./channel.jsx";


class ChannelsBox extends Component {

    //component constructor
    constructor() {
        super();

        this.apiLink = "https://api.twitch.tv/kraken/streams";
        this.clientId = "c7o7b0odmvym6yi5x3hxp16ecdvrjt3";
        this.defaultLogo = "http://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_purple.png";

        //list of channels to look for
        this.streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];

        //this is the list of streams and channels details got from twitch API
        this.state = {
            streamsDetails: []
        };
    }

    //execute this when the component renders for the first time
    componentDidMount() {
        this._handleClick();
    }

    //methode that handle click event
    _handleClick() {
        this.streamers.map((streamer, index) => {
            this._getDetails(streamer, this._updateState.bind(this));
        })
    }

    //methode used to fetch json data about a given channel 
    _getDetails(streamer, callback) {
        $.ajax({
            url: this.apiLink + "/" + streamer + "?client_id=" + this.clientId,
            dataType: "jsonp",
            success: function(response) {
                callback(response);
            }
        })
    }

    //methode used to update the state according to the ajax response
    _updateState(response) {
        
        let buffer = this.state.streamsDetails;
        buffer.push(response)

        this.setState({
            streamsDetails: buffer
        });
    }

    //make channel components from streams state
    _makeChannelsComponents() {
        
        //return an array of <Channel /> components
        return this.state.streamsDetails.map((streamsItem, index) => {

            let streamingState = streamsItem.stream ? "online" : "offline",
                channel = streamsItem.stream ? streamsItem.stream.channel : null,
                logoUrl = channel ? channel.logo : this.defaultLogo;

            // set title and description only when the channel is online
            let title = streamingState === "online" ? channel.game : "",
                description = streamingState === "online" ? channel.status : "";

            // when the channel is offline
            if (streamsItem.stream === null) {

                let startIndex = this.apiLink.length + 1;

                let channelName = streamsItem._links.self.substr(startIndex);
                
                return <Channel state={streamingState} url={"https://twitch.tv/" + channelName} logo={logoUrl} name={channelName}/>
            }

            //when the channel is closed
            if(streamsItem.stream === undefined) {
                return <Channel state="closed" url="/" name={this.streamers[index]} title="Account closed" logo={logoUrl}/>
            }
            
            return <Channel state={streamingState} url={channel.url} logo={channel.logo} name={channel.display_name} title={title} description={description} />
        })
    }

    //render the component to the DOM
    render() {
        return (
            <div className="channel-box container">
                {this._makeChannelsComponents()}
            </div>
        );
    }
}

export default ChannelsBox;