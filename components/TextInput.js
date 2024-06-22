import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { ERROR, PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from "../assets/styles";

export default function TextInput({ errorText, description, ...props }) {
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                selectionColor={PRIMARY_COLOR}
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: WHITE,
    },
    description: {
        fontSize: 13,
        color: SECONDARY_COLOR,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: ERROR,
        paddingTop: 8,
    },
})