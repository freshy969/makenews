import DeleteCollectionFeedRoute from "../../../src/routes/helpers/DeleteCollectionFeedRoute";
import * as CollectionFeedsRequestHandler from "../../../src/collection/CollectionFeedsRequestHandler";
import sinon from "sinon";
import { assert } from "chai";

describe("DeleteCollectionFeedRoute", () => {
    const sandbox = sinon.sandbox.create();
    const accessToken = "accessToken";
    const feedId = "feedId";
    const collectionId = "collectionId";
    let deleteFeed = null, request = null;
    beforeEach("DeleteCollectionFeedRoute", () => {
        request = {
            "cookies": {
                "AuthSession": accessToken
            },
            "query": {
                "feedId": feedId,
                "collectionId": collectionId
            }
        };

    });

    afterEach("DeleteCollectionFeedRoute", () => {
        sandbox.restore();
    });

    describe("validate", () => {

        it("should return empty string if all parameters are there", () => {
            deleteFeed = new DeleteCollectionFeedRoute(request, {});

            assert.strictEqual(deleteFeed.validate(), "");
        });

        it("should return missing parameters message", () => {
            request.query.feedId = "";

            deleteFeed = new DeleteCollectionFeedRoute(request, {});

            assert.strictEqual(deleteFeed.validate(), "missing parameters");
        });
    });

    describe("handle", () => {

        it("should delete feed from collection", async () => {
            let deleteArticleMock = sandbox.mock(CollectionFeedsRequestHandler).expects("deleteFeedFromCollection")
               .withExactArgs(accessToken, feedId, collectionId).returns(Promise.resolve({ "ok": true }));

            deleteFeed = new DeleteCollectionFeedRoute(request, {});

            let response = await deleteFeed.handle();

            deleteArticleMock.verify();
            assert.deepEqual(response, { "ok": true });
        });
    });
});