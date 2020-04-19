import React from 'react';
import { Text, View } from 'react-native';
import {styles} from './app/views/styles';
import SubredditsView from './app/views/subreddits/views/SubredditView'

export default class App extends React.Component {

  state = {
    currentView: 'subreddits',
  }

  render() {
    return (
      <View style={styles.container}>
        {
          (this.state.currentView === 'subreddits') ?
            <SubredditsView />
            :
            <Text>Open up App.tsx to start working on your app!</Text>

        }

      </View>
    );
  }
}
