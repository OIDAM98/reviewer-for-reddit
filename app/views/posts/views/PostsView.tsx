import React from 'react'

import { PostsProps, PostsState } from '../../../types/navigation';
import redditAPI from '../../../api/reddit'
import { Post } from '../../../types/primitives';
import PostCell from './PostCell';
import { View, ActivityIndicator, RefreshControl } from 'react-native';
import { defaults } from '../../styles';
import { FlatList } from 'react-native-gesture-handler';
import { Separator } from '../../Separator';

export default class PostsView extends React.Component<PostsProps, PostsState> {

    state: Readonly<PostsState> = {
        loading: false,
        beginning: true,
        refreshing: false,
        currentSub: this.props.route.params.currentSub || '',
        loggedIn: this.props.route.params.logged || false,
        currentPosts: []
    }

    componentWillMount() {
        this.setState({ loading: true })
        this.props.navigation.setOptions({ title: this.state.currentSub })
        if (this.state.loggedIn) {
            // Fetch saved posts from database

        }
        else {
            // Fetch list of posts from Reddit
            redditAPI.fetchPosts(this.state.currentSub, undefined)
                .then(posts => this.setState({
                    beginning: false,
                    loading: false,
                    currentPosts: posts
                }))
        }
    }

    getLastPost(): Post {
        return this.state.currentPosts[this.state.currentPosts.length - 1]
    }

    loadMorePosts() {
        redditAPI.fetchPosts(this.state.currentSub, this.getLastPost().name)
            .then(posts => this.setState({
                currentPosts: this.state.currentPosts.concat(posts)
            }))
    }

    renderFooter = () => {
        if (!this.state.loading) return null
        return (
            <ActivityIndicator />
        )
    }

    refreshView() {
        this.setState({ refreshing: true })
        redditAPI.fetchPosts(this.state.currentSub, undefined)
            .then(posts => {
                this.setState({
                    refreshing: false,
                    currentPosts: posts
                })
            })
    }

    renderPost = (item: Post) => <PostCell
        post={item}
        navigation={this.props.navigation}
    />

    render() {
        if (this.state.beginning && this.state.loading) {
            return (
                <View style={defaults.all}>
                    <ActivityIndicator size="large" color="00ff00"/>
                </View>)
        }
        return (
            <View style={defaults.all}>
                <FlatList
                    key={'posts'}
                    renderItem={(obj) => this.renderPost(obj.item)}
                    data={this.state.currentPosts}
                    keyExtractor={(item: Post) => item.name}
                    onEndReached={() => this.loadMorePosts()}
                    onEndReachedThreshold={0.5}
                    ItemSeparatorComponent={Separator}
                    ListFooterComponent={() => this.renderFooter()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.refreshView()}
                        />
                    }
                />
            </View>
        )
    }
}