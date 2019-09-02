import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import Voice from 'react-native-voice';

export default class InputBox extends Component {
    constructor(props) {
        super(props);
        Voice.onSpeechStart = this._onSpeechStart;
        Voice.onSpeechEnd = this._onSpeechEnd;
        Voice.onSpeechResults = this._onSpeechResults;
        Voice.onSpeechError = this._onSpeechError;
    }


    state = {
        userInput: "",
        isRecord: false,
        voice: ''
    };

    handleInput = text => {
        this.setState({ userInput: text })
    }

    handleButton = () => {
        this.props.marks.addUserOutput("> " + this.state.userInput)
        if(this.props.marks.isConnected()){
            this.props.marks.sendMessage(this.state.userInput)
        }

        this.setState({ userInput: "" })
    }

    handleRecord = async () => {
        await this._onRecordVoice()
    }

    async componentDidMount() {
/*        const { status, expires, permissions } = await Permissions.askAsync(
            Permissions.AUDIO_RECORDING
        );
        if (status !== "granted") {
            //Permissions not granted. Don't show the start recording button because it will cause problems if it's pressed.
            this.setState({showRecordButton: false});
        } else {
            this.setState({showRecordButton: true});
        }*/
    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }

    _onSpeechStart = event => {
        console.log('onSpeechStart');
        this.setState({
            voice: '',
        });
    };
    _onSpeechEnd = event => {
        console.log('onSpeechEnd');
    };
    _onSpeechResults = event => {
        console.log('onSpeechResults');
        this.setState({
            voice: event.value[0],
        });

        this.props.marks.addUserOutput("= " + event.value[0])

        if(this.props.marks.isConnected()){
            this.props.marks.sendMessage(event.value[0])
        }
    };
    _onSpeechError = event => {
        console.log('_onSpeechError');
    };

    _onRecordVoice = async () => {
        const { isRecord } = this.state;
        try {
            if (isRecord) {
                await Voice.stop();
            } else {
                await Voice.start('ko-KR');
            }
        } catch (e) {
            console.error(e)
            return
        }

        this.setState({
            isRecord: !isRecord,
        });
    };

    render() {
        return (
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

                <TouchableOpacity
                    style={styles.recordButton}
                    onPress={this.handleRecord}
                >
                    <Text style={styles.submitButtonText}>{(this.state.isRecord)? "Stop record" : "Start record"}</Text>
                </TouchableOpacity>
            </View>
        )
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
    recordButton: {
        backgroundColor: "#7a42f4",
        padding: 10,
        margin: 10,
        height: 40,
        width: "80%",

    },
    submitButtonText: {
        color: "white"
    }
});
