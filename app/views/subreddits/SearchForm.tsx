import React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { sub_styles } from '../styles';
import { SearchProps, SearchState } from '../../types/navigation';

// Screen that allows user to add a subreddit to its list
export default class SearchForm extends React.Component<SearchProps, SearchState> {
  state: Readonly<SearchState> = {
    toSearch: '',
    showProgress: false,
    validSub: false
  }

  componentDidMount() {
    // Sets the title of the screen
    this.props.navigation.setOptions({ title: 'Add Subreddit' })
  }

  subredditChanged = (toSearch: string) => {
    this.setState({ toSearch })
  }

  // This function is called when the state of the component is changed and will reload
  componentDidUpdate(prevProps: SearchProps, prevState: SearchState) {
    // Ensuring that the state is not the same as the previous one
    // This happens if the screen is idle, so performing this every tick will slow down the app
    if (prevState.toSearch !== this.state.toSearch) {
      this.validateForm()
    }
  }

  // Assures that entered subreddit doesnt have whitespaces as Reddit doesnt allow them
  validateForm = () => {
    // If entered subreddit has whitespaces
    if (/\s/.test(this.state.toSearch.trim())) this.setState({ validSub: false })
    else this.setState({ validSub: true })
  }

  // Prompts the searching of the specified subreddit
  handleSubmit = () => {
    // If the user has entered a valid subreddit
    if (this.state.validSub) {
      this.setState({ showProgress: true })
      this.searchSubreddit()
    }
    else {
      Alert.alert(
        "Invalid subreddit",
        "Subreddit cannot contain whitespace characters.",
        [
          {
            text: "OK",
            onPress: () => console.log("Invalid Form")
          }
        ]
      )
    }
  }

  // Searches for the entered subreddit
  searchSubreddit = () => {
    this.props.route.params.searchSubreddit(this.state.toSearch.trim())
  }

  // If the user clicks cancel then it returns to the Screen with List of Subreddits
  handleCancel = () => {
    this.setState({ showProgress: false })
    this.props.navigation.pop()
  }

  render() {
    return (
      <KeyboardAvoidingView style={sub_styles.search_container}>
        <Text>This subreddit will be seached in the Reddit platform</Text>
        <View style={{ margin: 10 }} />
        <TextInput
          style={sub_styles.search_text}
          onChangeText={this.subredditChanged}
          value={this.state.toSearch}
          autoCapitalize='none'
        />
        <View style={[sub_styles.progress, sub_styles.progress, { opacity: this.state.showProgress ? 100 : 0 }]} >
          <Text>Searching...</Text>
          <ActivityIndicator color="#0000ff" />
        </View>
        <View style={sub_styles.options_container}>
          <Button title="Add subreddit" onPress={this.handleSubmit} color='royalblue' />
          <View style={{ margin: 10 }} />
          <Button title="Cancel" onPress={this.handleCancel} color='royalblue' />
        </View>
      </KeyboardAvoidingView>
    )
  }
}