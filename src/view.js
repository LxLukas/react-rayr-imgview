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
            }

            componentDidMount() {
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
                return (
                    <div className="rayr-imgview-box">
                        <div className="imgview-box">
                            <img src={src}/>
                        </div>
                    </div>
                )
            }
        }

        ReactDOM.render(<Modal/>, oModal);
    })
}
