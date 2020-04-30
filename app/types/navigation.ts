import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Post, Subreddit } from './primitives'

export type RootParams = {
    Login: undefined,
    Register: undefined,
    Subreddits: { userid: number },
    Posts: { currentSub: string, userID: number },
    PostInfo: { post: Post },
    SearchForm: { searchSubreddit: Function },
    WebViewer: { url: string }
}

// Login View Props and State

export type LoginNavProps = StackNavigationProp<RootParams, 'Login'>
type LoginRouteProps = RouteProp<RootParams, 'Login'>

export type LoginProps = {
    route: LoginRouteProps,
    navigation: LoginNavProps,
}

export type LoginState = {
    username: string,
    password: string,
    validState: boolean,
    showProgress: boolean
}

// Register View Props and State

export type RegisterNavProps = StackNavigationProp<RootParams, 'Register'>
type RegisterRouteProps = RouteProp<RootParams, 'Register'>

export type RegisterProps = {
    route: RegisterRouteProps,
    navigation: RegisterNavProps,
}

export type RegisterState = {
    username: string,
    password: string,
    validState: boolean,
    showProgress: boolean
}

// Subreddits View Props and State

export type SubredditsNavProps = StackNavigationProp<RootParams, 'Subreddits'>
type SubredditsRouteProps = RouteProp<RootParams, 'Subreddits'>

export type SubredditsProps = {
    route: SubredditsRouteProps,
    navigation: SubredditsNavProps,
}

export type SubredditsState = {
    userID: number,
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
    userID: number,
    currentPosts: Array<Post>,
    offline: boolean
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

// Web Viewer Props and State

export type WebNavProps = StackNavigationProp<RootParams, 'WebViewer'>
type WebRouteProps = RouteProp<RootParams, 'WebViewer'>

export type WebProps = {
    route: WebRouteProps,
    navigation: WebNavProps,
}

export type WebState = {
    url: string
}