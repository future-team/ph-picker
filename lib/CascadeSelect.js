'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

/**
 * 选择
 * @class CascadeSelect
 * */

var CascadeSelect = (function (_Component) {
    _inherits(CascadeSelect, _Component);

    function CascadeSelect(props, context) {
        _classCallCheck(this, CascadeSelect);

        _Component.call(this, props, context);

        this.count = 0;

        this.renderSelect = this.renderSelect.bind(this);
    }

    CascadeSelect.prototype.renderCascadeSelect = function renderCascadeSelect() {
        var _props = this.props;
        var data = _props.data;
        var selected = _props.selected;

        var newSelect = [];

        this.renderSelect(newSelect, data, selected);

        return newSelect;
    };

    CascadeSelect.prototype.renderSelect = function renderSelect(arr, data, selected) {
        // data.map(function(d){
        //     arr.push(<Select data={d} selected={selected[this.count]} />);
        //     if(data.children){
        //         this.renderSelect(arr, data.children, selected);
        //     }
        // });
        this.count++;
    };

    CascadeSelect.prototype.render = function render() {
        var _props2 = this.props;
        var data = _props2.data;
        var selected = _props2.selected;

        return this.renderCascadeSelect();
    };

    return CascadeSelect;
})(_react.Component);

exports['default'] = CascadeSelect;
module.exports = exports['default'];