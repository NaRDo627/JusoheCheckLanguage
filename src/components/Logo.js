import React from 'react';
import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native';

export default function Logo() {
    return (
        <View style={styles.container}>
            <Image
                style={{width: 200, height: 200,}}
                source={require('../../assets/logo.jpg')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});