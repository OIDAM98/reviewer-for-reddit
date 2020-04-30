import { UserPost, UserIdGet, SubredditGet, PostsGet, PostPut } from "../types/database/requests"
import { UserResponse, SubredditResponse, Success, PostResponse, Failure } from "../types/database/responses"
import { Post, Subreddit } from '../types/primitives'

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

async function post<T>(route: ValidPost, data: Object): Promise<T | Failure> {
    console.log(createPOST(data))
    const response = await fetch(`${baseURL}/${route}`, createPOST(data))
    console.log(response.status)
    console.log(response.body)
    if (response.ok) {
        const body = await response.json()
        return body
    }
    else {
        const err: Failure = await response.json()
        return err
    }
}

const addUser = async (username: string, password: string) => {
    const user: UserPost = { username, password }
    return post<UserResponse>('newUser', user)
}

const login = async (username: string, password: string) => {
    const user: UserIdGet = { username, password }
    return post<UserResponse>('login', user)
}

const getSubreddits = async (user_id: number) => {
    const user: SubredditGet = { id: user_id }
    const subs = await post<SubredditResponse[]>('subreddits', user)
    console.log(subs, typeof subs)
    if (!("status" in subs)) {
        const typed = (subs as Array<SubredditResponse>)
        if (typed.length > 0) {
            const subreddits: Subreddit[] = typed.map(sub => ({ name: sub.subreddit }))
            return subreddits
        }
        else return []
    } else {
        return subs as Failure
    }
}

const getPosts = async (user_id: number, subreddit: string) => {
    const subrequest: PostsGet = { user_id, subreddit }
    const postsresp = await post<PostResponse[]>('posts', subrequest)
    if (!("status" in postsresp)) {
        const typed = (postsresp as Array<PostResponse>)
        if (typed.length > 0) {
            const posts: Post[] = typed.map(p => transformToResponse(p))
            return posts
        }
        else return []
    }
    else {
        return postsresp as Failure
    }
}

const addPost = async (toadd: Post, user_id: number) => {
    const postreq: PostPut = transformToRequest(toadd, user_id)
    if (toadd.img && toadd.thumbnail) {
        return post<Success>('posts/add/image', postreq)
    }
    else {
        return post<Success>('posts/add', postreq)
    }
}

function transformToRequest(post: Post, user_id: number) {
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
    const final_img = img ? img : null
    const thumbnail_img = thumbnail?.img ? thumbnail.img : null;
    const thumbnail_width = thumbnail?.width ? thumbnail.width : null;
    const thumbnail_height = thumbnail?.height ? thumbnail.height : null;
    return ({
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
        img: final_img,
        thumbnail_img,
        thumbnail_width,
        thumbnail_height,
        user_id: user_id
    })
}

function transformToResponse(post: PostResponse) {
    const {
        img,
        thumbnail_img,
        thumbnail_width,
        thumbnail_height,
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
    const final_img = img ? img : undefined
    let thumbnail = undefined
    if (thumbnail_img && thumbnail_width && thumbnail_height) {
        thumbnail = {
            img: thumbnail_img,
            width: thumbnail_width,
            height: thumbnail_height
        }
    }

    return ({
        img: final_img,
        thumbnail,
        name,
        title,
        author,
        selftext,
        submition: new Date(submition),
        upvotes,
        comments,
        is_sticky,
        subreddit,
        permalink,
        saved: true
    })

}

export default {
    addUser,
    login,
    getSubreddits,
    getPosts,
    addPost
}