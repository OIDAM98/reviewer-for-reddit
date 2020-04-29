// USERS

export type UserPost  = {
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

export type SubredditPost = {
    id: number,
    subreddit: string
}

// POSTS

export type PostsGet = {
    subreddit_id: number
}

export type PostPut = {
    subreddit_id: number,
    name: string,
    title: string,
    author: string,
    selftext: string,
    submition: number,
    upvotes: number,
    comments: number,
    is_sticky: boolean,
    subreddit: string,
    permalink: string
}

export type PostImagePut = {
    subreddit_id: number,
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
    img: string,
    thumbnail_img: string,
    thumbnail_width: number,
    thumbnail_height: number
}