import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import InputBox from './components/InputBox'
import OutputBox from "./components/OutputBox";
import ConnectBox from "./components/ConnectBox";

export default class MainController extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputAddress: "",
            outputList: [],
            connected: false
        }

        this.socket = null
        this.marks.toggleWS = this.marks.toggleWS.bind(this);
    }

    connectWS(inputAddress) {
        let address = (inputAddress === "")? 'wss://echo.websocket.org/' : inputAddress
        if(!address.includes("://"))
            address = "http://" + address

        this.marks.addUserOutput("connecting " + address + "...")

        this.socket = new WebSocket(address)
        this.socket.onerror = () => {
            this.marks.addUserOutput("connecting " + address + " has failed")
            this.setState(prevState => ({
                connected: false
            }))
            this.socket = null
        }

        this.socket.onopen = () => {
            this.socket.onmessage = ({data}) => this.marks.addUserOutput(data);
            this.marks.addUserOutput("connected at " + address)
            this.setState(prevState => ({
                connected: true
            }));
        }

        this.socket.onclose = () => {
            this.setState(prevState => ({
                connected: false
            }))
            this.socket = null
            this.marks.addUserOutput("connection closed")
        }
    }

    disconnectWS() {
        this.socket.close()
    }


    marks = {
        isConnected: () => this.state.connected,
        setSocket: (socket) => this.socket = socket,
        sendMessage: (message) => {
            if(!this.socket)
                return
            this.socket.send(message)
        },
        setUserOutput: (text) => this.setState({ userOutput: text }),
        addUserOutput: (text) => this.setState({outputList: this.state.outputList.concat(text)}),
        getUserOutput: () => this.state.outputList,
        toggleWS: (address) => {
            if (this.socket)
                this.disconnectWS();
            else
                this.connectWS(address);

            //this.socket.send("It worked!")
        }
    }

    render() {
        return (
            <View>
                <ConnectBox marks={this.marks} />
                <InputBox marks={this.marks} />
                <OutputBox outputList={this.state.outputList} />
            </View>
        )
    }
}
