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
                    posX: 0,
                    posY: 0
                }
            }

            componentDidMount() {

                const {imgviewBox, imgviewImg} = this.refs;
                const t = this;

                imgviewBox.addEventListener('mousewheel', (e) => {
                    const {iNow} = t.state;

                    if (e.deltaY > 0) {
                        if (iNow > 2) {
                            return;
                        }
                        t.setState({
                            iNow: iNow + 0.1
                        });
                    } else {
                        if (iNow < 0.1) {
                            return;
                        }
                        t.setState({
                            iNow: iNow - 0.1
                        });
                    }
                }, false);
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
                t.setState({
                    rotate: t.state.rotate - 90
                });
            }

            tRight() {
                const t = this;
                t.setState({
                    rotate: t.state.rotate + 90
                });
            }

            reSet() {
                this.setState({
                    iNow: 1,
                    rotate: 0
                });
            }

            render() {

                const {iNow, rotate, posX, posY} = this.state;
                const t = this;

                let style = {transform: `scale(${iNow}) rotate(${rotate}deg) translate(${posX}px, ${posY}px)`}

                return (
                    <div className="rayr-imgview-box" ref="imgviewBox">
                        <div className="imgview-box" ref="imgviewImg" style={style}><img
                            src={src}/>
                        </div>
                        <div className="imgview-box-tools">
                            <span className="plus"></span>
                            <span className="minus"></span>
                            <span className="left" onClick={() => {
                                t.tLeft();
                            }}></span>
                            <span className="right" onClick={() => {
                                t.tRight();
                            }}></span>
                            <span className="refresh" onClick={() => {
                                t.reSet();
                            }}></span>
                        </div>
                    </div>
                )
            }
        }

        ReactDOM.render(<Modal/>, oModal);
    })
}
