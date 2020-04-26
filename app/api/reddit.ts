import { Post, Thumbnail } from "../types/primitives";

const baseUrl = 'https://www.reddit.com';
const jsonPostfix = '.json';

function formatToPost(jsonPost: any): Post {
    const { title,
        selftext,
        author,
        permalink,
        is_self,
        created_utc,
        stickied,
        num_comments,
        score,
        subreddit,
        thumbnail
    } = jsonPost
    if (is_self as boolean) {
        const post: Post = {
            img: undefined,
            thumbnail: undefined,
            title: title as string,
            author: author as string,
            selftext: selftext as string,
            submition: new Date(created_utc as number),
            upvotes: score as number,
            comments: num_comments as number,
            is_sticky: stickied as boolean,
            subreddit: subreddit as string,
            permalink: permalink as string,
            saved: false
        }
        return post
    }
    else {
        const pre_thumb = thumbnail as string
        let width: number | undefined = undefined
        let height: number | undefined = undefined
        let thumb_img: string | undefined = undefined
        if (pre_thumb || pre_thumb !== "self") {
            width = jsonPost.thumbnail_width as number
            height = jsonPost.thumbnail_height as number
            thumb_img = pre_thumb
        }
        let thumbnail_obj: Thumbnail | undefined = undefined
        if (thumb_img !== undefined) {
            thumbnail_obj = {
                width: width!,
                height: height!,
                img: thumb_img!
            }
        }
        const img = jsonPost.url as string
        const post: Post = {
            img: img,
            thumbnail: thumbnail_obj,
            title: title as string,
            author: author as string,
            selftext: selftext as string,
            submition: new Date(created_utc as number),
            upvotes: score as number,
            comments: num_comments as number,
            is_sticky: stickied as boolean,
            subreddit: subreddit as string,
            permalink: permalink as string,
            saved: false
        }
        return post

    }
}

function getPosts(response: any): Array<Post> {
    const data: Array<any> = response.data
    return data.map((jsonPost: any) => formatToPost(jsonPost))
}

const fetchPosts = async (subreddit: string) => {
    const response = await fetch(`${baseUrl}/r/${subreddit}/${jsonPostfix}`)
    const json = await response.json()
    const posts = getPosts(json)
    return posts
}

export default {
    fetchPosts
}