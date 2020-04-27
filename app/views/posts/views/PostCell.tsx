import { defaults, posts } from '../../styles';
import { Post } from '../../../types/primitives'

import { Text, View, Image } from 'react-native';

import React from 'react';
import { PostsNavProps } from '../../../types/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    post: Post,
    navigation: PostsNavProps
}

const PostInfo = ({ post, navigation }: Props) => {
    const { title, author, submition, upvotes, comments, is_sticky, subreddit } = post
    const showPostInfo = () => {
        navigation.navigate('PostInfo', {
            post: post
        })
    }
    return (
        <TouchableOpacity onPress={showPostInfo}>
            <View style={posts.content}>
                <Text style={posts.title}>{title}</Text>
                <View style={[posts.info, posts.distribute_content]}>
                    <Text style={posts.info_text}>{'/u/' + author}</Text>
                    <Text style={posts.info_text}>published: {submition.toDateString()}</Text>
                    <Text style={posts.info_text}>/r/{subreddit}</Text>
                </View>
                <View style={[posts.info, posts.distribute_content]}>
                    <Text style={posts.info_text}>{comments} comments</Text>
                    <Text style={posts.info_text}>{upvotes} score</Text>
                </View>
            </View>

        </TouchableOpacity>

    )
}


const PostCell = ({ post, navigation }: Props) => {
    if (post.thumbnail) {
        const width = post.thumbnail?.width
        const height = post.thumbnail?.height
        return (
            <View style={posts.with_image}>
                <Image
                    source={{ uri: post.thumbnail?.img }}
                    style={{ width, height }}
                />
                <PostInfo post={post} navigation={navigation} />
            </View>
        )
    }
    return (<PostInfo post={post} navigation={navigation} />)
}

export default PostCell;