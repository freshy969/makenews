import SourcesResults from "../../../src/js/config/components/SourcesResults";
import React from "react";
import TestUtils from "react-addons-test-utils";
import { expect } from "chai";
import Source from "../../../src/js/config/components/Source";
import { findAllWithType } from "react-shallow-testutils";

describe("Source Results", () => {
    let sources = null;
    let result = null;

    beforeEach("Source Results", () => {
        sources = [
            { "name": "Profile 1" }
        ];
        let renderer = TestUtils.createRenderer();
        renderer.render(<SourcesResults sources={sources} dispatch={()=>{}}/>);
        result = renderer.getRenderOutput();
    });

    it("should have add all button", () => {
        let button = result.props.children[0]; //eslint-disable-line no-magic-numbers
        expect(button.type).to.equal("button");
    });

    it("should render the source URLs", () => {
        let renderedSources = findAllWithType(result, Source);
        expect(renderedSources).to.have.lengthOf(1); //eslint-disable-line no-magic-numbers
    });
});