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
            <RayrImgview className="imgview-demo" alt='测试' src="http://img-hxy021.didistatic.com/static/woc/orion_mis/329fd5cf4202_20180326183623.jpg"/>
        </div>
    )
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
