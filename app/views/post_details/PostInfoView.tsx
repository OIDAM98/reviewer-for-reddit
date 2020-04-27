
import React from 'react'
import { PostInfoProps, PostInfoState } from '../../types/navigation';
import { View, Text } from 'react-native';
import PostDetail from './PostDetails';
import { post_detail, defaults } from '../styles';
import { FontAwesome } from '@expo/vector-icons';

export default class PostInfoView extends React.Component<PostInfoProps, PostInfoState> {
    state: Readonly<PostInfoState> = {
        post: this.props.route.params.post
    }

    componentDidMount() {
        this.props.navigation.setOptions({ title: this.state.post.subreddit })
    }

    render() {
        return (
            <View style={post_detail.view}>
                <Text style={post_detail.title}>
                    {this.state.post.title}
                </Text>
                <PostDetail post={this.state.post} />
                <View style={[defaults.center, post_detail.button_container]}>
                    <FontAwesome.Button
                        name="comments"
                        size={24}
                        onPress={() => { }}
                        backgroundColor='royalblue'
                    >
                        {'View Comments'+ (this.state.post.img ? ' and Multimedia' : '')}
                    </FontAwesome.Button>
                </View>
            </View>
        )
    }
}