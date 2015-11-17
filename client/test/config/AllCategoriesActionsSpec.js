/* eslint no-unused-expressions:0, max-nested-callbacks: [2, 5] */

"use strict";
import AllCategoriesActions, {dispalyAllCategories, displayAllCategoriesAsync, DISPLAY_ALL_CATEGORIES} from "../../src/js/config/actions/AllCategoriesActions.js";
import AllCategoriesDb from "../../src/js/config/db/AllCategoriesDb.js";
import { assert } from "chai";
import sinon from "sinon";

describe("AllCategoriesActions", () => {
    it("return type DISPLAY_ALL_CATEGORIES action", function() {
        let categories = "{TimeLine, Sports}";
        let allCategoreisAction =  {"type": DISPLAY_ALL_CATEGORIES, categories };
        assert.deepEqual(allCategoreisAction, dispalyAllCategories(categories));
    });

/*    it("dispatch DISPLAY_ALL_CATEGORIES_ASYNC action", function() {
            let categories = "{TimeLine, Sports}";
            let allCategoreisAction =  {"type": "DISPLAY_ALL_CATEGORIES", categories };
            let allCategoriesDbStub = sinon.stub(AllCategoriesDb, "fetchAllCategories").returns(categories);
//            let allCategoriesActionsStub = sinon.stub(AllCategoriesActions, "dispalyAllCategories").withArgs(categories);
            displayAllCategoriesAsync();
            assert(allCategoriesDbStub.called);
//            assert(allCategoriesActionsStub.called);
        });*/

});

