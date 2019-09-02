import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class OutputBox extends Component {
    render() {
        const outputList = this.props.outputList
        return (
            <View style={styles.container}>
                <ScrollView style={styles.output}>
                    {outputList.map((item, index) => (
                        <Text key={index}>
                            {item}
                        </Text>
                    ))
                    }
                    <Text>{"\n"}</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: "scroll"
    },
    output: {
        padding: 10,
        margin: 15,
        height: 250,
        borderColor: "#7a42f4",
        borderWidth: 1,
    },
});
