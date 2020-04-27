import { posts } from '../styles';
import { Post } from '../../types/primitives'

import { Text, View, Image } from 'react-native';

import React from 'react';
import { PostsNavProps } from '../../types/navigation';
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
    const time = submition.toLocaleTimeString()
    const submitionStr = submition.toLocaleDateString() + ' at ' + time.substring(0, time.length - 3)
    return (
        <TouchableOpacity onPress={showPostInfo}>
            <View style={posts.content}>
                <Text style={[posts.title, { color: is_sticky ? 'royalblue' : 'black' }]}>{title}</Text>
                <View style={posts.info}>
                    <Text style={posts.info_text}>{'/u/' + author}</Text>
                </View>
                <View style={posts.info}>
                    <Text style={posts.info_text}>/r/{subreddit}</Text>
                    <Text style={posts.info_text}>published: {submitionStr}</Text>
                </View>
                <View style={posts.info}>
                    <Text style={posts.info_text}>{comments} comments</Text>
                    <Text style={posts.info_text}>{upvotes} pts.</Text>
                </View>
            </View>

        </TouchableOpacity>

    )
}


const PostCell = ({ post, navigation }: Props) => {
    if (post.thumbnail != undefined) {
        const width = post.thumbnail?.width * 1.2
        const height = post.thumbnail?.height * 1.2
        return (
            <View style={posts.with_image}>

                <PostInfo post={post} navigation={navigation} />
                <View style={{ alignSelf: "center", paddingTop: 15 }}>
                    <Image
                        source={{ uri: post.thumbnail!.img }}
                        style={{ width, height, }}
                    />

                </View>
            </View>
        )
    }
    return (<PostInfo post={post} navigation={navigation} />)
}

export default PostCell;