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
                    posX: 0,
                    posY: 0
                };
                return _this;
            }

            _createClass(Modal, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _refs = this.refs,
                        imgviewBox = _refs.imgviewBox,
                        imgviewImg = _refs.imgviewImg;

                    var t = this;

                    imgviewBox.addEventListener('mousewheel', function (e) {
                        var iNow = t.state.iNow;


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
                    t.setState({
                        rotate: t.state.rotate - 90
                    });
                }
            }, {
                key: 'tRight',
                value: function tRight() {
                    var t = this;
                    t.setState({
                        rotate: t.state.rotate + 90
                    });
                }
            }, {
                key: 'plusFn',
                value: function plusFn() {
                    var iNow = this.state.iNow;


                    if (iNow > 2) {
                        return;
                    }
                    this.setState({
                        iNow: iNow + 0.1
                    });
                }
            }, {
                key: 'minusFn',
                value: function minusFn() {
                    var iNow = this.state.iNow;


                    if (iNow < 0.1) {
                        return;
                    }
                    this.setState({
                        iNow: iNow - 0.1
                    });
                }
            }, {
                key: 'reSet',
                value: function reSet() {
                    this.setState({
                        iNow: 1,
                        rotate: 0
                    });
                }
            }, {
                key: 'render',
                value: function render() {
                    var _this2 = this;

                    var _state = this.state,
                        iNow = _state.iNow,
                        rotate = _state.rotate,
                        posX = _state.posX,
                        posY = _state.posY;

                    var t = this;

                    var style = { transform: 'scale(' + iNow + ') rotate(' + rotate + 'deg) translate(' + posX + 'px, ' + posY + 'px)' };

                    return _react2.default.createElement(
                        'div',
                        { className: 'rayr-imgview-box', ref: 'imgviewBox' },
                        _react2.default.createElement(
                            'div',
                            { className: 'imgview-box', ref: 'imgviewImg', style: style },
                            _react2.default.createElement('img', {
                                src: src })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'imgview-box-tools' },
                            _react2.default.createElement('span', { className: 'imgview-icon plus', onClick: function onClick() {
                                    _this2.plusFn();
                                } }),
                            _react2.default.createElement('span', { className: 'imgview-icon minus', onClick: function onClick() {
                                    _this2.minusFn();
                                } }),
                            _react2.default.createElement('span', { className: 'imgview-icon left', onClick: function onClick() {
                                    t.tLeft();
                                } }),
                            _react2.default.createElement('span', { className: 'imgview-icon right', onClick: function onClick() {
                                    t.tRight();
                                } }),
                            _react2.default.createElement('span', { className: 'imgview-icon refresh', onClick: function onClick() {
                                    t.reSet();
                                } })
                        ),
                        _react2.default.createElement('div', { className: 'imgview-icon imgview-box-close', onClick: function onClick() {
                                _this2.cancel();
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