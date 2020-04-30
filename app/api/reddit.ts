import { Post, Thumbnail } from "../types/primitives";
import { replaceHTML } from "./htmlDecoder";

// URL of Reddit
const baseUrl = 'https://www.reddit.com';
// This postfix allows to receive JSONS from Reddit
const jsonPostfix = '.json';

// Converts a Reddit Response to a Post
function formatToPost(jsonPost: any): Post {
    const {
        title,
        name,
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
    // Is the post is selftext
    if (is_self as boolean) {
        // As post is selftext, it doesnot contain image or thumbnail
        const post: Post = {
            img: undefined,
            thumbnail: undefined,
            name: name as string,
            title: replaceHTML(title as string),
            author: author as string,
            selftext: replaceHTML(selftext as string),
            submition: new Date((created_utc as number) * 1000),
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
        // If response contains the URL of the thumbnail
        if (pre_thumb || pre_thumb !== "self") {
            const pre_width = jsonPost.thumbnail_width as number
            const pre_height = jsonPost.thumbnail_height as number
            width = !isNaN(pre_width) ? pre_width : undefined
            height = !isNaN(pre_height) ? pre_height : undefined
            thumb_img = pre_thumb
        }
        let thumbnail_obj: Thumbnail | undefined = undefined
        // If the thumbnail parameters were created successfully
        if (thumb_img && width && height && thumb_img) {
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
            name: name as string,
            title: replaceHTML(title as string),
            author: author as string,
            selftext: replaceHTML(selftext as string),
            submition: new Date((created_utc as number) * 1000),
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

// Gets posts from a response
function getPosts(response: any): Array<Post> {
    const data: Array<any> = response.data.children
    return data
        .map(json => json.data)
        .map((jsonPost: any) => formatToPost(jsonPost))
}

// Fetch posts from a specified subreddit
// The after parameter is used for 'Unlimited' swipping in the PostsView
const fetchPosts = async (subreddit: string, after: string | undefined) => {
    let url = `${baseUrl}/r/${subreddit}/${jsonPostfix}`
    if (after != undefined) {
        url = url + `?after=${after}`
    }
    const response = await fetch(url)
    const json = await response.json()
    const posts = getPosts(json)
    return posts
}

// Searches for a subreddit in Reddit
const searchSubreddit = async (subreddit: string) => {
    const url = `${baseUrl}/subreddits/search/${jsonPostfix}?q=${subreddit}`
    const response = await fetch(url)
    const json = await response.json()
    const data = json.data.children
    const subreddits: Array<string> = data.map((json: any) => json.data.display_name as string)
    return subreddits.some(sub => sub.toLowerCase() == subreddit)
}

export default {
    fetchPosts,
    searchSubreddit
}