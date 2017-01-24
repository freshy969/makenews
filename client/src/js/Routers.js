/* eslint react/display-name:0 react/jsx-wrap-multilines:0*/
import App from "./App";
import LoginPage from "./login/pages/LoginPage";
import TwitterSuccess from "./main/pages/TwitterSuccess";
import UserSession from "./user/UserSession";
import UserProfile from "./user/UserProfile";
import React from "react";
import { Route } from "react-router";
import ConfigureSourcesPage from "./config/components/ConfigureSourcesPage";
import Header from "./header/components/MainHeader";
import ScanNews from "./newsboard/components/ScanNews";
import WriteAStory from "./storyboard/components/WriteAStory";
import ConfigureURLs from "./../js/config/components/ConfigureURLs";
import AddUrl from "./../js/config/components/AddUrl";
import StoryBoardCards from "./storyboard/components/StoryBoardCards";
import StoryCard from "./storyboard/components/StoryCard";

export function renderRoutes() {
    return (
        <Route component={App}>
            <Route path="/" component={LoginPage} onEnter={showLoginPage}/>
            <Route path="/main" component={Header} onEnter={isLoggedIn}>

                <Route path="/configure" component={ConfigureURLs}>
                    <Route path="/configure/addurl" component={AddUrl} />
                    <Route path="/configure/:sourceType(/:sourceSubType)" component={ConfigureSourcesPage}/>
                </Route>

                <Route path="/newsBoard" component={ScanNews} />
                <Route path="/storyBoard/" component={WriteAStory}>
                    <Route path="/storyBoard/newStory" component={StoryBoardCards} />
                    <Route path="/storyBoard/story/:storyId" component={StoryCard} />
                </Route>
                <Route path="/twitterSuccess" component={TwitterSuccess} />
                <Route path="/profile" component={UserProfile} />
            </Route>
        </Route>
    );

}

function isLoggedIn(nextState, replaceState) {
    let userSession = UserSession.instance();
    if(!userSession.isActiveContinuously()) {
        replaceState("/");
    }

}

function showLoginPage(nextState, replaceState) {
    let userSession = UserSession.instance();
    if(userSession.isActiveContinuously()) {
        userSession.setLastAccessedTime();
        replaceState("/configure/web");
    }
}
