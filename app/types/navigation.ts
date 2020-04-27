import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Post, Subreddit } from './primitives'

export type RootParams = {
    Subreddits: undefined,
    Posts: { currentSub: string, logged: boolean },
    PostInfo: { post: Post },
    SearchForm: { searchSubreddit: Function }
}

// Subreddits View Props and State

export type SubredditsNavProps = StackNavigationProp<RootParams, 'Subreddits'>
type SubredditsRouteProps = RouteProp<RootParams, 'Subreddits'>

export type SubredditsProps = {
    route: SubredditsRouteProps,
    navigation: SubredditsNavProps,
}

export type SubredditsState = {
    logged: boolean,
    subreddits: Array<Subreddit>,
}

// Seach From Props and State

export type SearchNavProps = StackNavigationProp<RootParams, 'SearchForm'>
type SearchRouteProps = RouteProp<RootParams, 'SearchForm'>

export type SearchProps = {
    route: SearchRouteProps,
    navigation: SearchNavProps,
}

export type SearchState = {
    toSearch: string,
    showProgress: boolean,
    validSub: boolean
}

// Posts View Props and State

export type PostsNavProps = StackNavigationProp<RootParams, 'Posts'>
type PostsRouteProps = RouteProp<RootParams, 'Posts'>

export type PostsProps = {
    route: PostsRouteProps,
    navigation: PostsNavProps,
}

export type PostsState = {
    loading: boolean,
    beginning: boolean,
    refreshing: boolean,
    currentSub: string,
    loggedIn: boolean,
    currentPosts: Array<Post>
}

// Post Info View Props and State
export type PostInfoNavProps = StackNavigationProp<RootParams, 'PostInfo'>
type PostInfoRouteProps = RouteProp<RootParams, 'PostInfo'>

export type PostInfoProps = {
    route: PostInfoRouteProps,
    navigation: PostInfoNavProps,
}

export type PostInfoState = {
    post: Post
}