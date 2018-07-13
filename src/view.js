/**
 * Created by Rayr Lee on 2018/3/14.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default function (src) {

    let oModal = document.createElement('div');

    document.body.appendChild(oModal);

    return new Promise((resolve, reject) => {

        class Modal extends Component {
            constructor() {
                super();
                this.state = {
                    iNow: 1,
                    rotate: 0,
                    rotateY: 0,
                    rotateX: 0,
                    posX: 0,
                    posY: 0,
                    isDrag: false,
                    startMovePos: {
                        x: 0,
                        y: 0
                    },
                    originImgViewPos: {
                        x: 0,
                        y: 0
                    },
                    boxW: 0,
                    boxH: 0,
                    rotateStatus: 0,// 0,1,2,3 四个值，分别代表旋转的四个朝向
                    isLoading: true,
                    statusStr: '图片加载中...'
                }
            }

            componentDidMount() {
                const {imgviewBox, imgviewImg} = this.refs;
                const t = this;
                imgviewBox.addEventListener('mousewheel', (e) => {
                    e.preventDefault();
                    if (e.deltaY > 0) {
                        this.scale(0);
                    } else {
                        this.scale(1);
                    }
                }, false);
                this.ImageToCanvas();
            }

            close() {
                ReactDOM.unmountComponentAtNode(oModal);
                document.body.removeChild(oModal);
            }

            cancel(res = null) {
                this.close();
                reject(res);
            }

            confirm(res = null) {
                this.close();
                resolve(res);
            }

            tLeft() {
                const t = this;

                let deg = t.state.rotate - 90;
                let rotStatus = Math.abs((deg / 90 + 4) % 4);
                
                // x,y的旋转会直接影响 z的旋转，所以要进行判断
                let {rotateX, rotateY} = this.state;
                if((rotateX+rotateY) === 0 || (rotateX+rotateY) === 360){
                    // z轴正向转动
                    t.setState({
                        rotate: t.state.rotate - 90,
                        rotateStatus: rotStatus
                    });
                }else{
                    // z反向转动
                    t.setState({
                        rotate: t.state.rotate + 90,
                        rotateStatus: rotStatus
                    });
                }
            }

            tRight() {
                const t = this;

                let deg = t.state.rotate + 90;
                let rotStatus = Math.abs((deg / 90) % 4);

                // x,y的旋转会直接影响 z的旋转，所以要进行判断
                let {rotateX, rotateY} = this.state;
                if((rotateX+rotateY) === 0 || (rotateX+rotateY) === 360){
                    // z轴正向转动
                    t.setState({
                        rotate: t.state.rotate + 90,
                        rotateStatus: rotStatus
                    });
                }else{
                    // z反向转动
                    t.setState({
                        rotate: t.state.rotate - 90,
                        rotateStatus: rotStatus
                    });
                }
            }

            scale(type) {
                const {iNow} = this.state;
                if(type === 0){
                    // 放大
                    if (iNow > 3) {
                        return;
                    }
                    this.setState({
                        iNow: iNow + 0.1
                    });
                }else{
                    // 缩小
                    if (iNow < 0.5) {
                        return;
                    }
                    this.setState({
                        iNow: iNow - 0.1
                    });
                }
            }

            plusFn() {
                this.scale(0);
            }

            minusFn() {
                this.scale(1)
            }

            // 水平翻转
            horizonFlip() {
                this.setState({
                    rotateY: this.state.rotateY === 180 ? 0 : 180
                });
            }

            // 垂直翻转
            verticalFlip() {
                this.setState({
                    rotateX: this.state.rotateX === 180 ? 0 : 180
                });
            }

            reSet() {
                this.setState({
                    iNow: 1,
                    rotate: 0,
                    posX: 0,
                    posY: 0,
                    rotateY: 0,
                    rotateX: 0
                });
            }

            ImageToCanvas() {
                let imgBox = this.refs.imgSrc;
                let canvas = document.getElementById('imgCanvas');


                let image = new Image();
                image.src = src;

                image.onload = () => {
                    let width = image.width;
                    let height = image.height;

                    // 根据屏幕高度设置最适合的显示宽高
                    let boxH = window.innerHeight * 0.7;
                    let boxW = (boxH/height) * width;

                    this.setState({
                        boxW: boxW,
                        boxH: boxH,
                        isLoading: false
                    });

                    canvas.width = width *1.5;
                    canvas.height = height *1.5;

                    canvas.getContext("2d").drawImage(image, 0, 0, width *1.5, height *1.5);//0, 0参数画布上的坐标点，图片将会拷贝到这个地方
                }

                image.onerror = () => {
                    this.setState({
                        isLoading: true,
                        statusStr: '图片加载失败'
                    });
                }
            }

            DragStart(e) {
                // 利用 base64 编码，给一个 1x1像素的完全透明的png图片，代替默认的拖拽时会出现的重影
                // 解决Safari下面的拖拽效果bug
                let d = document.createElement('img');
                d.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUCB1jYAACAAAFAAGNu5vzAAAAAElFTkSuQmCC';
                e.dataTransfer.setDragImage(d, 0, 0);

                let dom = this.refs.imgviewImg;
                let oldTransform = dom.style.transform;
                let oldTfInfo = oldTransform.slice(oldTransform.indexOf('translate'), oldTransform.length);// 这里字符串匹配要做优化
                oldTfInfo = oldTfInfo.match(/\((.+)\)/)[0];// 匹配括号里的字符串
                oldTfInfo = oldTfInfo.replace(/(\(|\)|\s)/g, '');
                let oldTfInfoList = oldTfInfo.split(',');
                let originX = parseInt(oldTfInfoList[0].replace('px', ''));
                let originY = parseInt(oldTfInfoList[1].replace('px', ''));

                let x = e.clientX;
                let y = e.clientY;

                this.setState({
                    isDrag: true,
                    startMovePos: {
                        x: x,
                        y: y
                    },
                    originImgViewPos: {
                        x: originX,
                        y: originY
                    }
                });
            }

            onDragOver(e) {
                // 实际拖拽的事件触发逻辑在此处
                e.preventDefault();
                let dom = this.refs.imgviewImg;
                let mouseX = e.clientX;
                let mouseY = e.clientY;

                // 鼠标落下的点
                let x = mouseX - this.state.startMovePos.x;
                let y = mouseY - this.state.startMovePos.y;
                // 移动前的图片预览框位置
                let originX = this.state.originImgViewPos.x;
                let originY = this.state.originImgViewPos.y;

                x = x + originX;
                y = y + originY;

                this.setState({
                    posX: x,
                    posY: y
                });
                return false;
            }

            onDragEnd(e) {
                this.setState({
                    isDrag: false
                });
            }

            render() {

                const {boxW, boxH, iNow, rotate, rotateY, rotateX, posX, posY} = this.state;
                const t = this;

                let transOriginX = posX + boxW/2;
                let transOriginY = posY + boxH/2;

                let style = {width: `${boxW}px`, height: `${boxH}px`, transformOrigin: `${transOriginX}px ${transOriginY}px`, transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translate(${posX}px, ${posY}px)`}
                let rotateStyle = {width: `${boxW}px`, height: `${boxH}px`,transform: `scale(${iNow}) rotate(${rotate}deg)`};
                if (this.state.isDrag) {
                    style.transition = 'none'
                } else {
                    style.transition = 'all .3s'
                }

                return (
                    <div onDragOver={t.onDragOver.bind(this)} className="rayr-imgview-box" ref="imgviewBox">
                        <div onDragEnd={t.onDragEnd.bind(this)} draggable="true" onDragStart={t.DragStart.bind(this)}
                             className="imgview-box" ref="imgviewImg" style={style}>
                             {
                                 this.state.isLoading ? <div className="img-loading">{this.state.statusStr}</div> : null
                             }
                            <canvas id="imgCanvas" className="img-canvas" style={rotateStyle}></canvas>
                        </div>
                        <div className="imgview-box-tools">
                            <span className="imgview-icon plus" onClick={() => {
                                this.plusFn();
                            }}></span>
                            <span className="imgview-icon minus" onClick={() => {
                                this.minusFn();
                            }}></span>
                            <span className="imgview-icon left" onClick={() => {
                                t.tLeft();
                            }}></span>
                            <span className="imgview-icon right" onClick={() => {
                                t.tRight();
                            }}></span>
                            <span className="imgview-icon horizontal" onClick={() => {
                                t.horizonFlip();
                            }}></span>
                            <span className="imgview-icon vertical" onClick={() => {
                                t.verticalFlip();
                            }}></span>
                            <span className="imgview-icon refresh" onClick={() => {
                                t.reSet();
                            }}></span>
                        </div>
                        <div className="imgview-icon imgview-box-close" onClick={() => {
                            this.cancel();
                        }}></div>
                    </div>
                )
            }
        }

        ReactDOM.render(<Modal/>, oModal);
    })
}
