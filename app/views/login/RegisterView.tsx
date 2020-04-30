import React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { sub_styles } from '../styles';
import { RegisterState, RegisterProps } from '../../types/navigation';
import database from '../../api/database';
import { UserResponse, Failure } from '../../types/database/responses';
import { StackActions } from '@react-navigation/native';

// Screen were the user will Register to use the application
export default class RegisterView extends React.Component<RegisterProps, RegisterState> {
    state: Readonly<RegisterState> = {
        username: '',
        password: '',
        validState: false,
        showProgress: false
    }

    componentDidMount() {
        // Set the title of the Screen
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

    // Ensures that neither password nor username has whitespaces and that password is at least of length 8
    validateForm = () => {
        if (/\s/.test(this.state.username) || /\s/.test(this.state.password) || this.state.password.length < 8) this.setState({ validState: false })
        else this.setState({ validState: true })
    }

    // Registers user to the database
    registerUser = () => {
        database.addUser(this.state.username, this.state.password)
            .then(res => {
                // If the reponse of the database is the user's id
                if ("id" in res) {
                    // Notifies the user that it was added successfully
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
                // If there was an error registering the user
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
                    this.setState({ showProgress: false })

                }
            })
            // If there is an error making the petition
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
                this.setState({ showProgress: false })
            })
    }

    handleSubmit = () => {
        // If the user has entered a valid username and password
        if (this.state.validState) {
            this.setState({ showProgress: true })
            this.registerUser()
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

    // If the user cancels then return to the Registering Screen
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