import { posts, defaults } from '../styles';
import { Post } from '../../types/primitives'

import { Text, View, Image } from 'react-native';

import React from 'react';
import { PostsNavProps } from '../../types/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesome } from '@expo/vector-icons';

// Arguments that component will receive
type Props = {
    post: Post,
    navigation: PostsNavProps,
    save: Function
}

// Component that will represent a post inside the Posts Screen
const PostInfo = ({ post, navigation, save }: Props) => {
    const { title, author, submition, upvotes, comments, is_sticky, subreddit } = post
    const showPostInfo = () => {
        navigation.navigate('PostInfo', {
            post: post
        })
    }
    const time = submition.toLocaleTimeString()
    const submitionStr = submition.toLocaleDateString() + ' at ' + time.substring(0, time.length - 3)
    const width = post.thumbnail?.width ? post.thumbnail?.width * 1.2 : 0
    const height = post.thumbnail?.height ? post.thumbnail.height * 1.2 : 0
    return (
        <View>
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
                    {
                        (post.thumbnail != undefined) ?
                            <View style={{ alignSelf: "center", paddingTop: 15 }}>
                                <Image
                                    source={{ uri: post.thumbnail!.img }}
                                    style={{ width, height, }}
                                />

                            </View>
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
            <View style={posts.save_button}>
                <FontAwesome.Button
                    name={post.saved ? "star" : "star-o"}
                    onPress={() => save(post)}
                    backgroundColor='white'
                    color='royalblue'
                    justifyContent='center'
                    size={30}
                />
            </View>
        </View>

    )
}


const PostCell = ({ post, navigation, save }: Props) => {
    return (
        <View style={posts.cell}>
            <PostInfo post={post} navigation={navigation} save={save} />
        </View>
    )
}

export default PostCell;