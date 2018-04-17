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
            <RayrImgview className="imgview-demo" alt='测试' src="http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523951927125&di=122dea77b427ea2c1776137dba3012aa&imgtype=0&src=http%3A%2F%2Fpic35.photophoto.cn%2F20150529%2F0038038075710325_b.jpg"/>
            <RayrImgview className="imgview-demo" alt='测试' src="http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523952852308&di=fee0106450330db13be4f5ab0328b27f&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F58477701ec330.jpg"/>
            <RayrImgview className="imgview-demo" alt='测试' src="http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523951927123&di=f5d1f68340a4b7551d9e1c2721f32572&imgtype=0&src=http%3A%2F%2Fpic42.nipic.com%2F20140605%2F9081536_142458626145_2.jpg"/>
            
        </div>
    )
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
