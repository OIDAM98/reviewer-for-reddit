import { StyleSheet } from 'react-native'
import Constants from 'expo-constants';

export const defaults = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  all: {
    flex: 1
  }
});

export const sub_styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: 'gray'
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'cyan',
    justifyContent: 'center',
    padding: 15,
    margin: 10
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
  search_text: {
    padding: 1,
    borderWidth: 1,
    borderColor: 'cyan'
  },
  search_container: {
    flex: 1,
    padding: 20,
    margin: 10,
    justifyContent: 'center'
  },
  options_container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10
  },
  button_container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
});

export const posts = StyleSheet.create({
  with_image: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  content: {
    flex: 4,
    justifyContent: "center",
    alignItems: "stretch"
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexShrink: 0.8
  },
  info_text: {
    fontStyle: "italic",
    fontSize: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 14
  },
  indicator: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignContent: "center"
  }
})
