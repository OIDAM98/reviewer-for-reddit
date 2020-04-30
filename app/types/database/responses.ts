// Types of the Responses from the Database
// Made to comply types in application

export interface SubredditResponse {
    subreddit: string
}

export interface PostResponse {
    img: string | null,
    thumbnail_img: string | null,
    thumbnail_width: number | null,
    thumbnail_height: number | null,
    name: string,
    title: string,
    author: string,
    selftext: string,
    submition: string,
    upvotes: number,
    comments: number,
    is_sticky: boolean,
    subreddit: string,
    permalink: string
}

export interface UserResponse {
    id: number
}

export type Success = {
    status: string
}

export type Failure = {
    status: string,
    message: string
}