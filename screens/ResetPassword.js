import React, { useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { Background, BackButton, Logo, Header, TextInput, Button } from "../components";
import { ERROR, PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from "../assets/styles";


const ResetPassword = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' })

    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }
        const url = "http://10.0.2.2:3001/forgotpassword/" + email.value;
        const config =
        {
            headers: {
                Authorization: "Edumeet edumeet"
            }
        }
        axios.post(url, {}, config)
            .then((res) => {
                if (res.data.status === "error") {
                    throw res.data.message;
                }
                console.log("RESPONSE RECEIVED: ", res);
                alert('Verification mail is sended, you can reset your password with link...')
                // navigation.navigate('Login')
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                alert(err);
            })

    }
    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Restore Password</Header>
            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="You will receive email with password reset link."
            />
            <Button
                mode="contained"
                onPress={sendResetPasswordEmail}
                style={{ marginTop: 16 }}
            >
                Send Instructions
            </Button>
        </Background>
    )

};



export default ResetPassword;
