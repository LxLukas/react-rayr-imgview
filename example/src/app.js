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
            <RayrImgview className="imgview-demo" alt='测试' src="http://images.xlsdn.com/cHJvZF9pb3RfYzNzX3FJQ3R1K1JwMHdlQ2pSUE8xWTlSYkE9PQ==?auth_key=1531699200-0-0-549ddfebb7e8f875b4eeac74f88395cd"/>
            <RayrImgview className="imgview-demo" alt='测试' src="src.jpg"/>
            <RayrImgview className="imgview-demo" alt='测试' src="http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523951927123&di=f5d1f68340a4b7551d9e1c2721f32572&imgtype=0&src=http%3A%2F%2Fpic42.nipic.com%2F20140605%2F9081536_142458626145_2.jpg"/>
        </div>
    )
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
