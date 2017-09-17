import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './button.css';
class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            altShow: false,
            pShow: false,
            name: '',
            text: '',
        };
      
    }
    onmouseover() {
        this.setState(
            { altShow: true },

        );
    }
    onmouseleave() {
        this.setState(
            { altShow: false },
        )
    }
    onclick() {

        
        // let timer = setTimeout(
        //     (this.setState(
        //         { pShow: false },
        //     )),5000
        // )
    }
    render() {
        let style,img;
        this.state.name = this.state.altShow ? this.props.buttonName : '';
        this.state.text = this.state.pShow ? this.props.pValue : '';
        img= this.state.altShow? <img src='./src/assets/低栏.png' alt="w" /> : '';
        switch(this.props.index){
            case 'button4':style=styles.button4;break;
            case 'button5':style=styles.button4;break;
            case 'button6':style=styles.button6;break;
        };
        return (
            <div className={style}>
                <button onClick={this.props.events} onMouseLeave={this.onmouseleave.bind(this)} onMouseEnter={this.onmouseover.bind(this)}>{this.props.value}<img src={this.props.buttonImg} /></button>
                {img}
                <span>{this.state.name}</span> 
            </div>
        )
    }
}


export default Button