import React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { sub_styles } from '../styles';
import { SearchProps, SearchState } from '../../types/navigation';

export default class SearchForm extends React.Component<SearchProps, SearchState> {
  state: Readonly<SearchState> = {
    toSearch: '',
    showProgress: false,
    validSub: false
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: 'Add Subreddit'})
  }

  subredditChanged = (toSearch: string) => {
    this.setState({ toSearch })
  }

  componentDidUpdate(prevProps: SearchProps, prevState: SearchState) {
    if (prevState.toSearch !== this.state.toSearch) {
      this.validateForm()
    }
  }

  validateForm = () => {
    if (/\s/.test(this.state.toSearch.trim())) this.setState({ validSub: false })
    else this.setState({ validSub: true })
  }

  handleSubmit = () => {
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

  searchSubreddit = () => {
    this.props.route.params.searchSubreddit(this.state.toSearch.trim())
  }


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
          <Button title="Search for subreddit" onPress={this.handleSubmit} color='royalblue' />
          <View style={{ margin: 10 }} />
          <Button title="Cancel" onPress={this.handleCancel} color='royalblue' />
        </View>
      </KeyboardAvoidingView>
    )
  }
}