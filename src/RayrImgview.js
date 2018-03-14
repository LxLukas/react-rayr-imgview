import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import RayrView from './view';

class RayrImgview extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    render() {

        const {className, src} = this.props;

        return (
            <img {...this.props} className={`rayr-imgview ${className}`} onClick={() => {
                RayrView(src).then(() => {

                }, () => {

                })
            }}/>
        );
    }
}

export default RayrImgview;
