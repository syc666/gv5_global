import React, {Component} from 'react'
import {render} from 'react-dom'
import styles from './themeDom.css'
import ThemeHead from '../ThemeHead/themeHead'
import SmartG from '../SmartG/smartg.jsx'
import NavSlider from '../NavSlider/navSlider.jsx'

class ThemeDom extends Component {
    constructor(props){
        super(props);
        this.state={
            isShixu:false,
            isFenji:false,
            isTongji:false,
        }
    }
    onChildClick(e){
        let innerText = e.target.innerText;
        if( innerText==='天津爆炸微博评论'|| innerText==='北京地质灾害分布'){  
            this.setState({
                isShixu:true,
                isFenji:false,
                isTongji:false,
            })
        }else if( innerText==='1970年全球人口数据'||innerText==='中国人口'||innerText==='全球人口'||innerText==='中国就业人口'||innerText==='中国老龄人口比例'){
            this.setState({
                isShixu:false,
                isFenji:false,
                isTongji:true,
            })
        }else{
            this.setState({
                isShixu:false,
                isFenji:false,
                isTongji:false,
            })
        }
    }
    render(){
        return (
            <div className={styles['outer-themesdom']}>
                <ThemeHead></ThemeHead>
                <SmartG onsmartg={this.onChildClick.bind(this)}></SmartG>
                <NavSlider clickfunction={this.props.clickfun} isShixu={this.state.isShixu} isFenji={this.state.isFenji} isTongji={this.state.isTongji}></NavSlider>                
            </div>
        )
    }
}
export default ThemeDom;
