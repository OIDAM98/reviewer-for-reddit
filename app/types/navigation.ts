import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Post } from './primitives'

export type RootParams = {
    Subreddits: undefined,
    Posts: { currentSub: string },
    PostInfo: { post: Post }
}

export type SubredditsNavProps = StackNavigationProp<RootParams, 'Subreddits'>
type SubredditsRouteProps = RouteProp<RootParams, 'Subreddits'>

export type SubredditsProps = {
    route: SubredditsRouteProps,
    navigation: SubredditsNavProps,
}