import { StyleSheet } from 'react-native'
import Constants from 'expo-constants';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  all: {
    flex: 1
  },
  subreddits: {
    backgroundColor: 'gray'
  },
  subreddit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'cyan'
  },
  text: {
    fontSize: 20
  },
  progress_one: {
    flex: 1,
    justifyContent: 'center'
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  searchText: {
    padding: 1,
    borderWidth: 1,
    borderColor: 'cyan'
  },
  searchContainer: {
    padding: 20,
    margin: 10,
    justifyContent: 'center'
  }
});
