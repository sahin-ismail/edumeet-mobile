import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ERROR, PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from "../assets/styles";
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { Background, BackButton, Logo, Header, TextInput, Button } from "../components";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase'
import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onLoginPressed = async () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        /*******************login********************/
        let res;
        try {
            //const token = await SecureStore.getItemAsync('idToken');
            console.log("email: ", email.value)
            res = await signInWithEmailAndPassword(auth, email.value, password.value);
            if (res.user.emailVerified) { // doğrulamalı logini açmak için ünlem kalkcak
                await SecureStore.setItemAsync('idToken', res._tokenResponse.idToken);
                await SecureStore.setItemAsync('email', email.value);
                await SecureStore.setItemAsync('uid', res.user.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Tab' }],
                })
            } else {
                alert("Mail adresinize gönderilen linkten hesabınızı doğrulayın.")
            }
        }
        catch (e) {
            console.log(e);
            alert(e);
            return;
        }
        /*******************login********************/
    }
    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Welcome back.</Header>
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
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPassword')}
                >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={onLoginPressed}>
                Login
            </Button>
            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('Register')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )


};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: PRIMARY_COLOR,
    },
    link: {
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
    },
})

export default Login;
