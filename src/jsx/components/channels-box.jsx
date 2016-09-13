import $ from "jquery";
import React, {Component} from 'react';
import Channel from "./channel.jsx";


class ChannelsBox extends Component {

    //component constructor
    constructor() {
        super();

        this.apiLink = "https://api.twitch.tv/kraken/";

        //list of channels to look for
        this.streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];

        //this is the list of streams and channels details got from twitch API
        this.state = {
            channelsDetails: [],
            streamsDetails: []
        };
    }

    //methode that handle click event
    _handleClick() {
        this.streamers.map((streamer, index) => {
            this._getDetails("channels", streamer, this._updateState.bind(this));
            this._getDetails("streams", streamer, this._updateState.bind(this));
        })
    }

    //methode used to fetch json data about a given channel 
    _getDetails(type, channelName, callback) {
        $.ajax({
            url: this.apiLink + type + "/" + channelName,
            dataType: "jsonp",
            success: function(response) {
                callback(type, response);
            }
        })
    }

    //methode used to update the state according to the ajax response
    _updateState(type, response) {
        
        //update the ""streamsDetails" state if type is "streams"
        if (type === "streams") {

            let buffer = this.state.streamsDetails;
            buffer.push(response);

            this.setState({
                streamsDetails: buffer
            })
        
        //update the ""channelsDetails" state if type is "channels"
        } else if (type === "channels") {
            
            let buffer = this.state.channelsDetails;
            buffer.push(response);

            this.setState({
                channelsDetails: buffer
            });
        }
    }

    _makeChannelsComponents() {
        
        //return an array of <Channel /> components
        return this.state.streamsDetails.map((streamsItem, index) => {

            let streamingState = streamsItem.stream ? "online" : "offline",
                channel = streamsItem.stream ? streamsItem.stream.channel : 
                    this.state.channelsDetails[index],
                
                // set title and description only when the channel is online
                title = streamingState === "online" ? channel.game : "",
                description = streamingState === "online" ? channel.status : "";

                if(streamsItem.stream === undefined) {
                    return <Channel state="closed" url="/" name={this.streamers[index]} title="Account closed" />
                }
            
            return <Channel state={streamingState} url={channel.url} logo={channel.logo} name=      {channel.display_name} title={title} description={description} />
        })
    }

    //render the component to the DOM
    render() {
        return (
            <div>
                <ul>
                    <li>all</li>
                    <li>online</li>
                    <li>offline</li>
                    <button onClick={this._handleClick.bind(this)}>get streams</button>
                </ul>

                {this._makeChannelsComponents()}
            </div>
        );
    }
}

export default ChannelsBox;