import { Button } from 'react-native';
import { SubredditsNavProps } from '../../../types/navigation';
import React from 'react';

type Props = {
    name: string,
    navigation: SubredditsNavProps,
    logged: boolean
}

const SubredditCell = ({name, navigation, logged}: Props) => {
    const showList = () => {
        navigation.navigate('Posts', {
            currentSub: name,
            logged: logged
        })
    }
    return (<Button title={name} onPress={showList}/>)
}

export default SubredditCell