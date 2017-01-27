import { WEB_ARTICLE } from "./../actions/DisplayArticleActions";

export function selectedWebArticle(state = "", action = {}) {
    switch (action.type) {
    case WEB_ARTICLE: {
        return action.article;
    }
    default: return state;
    }
}