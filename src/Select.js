import React,{Component, PropTypes} from 'react';
import {Drag} from 'phoenix-ui';

/**
 * 选择
 * @class Select
 * */
export default class Select extends Component{

    constructor(props, context) {
        super(props, context);

        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.ITEM_NUMBER = 7;
        this.HALF_NUMBER = (this.ITEM_NUMBER - 1)/2; // 3

        // init
        this.itemHeight = 1;
        this.selectedItemIndex = 0;
        this.itemLength = 0;

        this.selected = this.props.selected;
    }

    componentDidMount(){
        this.itemHeight = parseInt(this.pickerSelect.children[0].offsetHeight);
        this.itemLength = this.pickerSelect.children.length;

        this.selectedItem = this.pickerSelect.getElementsByClassName('selected')[0];
        this.selectedName = this.selectedItem.getAttribute('name');
        this.selectedItemIndex = parseInt(this.selectedItem.getAttribute('data-index'));

        this.initMarginTop = this.itemHeight*this.HALF_NUMBER - this.itemHeight*this.selectedItemIndex;
        
        this.pickerSelect.style.marginTop = this.initMarginTop + 'px';

        this.onChange();
    }

    getSelected(value,index){
        if(!!this.props.selected){
            return value==this.props.selected? 'selected':'';
        }else{
            return index==0? 'selected':'';
        }
    }

    setSelected(index){
        for(let i=0; i<this.itemLength; i++){
            this.pickerSelect.children[i].setAttribute('class','');
            if(i==index){
                let selectedChild = this.pickerSelect.children[i];
                selectedChild.setAttribute('class','selected');
                this.selected = selectedChild.getAttribute('value');
                this.selectedName = selectedChild.getAttribute('name');
            }
        }
    }

    onDrag(event, position){
        this.preY = position.start.y;
        this.Y = position.move.y;
        this.distance = this.Y - this.preY;

        if(this.distance==0) return;

        if(this.initMarginTop + this.distance >= this.itemHeight*this.HALF_NUMBER) return;
        if(this.initMarginTop + this.distance <= this.itemHeight*(this.HALF_NUMBER+1) - this.itemHeight*this.itemLength) return;

        this.prevMarginTop = this.initMarginTop + this.distance;
        this.pickerSelect.style.marginTop = this.prevMarginTop + 'px';
    }

    onDrop(){
        if(this.distance==0) return;
        // 停留在准确的位置
        this.selectedItemIndex = Math.floor((this.itemHeight*this.HALF_NUMBER-this.prevMarginTop)/this.itemHeight);

        if((this.itemHeight*this.HALF_NUMBER-this.prevMarginTop)%this.itemHeight >= this.itemHeight/2){
            this.selectedItemIndex = this.selectedItemIndex+1;
        }

        this.prevMarginTop = this.itemHeight*this.HALF_NUMBER - this.itemHeight*this.selectedItemIndex;
        this.pickerSelect.style.marginTop = this.prevMarginTop + 'px';

        this.setSelected(this.selectedItemIndex);

        this.initMarginTop = this.prevMarginTop;

        this.onChange();
    }

    onChange(){
        this.props.onChange(this.selected, this.selectedName);
    }

    render(){
        let _this = this;
        let {data, selected} = this.props;
        
        return (
            <Drag className="picker-drag" onDrag={this.onDrag} onDrop={this.onDrop}>
                <ul className="picker-select" ref={(pickerSelect)=>{this.pickerSelect=pickerSelect}}>
                    {
                        data.map(function(item, index){
                            return <li key={index} 
                                    data-index={index}
                                    value={item.value} 
                                    name={item.name}
                                    className={_this.getSelected(item.value,index)}
                                    >{item.name}</li>
                        })
                    }
                </ul>
            </Drag>
            
        )
    }
}
