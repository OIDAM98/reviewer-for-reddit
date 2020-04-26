import React from 'react'

import { PostsProps, PostsState } from '../../../types/navigation';
import redditAPI from '../../../api/reddit'
import { Post } from '../../../types/primitives';
import PostCell from './PostCell';
import { View } from 'react-native';
import { defaults } from '../../styles';
import { FlatList } from 'react-native-gesture-handler';

export default class PostsView extends React.Component<PostsProps, PostsState> {
    state = {
        currentSub: this.props.route.params.currentSub || '',
        loggedIn: this.props.route.params.logged || false,
        currentPosts: []
    }

    componentDidMount() {
        if (this.state.loggedIn) {
            // Fetch saved posts from database

        }
        else {
            // Fetch list of posts from Reddit
            redditAPI.fetchPosts(this.state.currentSub)
                .then(posts => this.setState({ currentPosts: posts }))
        }
    }

    renderPost = (item: Post) => <PostCell
        post={item}
        navigation={this.props.navigation}
    />

    render() {
        return (
            <View style={defaults.all}>
                <FlatList
                    key={'posts'}
                    renderItem={(obj) => this.renderPost(obj.item)}
                    data={this.state.currentPosts}
                    keyExtractor={(item: Post) => item.title}
                />
            </View>
        )
    }
}