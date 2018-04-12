'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (src) {

    var oModal = document.createElement('div');

    document.body.appendChild(oModal);

    return new Promise(function (resolve, reject) {
        var Modal = function (_Component) {
            _inherits(Modal, _Component);

            function Modal() {
                _classCallCheck(this, Modal);

                var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

                _this.state = {
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
                    rotateStatus: 0 // 0,1,2,3 四个值，分别代表旋转的四个朝向
                };
                return _this;
            }

            _createClass(Modal, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;

                    var _refs = this.refs,
                        imgviewBox = _refs.imgviewBox,
                        imgviewImg = _refs.imgviewImg;

                    var t = this;
                    imgviewBox.addEventListener('mousewheel', function (e) {
                        if (e.deltaY > 0) {
                            _this2.scale(0);
                        } else {
                            _this2.scale(1);
                        }
                    }, false);
                    this.ImageToCanvas();
                }
            }, {
                key: 'close',
                value: function close() {
                    _reactDom2.default.unmountComponentAtNode(oModal);
                    document.body.removeChild(oModal);
                }
            }, {
                key: 'cancel',
                value: function cancel() {
                    var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                    this.close();
                    reject(res);
                }
            }, {
                key: 'confirm',
                value: function confirm() {
                    var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                    this.close();
                    resolve(res);
                }
            }, {
                key: 'tLeft',
                value: function tLeft() {
                    var t = this;

                    var deg = t.state.rotate - 90;
                    var rotStatus = Math.abs((deg / 90 + 4) % 4);
                    t.setState({
                        rotate: t.state.rotate - 90,
                        rotateStatus: rotStatus
                    });
                }
            }, {
                key: 'tRight',
                value: function tRight() {
                    var t = this;

                    var deg = t.state.rotate + 90;
                    var rotStatus = Math.abs(deg / 90 % 4);

                    t.setState({
                        rotate: t.state.rotate + 90,
                        rotateStatus: rotStatus
                    });
                }
            }, {
                key: 'scale',
                value: function scale(type) {
                    var iNow = this.state.iNow;

                    if (type === 0) {
                        // 放大
                        if (iNow > 3) {
                            return;
                        }
                        this.setState({
                            iNow: iNow + 0.1
                        });
                    } else {
                        // 缩小
                        if (iNow < 0.5) {
                            return;
                        }
                        this.setState({
                            iNow: iNow - 0.1
                        });
                    }
                }
            }, {
                key: 'plusFn',
                value: function plusFn() {
                    this.scale(0);
                }
            }, {
                key: 'minusFn',
                value: function minusFn() {
                    this.scale(1);
                }

                // 水平翻转

            }, {
                key: 'horizonFlip',
                value: function horizonFlip() {
                    this.setState({
                        rotateY: this.state.rotateY === 180 ? 0 : 180
                    });
                }

                // 垂直翻转

            }, {
                key: 'verticalFlip',
                value: function verticalFlip() {
                    this.setState({
                        rotateX: this.state.rotateX === 180 ? 0 : 180
                    });
                }
            }, {
                key: 'reSet',
                value: function reSet() {
                    this.setState({
                        iNow: 1,
                        rotate: 0,
                        posX: 0,
                        posY: 0,
                        rotateY: 0,
                        rotateX: 0
                    });
                }
            }, {
                key: 'ImageToCanvas',
                value: function ImageToCanvas() {
                    var imgBox = this.refs.imgSrc;
                    var canvas = document.getElementById('imgCanvas');

                    var image = new Image();
                    image.src = src;

                    var ratio = image.width / image.height;
                    var h = 400; // max height
                    var w = ratio * h; // max

                    canvas.width = w;
                    canvas.height = h;

                    canvas.getContext("2d").drawImage(image, 0, 0, w, h); //0, 0参数画布上的坐标点，图片将会拷贝到这个地方
                }
            }, {
                key: 'DragStart',
                value: function DragStart(e) {
                    var dom = this.refs.imgviewImg;
                    var oldTransform = dom.style.transform;
                    var oldTfInfo = oldTransform.slice(oldTransform.indexOf('translate'), oldTransform.indexOf('rotateY') - 1); // 这里字符串匹配要做优化
                    oldTfInfo = oldTfInfo.match(/\((.+)\)/)[0]; // 匹配括号里的字符串
                    oldTfInfo = oldTfInfo.replace(/(\(|\)|\s)/g, '');
                    var oldTfInfoList = oldTfInfo.split(',');
                    var originX = parseInt(oldTfInfoList[0].replace('px', ''));
                    var originY = parseInt(oldTfInfoList[1].replace('px', ''));

                    var x = e.clientX;
                    var y = e.clientY;

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
            }, {
                key: 'onDragOver',
                value: function onDragOver(e) {
                    // 实际拖拽的事件触发逻辑在此处
                    e.preventDefault();
                    var dom = this.refs.imgviewImg;
                    var mouseX = e.clientX;
                    var mouseY = e.clientY;

                    // 鼠标落下的点
                    var x = mouseX - this.state.startMovePos.x;
                    var y = mouseY - this.state.startMovePos.y;
                    // 移动前的图片预览框位置
                    var originX = this.state.originImgViewPos.x;
                    var originY = this.state.originImgViewPos.y;

                    x = x + originX;
                    y = y + originY;

                    this.setState({
                        posX: x,
                        posY: y
                    });
                    return false;
                }
            }, {
                key: 'onDragEnd',
                value: function onDragEnd(e) {
                    this.setState({
                        isDrag: false
                    });
                }
            }, {
                key: 'render',
                value: function render() {
                    var _this3 = this;

                    var _state = this.state,
                        iNow = _state.iNow,
                        rotate = _state.rotate,
                        rotateY = _state.rotateY,
                        rotateX = _state.rotateX,
                        posX = _state.posX,
                        posY = _state.posY;

                    var t = this;

                    var style = { transform: 'scale(' + iNow + ') translate(' + posX + 'px, ' + posY + 'px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)' };
                    var rotateStyle = { transform: 'rotate(' + rotate + 'deg)' };
                    if (this.state.isDrag) {
                        style.transition = 'none';
                    } else {
                        style.transition = 'all .3s';
                    }

                    return _react2.default.createElement(
                        'div',
                        { onDragOver: t.onDragOver.bind(this), className: 'rayr-imgview-box', ref: 'imgviewBox' },
                        _react2.default.createElement(
                            'div',
                            { onDragEnd: t.onDragEnd.bind(this), draggable: 'true', onDragStart: t.DragStart.bind(this),
                                className: 'imgview-box', ref: 'imgviewImg', style: style },
                            _react2.default.createElement('canvas', { id: 'imgCanvas', className: 'img-canvas', style: rotateStyle })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'imgview-box-tools' },
                            _react2.default.createElement('span', { className: 'imgview-icon plus', onClick: function onClick() {
                                    _this3.plusFn();
                                } }),
                            _react2.default.createElement('span', { className: 'imgview-icon minus', onClick: function onClick() {
                                    _this3.minusFn();
                                } }),
                            _react2.default.createElement('span', { className: 'imgview-icon left', onClick: function onClick() {
                                    t.tLeft();
                                } }),
                            _react2.default.createElement('span', { className: 'imgview-icon right', onClick: function onClick() {
                                    t.tRight();
                                } }),
                            _react2.default.createElement('span', { className: 'imgview-icon horizontal', onClick: function onClick() {
                                    t.horizonFlip();
                                } }),
                            _react2.default.createElement('span', { className: 'imgview-icon vertical', onClick: function onClick() {
                                    t.verticalFlip();
                                } }),
                            _react2.default.createElement('span', { className: 'imgview-icon refresh', onClick: function onClick() {
                                    t.reSet();
                                } })
                        ),
                        _react2.default.createElement('div', { className: 'imgview-icon imgview-box-close', onClick: function onClick() {
                                _this3.cancel();
                            } })
                    );
                }
            }]);

            return Modal;
        }(_react.Component);

        _reactDom2.default.render(_react2.default.createElement(Modal, null), oModal);
    });
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Rayr Lee on 2018/3/14.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

module.exports = exports['default'];