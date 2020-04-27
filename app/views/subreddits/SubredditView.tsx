import { Subreddit } from '../../types/primitives'
import { SubredditsProps, SubredditsState } from '../../types/navigation';
import { sub_styles, defaults } from '../styles';

import React from 'react';
import SearchForm from './SearchForm'
import SubredditCell from './SubredditCell'

import { View, FlatList, Alert } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import reddit from '../../api/reddit';

const DEFAUL_SUBS: Array<Subreddit> =
    ['frontpage', 'all', 'funny', 'cooking', 'aww', 'nextfuckinglevel', 'beamazed', 'programming']
        .map(name => ({ name }))

export default class SubredditsView extends React.Component<SubredditsProps, SubredditsState> {
    state: Readonly<SubredditsState> = {
        logged: false,
        subreddits: [],
        showSearch: false
    }

    // Load user's subreddits or load defaults
    componentDidMount() {
        if (this.state.logged) {
            // Fetch subreddits from the DB

        }
        else {
            //const subreddits 
            this.setState({ subreddits: DEFAUL_SUBS })
        }
    }

    // Function to load subreddits into the list, creating cell for each one
    renderSubreddit = (item: Subreddit) => <SubredditCell
        name={item.name}
        navigation={this.props.navigation}
        logged={this.state.logged}
    />

    // Search subreddit in Reddit
    // If found, then add it and notify user
    // Else, notify it couldn't be added
    handleSubreddit = (name: string | undefined) => {
        if (name) {
            reddit.searchSubreddit(name.toLowerCase())
                .then(found => {
                    if (found) {
                        this.addSubreddit({ name })
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
            showSearch: false,
            subreddits: [...(this.state.subreddits), sub]
        })
    }

    // Show search form
    toggleSearch = () => {
        this.setState({ showSearch: true })
    }

    // Hide search form
    hideSearch = () => {
        this.setState({ showSearch: false })
    }

    render() {
        // Show search form if needed
        if (this.state.showSearch)
            return <SearchForm
                searchSubreddit={this.handleSubreddit}
                cancelSearch={this.hideSearch}
            />
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