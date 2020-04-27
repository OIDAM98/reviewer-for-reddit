import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SubredditsView from './app/views/subreddits/views/SubredditView'
import PostsView from './app/views/posts/views/PostsView'

const Stack = createStackNavigator();

export default class App extends React.Component {

  state = {
    currentView: 'subreddits',
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Subreddits" component={SubredditsView} />
          <Stack.Screen
            name="Posts"
            component={PostsView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
