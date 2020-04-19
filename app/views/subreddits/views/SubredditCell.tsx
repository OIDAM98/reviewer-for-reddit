import { styles } from '../../styles';
import { Text, View } from 'react-native';
import {Subreddit} from '../Subreddit'

import React from 'react';


const SubredditCell = ({ id, name }: Subreddit) => {
    return (<View style={[styles.all, styles.subreddit]}>
        <Text style={styles.text}>{id}</Text>
        <Text style={styles.text}>{name}</Text>
    </View>)
}

export default SubredditCell