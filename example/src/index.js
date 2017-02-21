import React,{Component} from 'react'
import ReactDOM from 'react/lib/ReactDOM'
import {FormGroup, Row, Col, Input} from 'phoenix-ui'
import 'whatwg-fetch'

import Picker from '../../src/index'

class Example extends Component{

    constructor(props, context) {
        super(props, context)

        this.onShow = this.onShow.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            visible: false,
            data: [],
            name: '西安',
            selected: 35001 // select
            // name: [福建省,],
            // selected: [34000,34200,34210] // cascade
        }

        this.getData()
    }

    getData(){ // type对应数据格式参考mocks
        let _this = this;
        fetch('../mocks/data-select.json')
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                _this.setState({
                    data: json
                })
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
    }

    setValue(key,e){
        let o = {}
        o[key || e.target.name] = e.target.value
        this.setState(o)
    }

    onShow(){
        this.setState({
            visible: true
        })
    }

    onClose(){
        this.setState({
            visible: false
        })
    }

    onChange(selected, selectedName){
        this.setState({
            visible: false,
            selected: selected,
            name: selectedName
        })
    }

    render(){
        return (
            <div>
                <FormGroup>
                    <Row>
                        <Col>
                            <a href="###" className="navigate-right" onClick={this.onShow}>
                                <label>选择城市</label>
                                <Input type="text" placeholder={this.state.name} disabled/>
                            </a>
                        </Col>
                    </Row>
                </FormGroup>

                <Picker type='select'
                    visible={this.state.visible}
                    title='请选择城市'
                    data={this.state.data}
                    selected={this.state.selected}
                    onChange={this.onChange}
                    onClose={this.onClose}
                ></Picker>
            </div>
        )
    }
}

ReactDOM.render(
    <Example />,
    document.getElementById('root')
)
