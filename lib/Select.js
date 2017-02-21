'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _phoenixUi = require('phoenix-ui');

/**
 * 选择
 * @class Select
 * */

var Select = (function (_Component) {
    _inherits(Select, _Component);

    function Select(props, context) {
        _classCallCheck(this, Select);

        _Component.call(this, props, context);

        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.ITEM_NUMBER = 7;
        this.HALF_NUMBER = (this.ITEM_NUMBER - 1) / 2; // 3

        // init
        this.itemHeight = 1;
        this.selectedItemIndex = 0;
        this.itemLength = 0;

        this.selected = this.props.selected;
    }

    Select.prototype.componentDidUpdate = function componentDidUpdate() {
        this.itemHeight = parseInt(this.pickerSelect.children[0].offsetHeight);
        this.itemLength = this.pickerSelect.children.length;

        this.selectedItem = this.pickerSelect.getElementsByClassName('selected')[0];
        this.selectedItemIndex = parseInt(this.selectedItem.getAttribute('data-index'));

        this.initMarginTop = this.itemHeight * this.HALF_NUMBER - this.itemHeight * this.selectedItemIndex;

        this.pickerSelect.style.marginTop = this.initMarginTop + 'px';
    };

    Select.prototype.getSelected = function getSelected(value, index) {
        if (!!this.props.selected) {
            console.log(this.props.selected);
            return value == this.props.selected ? 'selected' : '';
        } else {
            return index == 0 ? 'selected' : '';
        }
    };

    Select.prototype.setSelected = function setSelected(index) {
        for (var i = 0; i < this.itemLength; i++) {
            this.pickerSelect.children[i].setAttribute('class', '');
            if (i == index) {
                this.pickerSelect.children[i].setAttribute('class', 'selected');
                this.selected = this.pickerSelect.children[i].getAttribute('value');
            }
        }
    };

    Select.prototype.onDrag = function onDrag(event, position) {
        this.preY = position.start.y;
        this.Y = position.move.y;
        this.distance = this.Y - this.preY;

        if (this.distance == 0) return;

        if (this.initMarginTop + this.distance >= this.itemHeight * this.HALF_NUMBER) return;
        if (this.initMarginTop + this.distance <= this.itemHeight * (this.HALF_NUMBER + 1) - this.itemHeight * this.itemLength) return;

        this.prevMarginTop = this.initMarginTop + this.distance;
        this.pickerSelect.style.marginTop = this.prevMarginTop + 'px';
    };

    Select.prototype.onDrop = function onDrop() {
        if (this.distance == 0) return;
        // 停留在准确的位置
        this.selectedItemIndex = Math.floor((this.itemHeight * this.HALF_NUMBER - this.prevMarginTop) / this.itemHeight);

        if ((this.itemHeight * this.HALF_NUMBER - this.prevMarginTop) % this.itemHeight >= this.itemHeight / 2) {
            this.selectedItemIndex = this.selectedItemIndex + 1;
        }

        this.prevMarginTop = this.itemHeight * this.HALF_NUMBER - this.itemHeight * this.selectedItemIndex;
        this.pickerSelect.style.marginTop = this.prevMarginTop + 'px';

        this.setSelected(this.selectedItemIndex);

        this.initMarginTop = this.prevMarginTop;

        this.onChange();
    };

    Select.prototype.onChange = function onChange() {
        this.props.onChange(this.selected);
    };

    Select.prototype.render = function render() {
        var _this2 = this;

        var _this = this;
        var _props = this.props;
        var data = _props.data;
        var selected = _props.selected;

        return _react2['default'].createElement(
            _phoenixUi.Drag,
            { className: 'picker-drag', onDrag: this.onDrag, onDrop: this.onDrop },
            _react2['default'].createElement(
                'ul',
                { className: 'picker-select', ref: function (pickerSelect) {
                        _this2.pickerSelect = pickerSelect;
                    } },
                data.map(function (item, index) {
                    return _react2['default'].createElement(
                        'li',
                        { 'data-index': index,
                            key: item.value,
                            value: item.value,
                            className: _this.getSelected(item.value, index)
                        },
                        item.name
                    );
                })
            )
        );
    };

    return Select;
})(_react.Component);

exports['default'] = Select;
module.exports = exports['default'];