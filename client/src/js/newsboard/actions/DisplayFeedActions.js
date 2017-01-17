import AjaxClient from "../../../js/utils/AjaxClient";

export const PAGINATED_FETCHED_FEEDS = "PAGINATED_FETCHED_FEEDS";
export const NEWS_BOARD_CURRENT_TAB = "NEWS_BOARD_CURRENT_TAB";
export const CLEAR_NEWS_BOARD_FEEDS = "CLEAR_NEWS_BOARD_FEEDS";

export const paginatedFeeds = feeds => ({
    "type": PAGINATED_FETCHED_FEEDS, feeds
});

export const newsBoardTabSwitch = currentTab => ({
    "type": NEWS_BOARD_CURRENT_TAB, currentTab
});

export const clearFeeds = () => ({
    "type": CLEAR_NEWS_BOARD_FEEDS
});

export function displayFeedsByPage(pageIndex, sourceType, callback = () => {}) {
    let ajax = AjaxClient.instance("/get-feeds", true);
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    return async dispatch => {
        try {
            let feeds = await ajax.post(headers, { "offset": pageIndex, "sourceType": sourceType });
            let result = {
                "docsLength": 0
            };
            if (feeds.docs.length > 0) { //eslint-disable-line no-magic-numbers
                dispatch(paginatedFeeds(feeds.docs));
                result.docsLength = feeds.docs.length;
            }
            let defaultPageSize = 25;
            result.hasMoreFeeds = feeds.docs.length === defaultPageSize;
            callback(result); //eslint-disable-line callback-return
        } catch(err) {
            dispatch(paginatedFeeds([]));
        }
    };
}

export function getBookmarkedFeeds(pageIndex, callback = () => {}) {
    let ajax = AjaxClient.instance("/bookmarks", true);
    return async dispatch => {
        try {
            let feeds = await ajax.get({ "offset": pageIndex });
            let result = {
                "docsLength": 0
            };
            if (feeds.docs.length > 0) { //eslint-disable-line no-magic-numbers
                dispatch(paginatedFeeds(feeds.docs));
                result.docsLength = feeds.docs.length;
            }
            let defaultPageSize = 25;
            result.hasMoreFeeds = feeds.docs.length === defaultPageSize;
            callback(result); //eslint-disable-line callback-return
        } catch(err) {
            dispatch(paginatedFeeds([]));
        }
    };
}


export async function fetchFeedsFromSources() {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    let ajaxFetch = AjaxClient.instance("/fetch-feeds", true);
    await ajaxFetch.post(headers, {});
}
