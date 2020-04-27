import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SubredditsView from './app/views/subreddits/SubredditView'
import PostsView from './app/views/posts/PostsView'
import PostInfoView from './app/views/post_details/PostInfoView'
import SearchForm from './app/views/subreddits/SearchForm';

const Stack = createStackNavigator();

export default class App extends React.Component {

  state = {
    currentView: 'subreddits',
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'royalblue'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        >
          <Stack.Screen
            name="Subreddits"
            component={SubredditsView}
          />
          <Stack.Screen 
            name="SearchForm"
            component={SearchForm}
          />
          <Stack.Screen
            name="Posts"
            component={PostsView}
          />
          <Stack.Screen
            name="PostInfo"
            component={PostInfoView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
