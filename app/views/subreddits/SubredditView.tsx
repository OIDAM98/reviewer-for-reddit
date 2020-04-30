import { Subreddit } from '../../types/primitives'
import { SubredditsProps, SubredditsState } from '../../types/navigation';
import { sub_styles, defaults } from '../styles';

import React from 'react';
import SubredditCell from './SubredditCell'

import { View, FlatList, Alert, Button } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import reddit from '../../api/reddit';
import database from '../../api/database'
import { Failure } from '../../types/database/responses';
import { StackActions } from '@react-navigation/native';

const DEFAUL_SUBS: Array<Subreddit> =
    ['frontpage', 'all', 'funny', 'cooking', 'aww', 'nextfuckinglevel', 'beamazed', 'programming']
        .map(name => ({ name }))

export default class SubredditsView extends React.Component<SubredditsProps, SubredditsState> {
    state: Readonly<SubredditsState> = {
        subreddits: [],
        userID: this.props.route.params.userid || 0
    }

    // Load user's subreddits or load defaults
    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button
                    title={this.state.userID > 0 ? 'Log Out' : 'Register'}
                    color='royalblue'
                    onPress={() => {
                        this.props.navigation.dispatch(
                            StackActions.replace('Login')
                        )
                    }}
                />
            )
        })
        if (this.state.userID > 0) {
            this.loadSubreddits()
        }
        else {
            //const subreddits 
            this.setState({ subreddits: DEFAUL_SUBS })
        }
    }

    loadSubreddits = () => {
        // Fetch subreddits from the DB
        database.getSubreddits(this.state.userID)
            .then(res => {
                if (!("status" in res)) {
                    const subs = res as Array<Subreddit>
                    if (subs.length > 0) {
                        this.setState({ subreddits: subs })
                    }
                    else {
                        Alert.alert(
                            "Empty Subreddits",
                            "No subreddits found for user. Maybe you haven't saved any?",
                            [
                                {
                                    text: "OK",
                                    onPress: () => console.log("Empty subs")
                                }
                            ]
                        )
                        this.setState({ subreddits: DEFAUL_SUBS })
                    }
                }
                else {
                    const err = res as Failure
                    Alert.alert(
                        err.message,
                        "Subreddits for user could not be loaded, try again later",
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("Network error")
                            }
                        ]
                    )
                }
            })
            .catch(e => {
                console.log(e)
                Alert.alert(
                    "Network Error",
                    "Subreddits for user could not be loaded, try again later",
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("Network error")
                        }
                    ]
                )
                this.setState({ subreddits: DEFAUL_SUBS })
            })
    }

    // Function to load subreddits into the list, creating cell for each one
    renderSubreddit = (item: Subreddit) => <SubredditCell
        name={item.name}
        navigation={this.props.navigation}
        userId={this.state.userID}
    />

    // Search subreddit in Reddit
    // If found, then add it and notify user
    // Else, notify it couldn't be added
    handleSubreddit = (name: string | undefined) => {
        if (name) {
            reddit.searchSubreddit(name.toLowerCase())
                .then(found => {
                    if (found) {
                        this.addSubreddit({ name: name.toLowerCase() })
                        this.props.navigation.pop()
                    }
                    else {
                        Alert.alert(
                            "Invalid subreddit",
                            "No subreddit found, maybe check spelling?",
                            [
                                {
                                    text: "OK",
                                    onPress: () => console.log("Invalid Form")
                                }
                            ]
                        )
                    }
                })
                .catch(e => {
                    Alert.alert(
                        "Connection Error",
                        "There was an error connecting to Reddit.",
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("Invalid Form")
                            }
                        ]
                    )
                })
        }
    }

    // Add subreddit to the list
    addSubreddit = (sub: Subreddit) => {
        this.setState({
            subreddits: [...(this.state.subreddits), sub]
        })
    }

    // Show search form
    toggleSearch = () => {
        this.props.navigation.navigate('SearchForm', {
            searchSubreddit: this.handleSubreddit
        })
    }

    render() {
        // Show list of subreddits
        return (
            <View style={[defaults.all, defaults.color]}>
                <FlatList style={sub_styles.list}
                    key={'subs'}
                    renderItem={(obj) => this.renderSubreddit(obj.item)}
                    data={this.state.subreddits}
                    keyExtractor={(item: Subreddit) => item.name}
                />
                <View style={sub_styles.options_container}>
                    <FontAwesome.Button
                        name="search-plus"
                        onPress={this.toggleSearch}
                        backgroundColor='royalblue'
                        justifyContent='center'
                    >
                        ADD SUBREDDIT
                    </FontAwesome.Button>
                </View>
            </View>
        )
    }
}