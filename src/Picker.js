import React,{Component, PropTypes} from 'react';
import {Popup} from 'phoenix-ui';
import Select from './Select';

/**
 * 选择
 * @class Picker
 * */
export default class Picker extends Component{

    static propTypes = {
        type: PropTypes.string,
        visible: PropTypes.bool,
        title: PropTypes.string
    }

    static defaultProps = {
        type: 'select', // select, cascade, *city, date, time
        visible: false,
        title: '',
        selected: ''
    }

    constructor(props, context) {
        super(props, context);

        this.onChange = this.onChange.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onClose = this.onClose.bind(this);

        this.selected = this.props.selected;
    }

    onClose(){
        this.selected = this.props.selected;
        this.props.onClose();
    }

    onChange(selected, selectedName){
        this.selected = selected;
        this.selectedName = selectedName;
    }

    onConfirm(){
        this.props.onChange(this.selected, this.selectedName);
    }

    renderSelect(){
        let {type, data, selected} = this.props;

        switch(type){
            case 'select':
                return <Select data={data} selected={this.selected} onChange={this.onChange} />;
                break;
            // add other type
            default:
                return <Select data={data} selected={this.selected} onChange={this.onChange} />;
        }
    }

    render(){
        let {visible, onClose, title} = this.props;

        return (
            <Popup align="bottom" visible={visible} onClose={this.onConfirm}>
                <div className="popup-picker">
                    <div className="picker-header">
                        <span className="picker-cancel" onClick={this.onClose}>取消</span>
                        <span className="picker-title">{title}</span>
                        <span className="picker-confirm" onClick={this.onConfirm}>完成</span>
                    </div>
                    <div className="picker-body">
                        {this.renderSelect()}
                    </div>
                </div>
            </Popup>
        )
    }
}
