import { UserPost, UserIdGet, SubredditGet, SubredditPost, PostsGet, PostPut, PostImagePut } from "../types/database/requests"
import { User, Subreddit, Success, PostResponse } from "../types/database/responses"
import { Post } from '../types/primitives'

const baseURL = 'https://reviewer-database.herokuapp.com'
type ValidPost = 'newUser' | 'login' | 'subreddits' | 'subreddits/add' | 'posts' | 'posts/add' | 'posts/add/image'
const createPOST = (data: Object): RequestInit => {
    return ({
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
}

async function post<T>(route: ValidPost, data: Object): Promise<T> {
    const response = await fetch(`${baseURL}/${route}`, createPOST(data))
    const body = await response.json()
    return body
}

const addUser = async (username: string, password: string) => {
    const user: UserPost = { username, password }
    return post<User[]>('newUser', user)
}

const login = async (username: string, password: string) => {
    const user: UserIdGet = { username, password }
    return post<User[]>('login', user)
}

const getSubreddits = async (user_id: number) => {
    const user: SubredditGet = { id: user_id }
    return post<Subreddit[]>('subreddits', user)
}

const addSubreddit = async (user_id: number, subname: string) => {
    const subreddit: SubredditPost = { id: user_id, subreddit: subname }
    return post<Success>('subreddits/add', subreddit)
}

const getPosts = async (sub_id: number) => {
    const subreddit: PostsGet = { subreddit_id: sub_id }
    return post<PostResponse[]>('posts', subreddit)
}

const addPost = async (toadd: Post, sub_id: number) => {
    if (toadd.img && toadd.thumbnail) {
        const postreq: PostImagePut = transformToImageRequest(toadd, sub_id)
        return post<Success>('posts/add/image', postreq)
    }
    else {
        const postreq: PostPut = transformToRequest(toadd, sub_id)
        return post<Success>('posts/add', postreq)
    }
}

function transformToRequest(post: Post, subreddit_id: number) {
    const {
        name,
        title,
        author,
        selftext,
        submition,
        upvotes,
        comments,
        is_sticky,
        subreddit,
        permalink
    } = post
    return ({
        subreddit_id,
        name,
        title,
        author,
        selftext,
        submition: submition.getTime(),
        upvotes,
        comments,
        is_sticky,
        subreddit,
        permalink
    })
}
function transformToImageRequest(post: Post, subreddit_id: number) {
    const {
        name,
        title,
        author,
        selftext,
        submition,
        upvotes,
        comments,
        is_sticky,
        subreddit,
        permalink,
        img,
        thumbnail
    } = post
    return ({
        subreddit_id,
        name,
        title,
        author,
        selftext,
        submition: submition.getTime(),
        upvotes,
        comments,
        is_sticky,
        subreddit,
        permalink,
        img,
        thumbnail_img: thumbnail.img,
        thumbnail_width: thumbnail.width,
        thumbnail_height: thumbnail.height
    })
}

export default {
    addUser,
    login,
    getSubreddits,
    addSubreddit,
    getPosts,
    addPost
}