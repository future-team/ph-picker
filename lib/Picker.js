'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _phoenixUi = require('phoenix-ui');

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _CascadeSelect = require('./CascadeSelect');

var _CascadeSelect2 = _interopRequireDefault(_CascadeSelect);

/**
 * 选择
 * @class Picker
 * */

var Picker = (function (_Component) {
    _inherits(Picker, _Component);

    _createClass(Picker, null, [{
        key: 'propTypes',
        value: {
            type: _react.PropTypes.string,
            visible: _react.PropTypes.bool,
            title: _react.PropTypes.string
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            type: 'select', // select, cascade, *city, date, time
            visible: false,
            title: '',
            selected: ''
        },
        enumerable: true
    }]);

    function Picker(props, context) {
        _classCallCheck(this, Picker);

        _Component.call(this, props, context);
    }

    Picker.prototype.onChange = function onChange(selected) {
        console.log(selected);
    };

    Picker.prototype.renderSelect = function renderSelect() {
        var _props = this.props;
        var type = _props.type;
        var data = _props.data;
        var selected = _props.selected;

        switch (type) {
            case 'select':
                return _react2['default'].createElement(_Select2['default'], { data: data, selected: selected, onChange: this.onChange });
                break;
            case 'cascade':
                return _react2['default'].createElement(_CascadeSelect2['default'], { data: data, selected: selected });
                break;
            default:
                return _react2['default'].createElement(_Select2['default'], { data: data, selected: selected });
        }
    };

    Picker.prototype.render = function render() {
        var _props2 = this.props;
        var visible = _props2.visible;
        var onClose = _props2.onClose;
        var title = _props2.title;

        return _react2['default'].createElement(
            _phoenixUi.Popup,
            { align: 'bottom', visible: visible, onClose: onClose },
            _react2['default'].createElement(
                'div',
                { className: 'popup-picker' },
                _react2['default'].createElement(
                    'div',
                    { className: 'picker-header' },
                    _react2['default'].createElement(
                        'span',
                        { className: 'picker-cancel' },
                        '取消'
                    ),
                    _react2['default'].createElement(
                        'span',
                        { className: 'picker-title' },
                        title
                    ),
                    _react2['default'].createElement(
                        'span',
                        { className: 'picker-confirm' },
                        '完成'
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'picker-body' },
                    this.renderSelect()
                )
            )
        );
    };

    return Picker;
})(_react.Component);

exports['default'] = Picker;
module.exports = exports['default'];