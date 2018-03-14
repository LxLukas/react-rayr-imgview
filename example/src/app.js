import 'react-rayr-imgview/src/RayrImgview.scss';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {RayrImgview} from 'react-rayr-imgview';

function App() {
    return (
        <div>
            <h1>组件初始化</h1>
            <RayrImgview/>
        </div>
    )
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
