import { defaults, posts } from '../../styles';
import { Post } from '../../../types/primitives'

import { Text, View, Image } from 'react-native';

import React from 'react';

const PostInfo = ({ title, author, submition, upvotes, comments, is_sticky, subreddit }: Post) => {
    return (
        <View>
            <Text>{title}</Text>
            <View>
                <Text>{'/u/' + author}</Text>
                <Text>{submition}</Text>
                <Text>{subreddit}</Text>
            </View>
            <View>
                <Text>{comments}</Text>
                <Text>{upvotes}</Text>
            </View>
        </View>

    )
}

type Props = {
    post: Post
}

const PostCell = ({ post }: Props) => {
    const width = post.thumbnail?.width
    const height = post.thumbnail?.height
    if (post.thumbnail) return (
        <View>
            <Image
                source={{ uri: post.thumbnail?.img }}
                style={{ width, height }}
            />
            <PostInfo
                {...post}
            />
        </View>
    )
    return (<PostInfo {...post} />)
}

export default PostCell;