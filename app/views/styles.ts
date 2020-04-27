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
    backgroundColor: 'lightsteelblue'
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'royalblue',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 30
  },
  text: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
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
    padding: 5
  },
  content: {
    justifyContent: "center",
    alignItems: "stretch",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 10
  },
  info_text: {
    fontSize: 12,
    padding: 5,
    textAlign: "left"
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
    marginTop: 5,
    marginBottom: 3,
    marginHorizontal: 10
  },
  indicator: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignContent: "center"
  }
})
