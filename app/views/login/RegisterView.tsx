import React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { sub_styles } from '../styles';
import { LoginProps, LoginState, RegisterState, RegisterProps } from '../../types/navigation';
import database from '../../api/database';
import { UserResponse, Failure } from '../../types/database/responses';
import { StackActions } from '@react-navigation/native';

export default class RegisterView extends React.Component<RegisterProps, RegisterState> {
    state: Readonly<RegisterState> = {
        username: '',
        password: '',
        validState: false,
        showProgress: false
    }

    componentDidMount() {
        this.props.navigation.setOptions({ title: 'Register' })
    }

    componentDidUpdate(prevProps: RegisterProps, prevState: RegisterState) {
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

    validateForm = () => {
        if (/\s/.test(this.state.username || this.state.password)) this.setState({ validState: false })
        else this.setState({ validState: true })
    }

    loginUser = () => {
        database.addUser(this.state.username, this.state.password)
            .then(res => {
                if ("id" in res) {
                    Alert.alert(
                        "Successfully registered!",
                        "You can now browse through Reddit and save posts as will!",
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    const user = res as UserResponse
                                    this.props.navigation.dispatch(
                                        StackActions.replace('Subreddits', {
                                            userid: user.id
                                        })
                                    )
                                }
                            }
                        ]
                    )
                }
                else {
                    const err = res as Failure
                    Alert.alert(
                        "Registering error",
                        err.message,
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("Login error")
                            }
                        ]
                    )
                }
            })
            .catch(err => {
                Alert.alert(
                    "Network Error",
                    "User couldn't be registered, try again later",
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("Network error")
                        }
                    ]
                )
            })
    }

    handleSubmit = () => {
        if (this.state.validState) {
            this.setState({ showProgress: true })
            this.loginUser()
        }
        else {
            Alert.alert(
                "Invalid entries",
                "Username and password cannot contain whitespaces",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("Invalid username | password")
                    }
                ]
            )
        }
    }

    handleCancel = () => {
        this.props.navigation.pop()
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
                    <Text>Registering...</Text>
                    <ActivityIndicator color="#0000ff" />
                </View>
                <View style={sub_styles.options_container}>
                    <Button title="Register" onPress={this.handleSubmit} color='royalblue' />
                    <View style={{ margin: 25 }} />
                    <Button title="Cancel" onPress={this.handleCancel} color='royalblue' />
                </View>
            </KeyboardAvoidingView>
        )
    }
}