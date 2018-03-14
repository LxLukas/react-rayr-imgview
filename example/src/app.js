import 'react-rayr-imgview/src/RayrImgview.scss';
import './app.scss';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {RayrImgview} from 'react-rayr-imgview';

function App() {
    return (
        <div>
            <h1>组件初始化</h1>
            <RayrImgview className="imgview-demo" alt='测试' src="http://pic1.win4000.com/wallpaper/2/50616eda66fd3.jpg"/>
        </div>
    )
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
