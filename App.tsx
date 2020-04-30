import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SubredditsView from './app/views/subreddits/SubredditView'
import PostsView from './app/views/posts/PostsView'
import PostInfoView from './app/views/post_details/PostInfoView'
import SearchForm from './app/views/subreddits/SearchForm';
import WebViewer from './app/views/web/WebViewer';
import LoginView from './app/views/login/LoginView';
import RegisterView from './app/views/login/RegisterView';

const Stack = createStackNavigator();

export default class App extends React.Component {

  state = {
    currentView: 'Login',
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
            name="Login"
            component={LoginView}
          />
          <Stack.Screen
            name="Register"
            component={RegisterView}
          />
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
          <Stack.Screen
            name="WebViewer"
            component={WebViewer}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
