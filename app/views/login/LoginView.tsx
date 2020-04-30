import React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { sub_styles } from '../styles';
import { LoginProps, LoginState } from '../../types/navigation';
import database from '../../api/database';
import { UserResponse, Failure } from '../../types/database/responses';
import { StackActions } from '@react-navigation/native';

// Screen of Login
export default class LoginView extends React.Component<LoginProps, LoginState> {

    state: Readonly<LoginState> = {
        username: '',
        password: '',
        validState: false,
        showProgress: false
    }

    componentDidMount() {
        // Sets the title of the Screen
        this.props.navigation.setOptions({ title: 'Log In' })
    }

    componentDidUpdate(prevProps: LoginProps, prevState: LoginState) {
        if (prevState.username !== this.state.username || prevState.password !== this.state.password) {
            this.validateForm()
        }
    }

    usernameChanged = (username: string) => {
        this.setState({ username })
    }

    passwordChanged = (password: string) => {
        this.setState({ password })
    }

    // Ensures that neither password nor username has whitespaces and that password is at least of length 8
    validateForm = () => {
        if (/\s/.test(this.state.username) || /\s/.test(this.state.password) || this.state.password.length < 8) this.setState({ validState: false })
        else this.setState({ validState: true })
    }

    // Logins user to the database
    loginUser = () => {
        database.login(this.state.username, this.state.password)
            .then(res => {
                // If the response of the database was the user's id
                if ("id" in res) {
                    const user = res as UserResponse
                    this.props.navigation.dispatch(
                        StackActions.replace('Subreddits', {
                            userid: user.id
                        })
                    )
                }
                else {
                    // Else, there was an error logging the user
                    const err = res as Failure
                    Alert.alert(
                        "Log In error",
                        err.message,
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("Login error")
                            }
                        ]
                    )
                    this.setState({ showProgress: false })
                }
            })
            // If there was an error in the petition
            .catch(err => {
                Alert.alert(
                    "Network Error",
                    "User couldn't be logged in, try again later",
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("Network error")
                        }
                    ]
                )
                this.setState({ showProgress: false })
            })
    }

    handleSubmit = () => {
        // If the user has entered a valid username and password
        if (this.state.validState) {
            this.setState({ showProgress: true })
            this.loginUser()
        }
        else {
            Alert.alert(
                "Invalid entries",
                "Username or password are invalid, check again.",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("Invalid username | password")
                    }
                ]
            )
        }
    }

    // If the user wants to enter as a guest
    handleGuest = () => {
        this.props.navigation.dispatch(
            StackActions.replace('Subreddits', {
                userid: 0
            })
        )
    }

    handleRegister = () => {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <KeyboardAvoidingView style={sub_styles.search_container}>
                <Text>Username:</Text>
                <View style={{ margin: 5 }} />
                <TextInput
                    style={sub_styles.search_text}
                    onChangeText={this.usernameChanged}
                    value={this.state.username}
                    autoCapitalize='none'
                />
                <View style={{ marginTop: 10 }} />
                <Text>Password:</Text>
                <TextInput
                    style={sub_styles.search_text}
                    onChangeText={this.passwordChanged}
                    value={this.state.password}
                    autoCapitalize='none'
                    secureTextEntry={true}
                />
                <View style={{ marginTop: 10 }} />
                <View style={[sub_styles.progress, sub_styles.progress, { opacity: this.state.showProgress ? 100 : 0 }]} >
                    <Text>Logging...</Text>
                    <ActivityIndicator color="#0000ff" />
                </View>
                <View style={sub_styles.options_container}>
                    <Button title="Log In" onPress={this.handleSubmit} color='royalblue' />
                    <View style={{ margin: 10 }} />
                    <Button title="Register" onPress={this.handleRegister} color='royalblue' />
                    <View style={{ margin: 25 }} />
                    <Button title="Continue without signing" onPress={this.handleGuest} color='royalblue' />
                </View>
            </KeyboardAvoidingView>
        )
    }
}