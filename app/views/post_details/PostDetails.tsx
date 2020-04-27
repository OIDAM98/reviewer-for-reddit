import React from 'react'
import { View, Text, ScrollView } from 'react-native';
import { Post } from '../../types/primitives';
import { post_detail } from '../styles';
import { Separator } from '../Separator';

type Props = {
    post: Post
}

const PostDetail = ({ post }: Props) => {
    const time = post.submition.toLocaleTimeString()
    const submitionStr = post.submition.toLocaleDateString() + ' at ' + time.substring(0, time.length - 3)
    return (
        <View style={post_detail.content}>
            {
                post.selftext != '' ?
                    (
                        <View style={post_detail.scroll}>
                            <ScrollView style={post_detail.scroll_content}>
                                <Text>
                                    {post.selftext}
                                </Text>
                            </ScrollView>
                            <Separator />
                        </View>

                    )
                    : null
            }
            <View style={post_detail.info}>
                <Text style={post_detail.info_text}>
                    /u/{post.author}
                </Text>
                <Text style={post_detail.info_text}>
                    /r/{post.subreddit}
                </Text>
            </View>
            <Separator />

            <View style={post_detail.info}>
                <Text style={post_detail.info_text}>
                    published: {submitionStr}
                </Text>
            </View>
            <Separator />
            <View style={post_detail.info}>
                <Text style={post_detail.info_text}>
                    {post.comments} comments
                    </Text>
                <Text style={post_detail.info_text}>
                    {post.upvotes} pts.
                    </Text>
            </View>
        </View>
    )
}

export default PostDetail