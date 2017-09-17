import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './navSlider.css';
import Button from '../Button/button';
import ButtonList from '../ButtonList/buttonList';
const imgList = [
    {
        title: 'tongji',
        list: {
            img: "./src/assets/tongji.png",
            name: "统计",
            pValue: '当前专题没有统计数据',
            index: 'button4',
        }
    },
    {
        title: 'shixu',
        list: {
            img: "./src/assets/shixu.png",
            name: "时序",
            pValue: '当前专题没有时序数据',
            index: 'button5',
        }
    },
    {
        title: 'fenji',
        list: {
            img: "./src/assets/fenji.png",
            name: "分级",
            pValue: '当前专题没有等级数据',
            index: 'button6',
        }
    }
]
class ButtonList2 extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.refs.imgList.style.display = imgList[0]=== ''&&imgList[1]=== ''&&imgList[2] === '' ? 'none' : 'block';
    }
    componentDidUpdate(){
        this.refs.imgList.style.display = imgList[0]=== ''&&imgList[1]=== ''&&imgList[2] === '' ? 'none' : 'block';
    }
    render() {
        if (this.props.isTongji && imgList[0] === '') {
            imgList.splice(0, 1, {
                title: 'tongji',
                list: {
                    img: "./src/assets/tongji.png",
                    name: "统计",
                    pValue: '当前专题没有统计数据',
                    index: 'button4',
                }
            }, )
        } else if (!this.props.isTongji && imgList[0] !== '') {
            imgList.splice(0, 1, '');
        }


        if (this.props.isShixu && imgList[1] === '') {
            imgList.splice(1, 1, {
                title: 'shixu',
                list: {
                    img: "./src/assets/shixu.png",
                    name: "时序",
                    pValue: '当前专题没有时序数据',
                    index: 'button5',
                }
            }, )
        } else if (!this.props.isShixu && imgList[1] !== '') {
            imgList.splice(1, 1, '');
        }


        if (this.props.isFenji && imgList[2] === '') {
            imgList.splice(2, 1, {
                title: 'fenji',
                list: {
                    img: "./src/assets/fenji.png",
                    name: "分级",
                    pValue: '当前专题没有等级数据',
                    index: 'button6',
                }
            })
        } else if (!this.props.isFenji && imgList[2] !== '') {
            imgList.splice(2, 1,'');
        }


        return (
            <div className={styles["sliderWrap2"]} ref='imgList'>
                {
                    imgList.map((val, index2) =>
                    { if (val !== '') { return <Button key={index2} events={this.props.clickfun} buttonImg={val.list.img} index={val.list.index} buttonName={val.list.name} pValue={val.list.pValue} /> } }
                    )
                }
            </div>
        )
    }
}
class NavSlider extends Component {
    render() {
        return (
            <div className={styles["navSlider"]}>
                <ButtonList />
                <ButtonList2 clickfun={this.props.clickfunction} isShixu={this.props.isShixu} isFenji={this.props.isFenji} isTongji={this.props.isTongji} />

            </div>
        )
    }
}
export default NavSlider;
