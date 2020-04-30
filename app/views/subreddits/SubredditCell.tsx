import { Text, View, TouchableOpacity } from 'react-native';
import { SubredditsNavProps } from '../../types/navigation';
import React from 'react';
import { sub_styles } from '../styles';

// Elements that component will receive
type Props = {
    name: string,
    navigation: SubredditsNavProps,
    userId: number
}

// Component of Subreddits inside the list for user
const SubredditCell = ({ name, navigation, userId }: Props) => {
    // Function that shows posts of this subreddit
    // Navigates to the Posts Screen
    const showList = () => {
        navigation.navigate('Posts', {
            currentSub: name.toLowerCase(),
            userID: userId
        })
    }
    return (
        <TouchableOpacity onPress={showList}>
            <View style={sub_styles.cell}>
                <Text style={sub_styles.text}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SubredditCell