import React from 'react'

import { PostsProps, PostsState } from '../../types/navigation';
import redditAPI from '../../api/reddit'
import { Post } from '../../types/primitives';
import PostCell from './PostCell';
import { View, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { defaults } from '../styles';
import { FlatList } from 'react-native-gesture-handler';
import { Separator } from '../Separator';
import database from '../../api/database';

export default class PostsView extends React.Component<PostsProps, PostsState> {

    state: Readonly<PostsState> = {
        loading: false,
        beginning: true,
        refreshing: false,
        currentSub: this.props.route.params.currentSub || '',
        userID: this.props.route.params.userID || -1,
        currentPosts: [],
        offline: false
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.props.navigation.setOptions({ title: this.state.currentSub })

        // Fetch list of posts from Reddit
        redditAPI.fetchPosts(this.state.currentSub, undefined)
            .then(posts => this.setState({
                beginning: false,
                loading: false,
                currentPosts: posts
            }))

    }

    savePost = (post: Post) => {
        if (post.saved) {
            Alert.alert(
                "Post saved",
                "Post is already saved to view offline",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("Try to unsave post")
                    }
                ]
            )
        }
        else {
            database.addPost(post, this.state.userID)
                .then(res => {
                    const saved = { ...post, saved: true }
                    const newState = this.state.currentPosts.map(post => {
                        if (post.name !== saved.name) return post
                        return saved
                    })
                    this.setState({ currentPosts: [...newState] })
                })
                .catch(err => {
                    Alert.alert(
                        "Error saving post",
                        err.message,
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("Error saving post")
                            }
                        ]
                    )
                })
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
        save={this.savePost}
    />

    render() {
        if (this.state.beginning && this.state.loading) {
            return (
                <View style={defaults.all}>
                    <ActivityIndicator size="large" color="lightsteelblue" />
                </View>)
        }
        return (
            <View style={[defaults.all, defaults.color]}>
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