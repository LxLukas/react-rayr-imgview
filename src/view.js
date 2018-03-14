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
                    iNow: 1
                }
            }

            componentDidMount() {

                const {imgviewBox} = this.refs;
                const t = this;

                imgviewBox.addEventListener('mousewheel', (e) => {
                    const {iNow} = t.state;

                    if (e.deltaY > 0) {
                        if (iNow > 2) {
                            return;
                        }
                        t.setState({
                            iNow: iNow + 0.04
                        });
                    } else {
                        if (iNow < 0.1) {
                            return;
                        }
                        t.setState({
                            iNow: iNow - 0.04
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

            render() {

                const {iNow} = this.state;

                return (
                    <div className="rayr-imgview-box" ref="imgviewBox">
                        <div className="imgview-box" style={{transform: `scale(${iNow})`}}><img
                            src={src}/>
                        </div>
                        <div className="imgview-box-tools">1111</div>
                    </div>
                )
            }
        }

        ReactDOM.render(<Modal/>, oModal);
    })
}
