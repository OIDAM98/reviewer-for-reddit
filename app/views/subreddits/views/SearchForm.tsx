import React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { styles } from '../../styles';

interface SearchState {
  toSearch: string,
  showProgress: boolean,
  validSub: boolean
}

interface SearchProps {
  searchSubreddit: Function,
  cancelSearch: Function
}

export default class SearchForm extends React.Component<SearchProps, SearchState> {
  state = {
    toSearch: '',
    showProgress: false,
    validSub: false
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
    this.props.searchSubreddit(this.state.toSearch.trim())
  }


  handleCancel = () => {
    this.setState({ showProgress: false })
    this.props.cancelSearch()
  }

  render() {
    return (
      <KeyboardAvoidingView style={[styles.all, styles.searchContainer]}>
        <Text>This subreddit will be seached in the Reddit platform</Text>
        <TextInput
          style={styles.searchText}
          onChangeText={this.subredditChanged}
          value={this.state.toSearch} />
        <View style={[styles.progress, styles.progress, { opacity: this.state.showProgress ? 100 : 0 }]} >
          <Text>Searching...</Text>
          <ActivityIndicator color="#0000ff" />
        </View>
        <Button title="Search for subreddit" onPress={this.handleSubmit} />
        <Button title="Cancel" onPress={this.handleCancel} />
      </KeyboardAvoidingView>
    )
  }
}