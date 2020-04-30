// Types to comply database requests

// USERS

export type UserPost = {
    username: string,
    password: string
}

export type UserIdGet = {
    username: string,
    password: string
}

// SUBREDDITS

export type SubredditGet = {
    id: number
}

// POSTS

export type PostsGet = {
    subreddit: string,
    user_id: number
}

export type PostPut = {
    name: string,
    title: string,
    author: string,
    selftext: string,
    submition: number,
    upvotes: number,
    comments: number,
    is_sticky: boolean,
    subreddit: string,
    permalink: string,
    img: string | null,
    thumbnail_img: string | null,
    thumbnail_width: number | null,
    thumbnail_height: number | null,
    user_id: number
}