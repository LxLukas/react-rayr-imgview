'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RayrImgview = function (_React$Component) {
    _inherits(RayrImgview, _React$Component);

    function RayrImgview() {
        _classCallCheck(this, RayrImgview);

        return _possibleConstructorReturn(this, (RayrImgview.__proto__ || Object.getPrototypeOf(RayrImgview)).apply(this, arguments));
    }

    _createClass(RayrImgview, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                src = _props.src,
                nsrc = _props.nsrc;


            return _react2.default.createElement('img', _extends({}, this.props, { className: 'rayr-imgview ' + className, onClick: function onClick() {
                    (0, _view2.default)(nsrc || src).then(function () {}, function () {});
                } }));
        }
    }]);

    return RayrImgview;
}(_react2.default.Component);

RayrImgview.propTypes = {};
RayrImgview.defaultProps = {};
exports.default = RayrImgview;
module.exports = exports['default'];