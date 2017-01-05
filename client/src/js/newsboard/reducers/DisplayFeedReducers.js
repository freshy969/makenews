import {
    PAGINATED_FETCHED_FEEDS,
    NEWSBOARD_CURRENT_TAB,
    CLEAR_NEWS_BOARD_FEEDS
} from "./../actions/DisplayFeedActions";
import { List } from "immutable";
import { newsBoardSourceTypes } from "./../../utils/Constants";

export function fetchedFeeds(state = [], action = {}) {
    switch (action.type) {
    case PAGINATED_FETCHED_FEEDS:
        return Object.assign([], List(state).concat(action.feeds).toArray());  //eslint-disable-line new-cap
    case CLEAR_NEWS_BOARD_FEEDS:
        return [];
    default:
        return state;
    }
}

export const newsBoardCurrentSourceTab = (state = newsBoardSourceTypes.trending, action = {}) => {
    switch(action.type) {
    case NEWSBOARD_CURRENT_TAB: {
        return action.currentTab;
    }
    default: return state;
    }
};