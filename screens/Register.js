import React, { useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { surnameValidator } from '../helpers/surnameValidator';
import { Background, BackButton, Logo, Header, TextInput, Button } from "../components";
import { ERROR, PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from "../assets/styles";


const Register = ({ navigation }) => {
    const [name, setName] = useState({ value: '', error: '' })
    const [surname, setSurname] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [password1, setPassword1] = useState({ value: '', error: '' })

    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value)
        const surnameError = surnameValidator(surname.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        const passwordError1 = passwordValidator(password1.value)

        if (emailError || passwordError || nameError || surnameError || passwordError1) {
            setName({ ...name, error: nameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setPassword({ ...password1, error: passwordError1 })
            setSurname({ ...surname, error: surnameError })
            return
        }

        if (password.value != password1.value) {
            alert('Passwords are not same!');
            setPassword({ value: '', error: '' });
            setPassword1({ value: '', error: '' });
            return
        }
        const url = "http://edumeet-server.herokuapp.com/usr/register";
        //const url = "https://10.0.2.2:3001/usr/register";
        const data =
        {
            "email": email.value,
            "password": password.value,
            "name": name.value,
            "surname": surname.value
        }
        const config =
        {
            headers: {
                Authorization: "Edumeet edumeet"
            }
        }

        axios.post(url, data, config)
            .then((res) => {
                if (res.data.status === "error") {
                    throw res.data.message;
                }
                console.log("RESPONSE RECEIVED: ", res);
                alert('You are registered, you can login after verify your email...');
                setName({ value: '', error: '' });
                setEmail({ value: '', error: '' });
                setPassword({ value: '', error: '' });
                setPassword1({ value: '', error: '' });
                setSurname({ value: '', error: '' });
                // navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'Login' }],
                // })
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                alert(err);
            })

    }
    return (
        <ScrollView
            vertical={true}
            showsVerticalScrollIndicator={false}
        >
            <Background>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Create Account</Header>
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: '' })}
                    error={!!name.error}
                    errorText={name.error}
                    maxLength={15}
                />
                <TextInput
                    label="Surname"
                    returnKeyType="next"
                    value={surname.value}
                    onChangeText={(text) => setSurname({ value: text, error: '' })}
                    error={!!surname.error}
                    errorText={surname.error}
                    maxLength={15}
                />
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    maxLength={50}
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                    maxLength={15}
                />
                <TextInput
                    label="Password Again"
                    returnKeyType="done"
                    value={password1.value}
                    onChangeText={(text) => setPassword1({ value: text, error: '' })}
                    error={!!password1.error}
                    errorText={password1.error}
                    secureTextEntry
                    maxLength={15}
                />

                <Button
                    mode="contained"
                    onPress={onSignUpPressed}
                    style={{ marginTop: 24 }}
                >
                    Sign Up
                </Button>
                <View style={styles.row}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
})

export default Register;
