import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import WS from 'react-native-websocket'

export default class ConnectBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            address: "",
        };
    }

    componentDidMount() {

    }

    handleInput = text => {
        this.setState({ address: text })
    }

    handleButton = () => {
        this.props.marks.toggleWS(this.state.address)
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Address here"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handleInput}
                    value={this.state.address}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.handleButton} color="#21ba45" accessibilityLabel="Learn more about this purple button"
                >
                    <Text style={styles.submitButtonText}>{this.props.marks.isConnected()
                        ? "Disconnect"
                        : "Connect"} </Text>
                </TouchableOpacity>
            </View>
        );


        /*return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Input here"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handleInput}
                    value={this.state.userInput}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.handleButton}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )*/
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        margin: "auto"
    },
    input: {
        padding: 10,
        margin: 10,
        height: 40,
        borderColor: "#7a42f4",
        borderWidth: 1,
        width: "60%"
    },
    submitButton: {
        backgroundColor: "#7a42f4",
        padding: 10,
        margin: 10,
        height: 40,
        width: "30%"
    },
    submitButtonText: {
        color: "white"
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});