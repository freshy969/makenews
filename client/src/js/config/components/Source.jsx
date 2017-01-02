/* eslint-disable operator-linebreak */
import React, { Component, PropTypes } from "react";
import { addSourceToConfigureList, WEB } from "./../../sourceConfig/actions/SourceConfigurationActions";

export default class Source extends Component {
    render() {
        return (
            <div className={this.props.source.added ? "source added" : "source"}>
                <div className="source__icon">
                    { this.props.source.picture &&
                        <img src={this.props.source.picture.data.url} width="40px" height="40px"/> ||
                    <img src={this.props.source.profile_image_url} width="40px" height="40px"/>

                    }
                </div>
                <div className="source__details">
                    <div className="source__title">
                        { this.props.source.name }
                    </div>

                    { this.props.currentSourceType === WEB &&
                    <div className="source__url">
                        { this.props.source.url }
                    </div>
                    }
                </div>

                { this.props.source.added ?
                    (<div className="source__added-icon source__action-icon">
                        <img src="./images/success-arrow.png"/>
                    </div>)
                    :
                    (<div className="source__add-icon source__action-icon"
                        onClick={() => this.props.dispatch(addSourceToConfigureList(this.props.currentSourceType, this.props.source))}
                     >
                        <img src="./images/add-btn.png"/>
                    </div>)
                }
            </div>
        );
    }
}

Source.propTypes = {
    "source": PropTypes.object.isRequired,
    "dispatch": PropTypes.func.isRequired,
    "currentSourceType": PropTypes.string.isRequired
};
