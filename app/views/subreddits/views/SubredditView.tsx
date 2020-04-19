import { Subreddit } from '../Subreddit'
import { styles } from '../../../views/styles';

import React from 'react';
import SearchForm from './SearchForm'
import SubredditCell from './SubredditCell'

import { View, FlatList, Button } from 'react-native';


interface SubredditsState {
    subreddits: Array<Subreddit>,
    subredditSearch: string,
    showSearch: boolean
}

let id = 2
export default class SubredditsView extends React.Component<{}, SubredditsState> {
    state = {
        subreddits: [{ id: 1, name: 'Scala' }, { id: 2, name: 'Funny' }],
        subredditSearch: '',
        showSearch: false
    }

    showSubreddits = ({ item }: any) => <SubredditCell {...(item)} />

    handleSubredditChange = (sub: string) => {
        this.setState({ subredditSearch: sub })
    }

    searchSubreddit = (name: string | undefined) => {
        if (name) {
            id++
            this.addSubreddit({ id, name })
        }
    }

    addSubreddit = (sub: Subreddit) => {
        id++
        this.setState({
            showSearch: false,
            subreddits: [...(this.state.subreddits), sub]
        })
    }

    toggleSearch = () => {
        this.setState({ showSearch: true })
    }

    cancelSearch = () => {
        this.setState({ showSearch: false })
    }

    render() {
        if (this.state.showSearch) return <SearchForm
            searchSubreddit={this.searchSubreddit}
            cancelSearch={this.cancelSearch}
        />
        return (
            <View style={styles.all}>
                <FlatList style={[styles.all, styles.subreddits]}
                    key={'subs'}
                    renderItem={this.showSubreddits}
                    data={this.state.subreddits}
                    keyExtractor={(item) => item.id.toString()}
                />
                <Button title='Add subreddit' onPress={this.toggleSearch} />
            </View>
        )
    }
}