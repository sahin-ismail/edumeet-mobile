import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { PRIMARY_COLOR, WHITE } from "../assets/styles";

export default function Header(props) {
    return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
})