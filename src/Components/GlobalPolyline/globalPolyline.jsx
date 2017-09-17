import React, { Component } from 'react'
import { render } from 'react-dom'
import hangxianData from './hangxian.js'

class GlobalPolyline extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentObj : []
        }
    }
    componentDidMount(){
        //先变为3D
        window.earth.scene.mode = Engine.SceneMode.SCENE2D;
        //视角跳转至中国
        window.earth.camera.flyTo({
            destination : Engine.Cartesian3.fromDegrees(116.16, 40.11, 40000000.0)
        });
        const re = this;
        for(let j=0;j<6700;j++){
            if(hangxianData[0][j]){
                let beser = new GeoVis.BezierCurve({start: [ hangxianData[0][j].D_lon, hangxianData[0][j].D_lat, 0], end: [hangxianData[0][j].S_lon, hangxianData[0][j].S_lat, 0.0], color: GeoVis.Color.fromCssString('#66FEFF').withAlpha(0.7) , width : 0.8});
                re.state.currentObj.push(beser)
                beser.addTo(earth); 
            } 
            if(hangxianData[1][j]){
                let beser = new GeoVis.BezierCurve({start: [ hangxianData[1][j].D_lon, hangxianData[1][j].D_lat, 0], end: [hangxianData[1][j].S_lon, hangxianData[1][j].S_lat, 0.0], color: GeoVis.Color.fromCssString('#EA8036') , width : 0.5});
                re.state.currentObj.push(beser)
                beser.addTo(earth); 
            } 
            if(hangxianData[2][j]){
                let beser = new GeoVis.BezierCurve({start: [ hangxianData[2][j].D_lon, hangxianData[2][j].D_lat, 0], end: [hangxianData[2][j].S_lon, hangxianData[2][j].S_lat, 0.0], color: GeoVis.Color.fromCssString('#7ADC46').withAlpha(1) , width : 0.8});
                re.state.currentObj.push(beser)
                beser.addTo(earth); 
            }  
            if(hangxianData[3][j]){
                let beser = new GeoVis.BezierCurve({start: [ hangxianData[3][j].D_lon, hangxianData[3][j].D_lat, 0], end: [hangxianData[3][j].S_lon, hangxianData[3][j].S_lat, 0.0], color: GeoVis.Color.fromCssString('#66FEFF').withAlpha(0.7) , width : 0.8});
                re.state.currentObj.push(beser)
                beser.addTo(earth); 
            } 
        }
    }
    componentWillUnmount(){
        //删除
        this.state.currentObj.map( (val,index) => {
            val.removeFrom(window.earth);
        })        
    }
    render(){
        return (
            <div />
        )
    }
}
export default GlobalPolyline;