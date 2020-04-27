import { Text, View, TouchableOpacity } from 'react-native';
import { SubredditsNavProps } from '../../../types/navigation';
import React from 'react';
import { sub_styles } from '../../styles';

type Props = {
    name: string,
    navigation: SubredditsNavProps,
    logged: boolean
}

const SubredditCell = ({ name, navigation, logged }: Props) => {
    const showList = () => {
        navigation.navigate('Posts', {
            currentSub: name,
            logged: logged
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