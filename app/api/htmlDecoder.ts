// Replace all special characters that are inside an HTML
const replaceHTML = (str: string) => {
    return str
        .replace(/&#x2F;/g, '/')
        .replace(/&#x27;/g, '\'')
        .replace(/&quot;/g, '\"')
        .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)" rel="nofollow">(.*)?<\/a>/g, "$1")
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .replace(/<br(>|\s|\/)*/g, '\n')
        .replace(/\sclass="([^>]*)"/, '');
}

export {
    replaceHTML
}