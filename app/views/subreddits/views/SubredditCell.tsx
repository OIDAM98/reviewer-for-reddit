import { Button } from 'react-native';
import { SubredditsNavProps } from '../../../types/navigation';
import React from 'react';

type Props = {
    name: string,
    navigation: SubredditsNavProps
}

const SubredditCell = ({name, navigation}: Props) => {
    const showList = () => {
        navigation.navigate('Posts', {
            currentSub: name
        })
    }
    return (<Button title={name} onPress={showList}/>)
}

export default SubredditCell