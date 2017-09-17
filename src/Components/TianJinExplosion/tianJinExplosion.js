import React, { Component } from 'react'
import { render } from 'react-dom'
import tianjinData from './tianjin.js'

class Explosion extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentObj : []
        }
    }
    initImg(id, callback) {
        fetch(`http://192.168.44.85:8080/url/${id}`)
            .then((res) => {
                if (res.status !== 200) {
                    console.log(res.status); return;
                }
                res.json().then((data) => {

                    callback(data);

                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    componentDidMount(){
        const re = this;
        //先变为3D
        window.earth.scene.mode = Engine.SceneMode.SCENE3D;
       //视角跳转至中国
        window.earth.camera.flyTo({
            destination : Engine.Cartesian3.fromDegrees(117.56, 39.01, 120000.0)
        }); 
        re.initImg(1, (data) => {
                    let a = data.results.url;
                    a = a.replace('[abc]', 'a');
                    const layer = new GeoVis.TileLayer(a,
                        { projection: 'EPSG:900913' }
                    ).addTo(window.earth.layers);
                });


        let i = 1;  
        console.log(tianjinData.length)
        let dataLength = tianjinData.length > 2000 ? 2000 : tianjinData.length;
        let addpoint = setInterval(function(){
            if(i >= dataLength){
                clearInterval(addpoint)
            }
            let markerpoint = new GeoVis.PointMarker([ tianjinData[i][1] , tianjinData[i][2] , 0 ], {id: `marker_${i}`,color: GeoVis.Color.RED});
            markerpoint.addTo(window.earth.features);
            markerpoint.bindPopup("<b>"+tianjinData[i][0]+"</b><br>"+tianjinData[i][4]+"",{
                maxWidth: 120
            })
            re.state.currentObj.push(markerpoint)
            i++;
        },50) 
    }
    componentWillUnmount(){
        //删除
        this.state.currentObj.map( (val,index) => {
            val.removeFrom(window.earth.features);
        })        
    }
    render(){
        return (
            <div />
        )
    }
}
export default Explosion