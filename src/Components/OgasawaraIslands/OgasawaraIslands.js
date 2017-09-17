import React, { Component } from 'react';
import { render } from 'react-dom';

import styles from './OgasawaraIslands.css';

const GeoVis = window.GeoVis;
const Engine = window.Engine;
export default class OgasawaraIslands extends Component {
    componentWillMount() {
        this.state = {
            isPanorama: false,
            lon: 0,
            lat: 0,
            yaw: 0
        }
    }
    componentDidMount() {
        const state = this.state;
        // 添加两条路矢量
        this.earth = window.earth;
        this.layer = new GeoVis.TileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            projection: 'EPSG:900913'
        }).addTo(this.earth.layers);
        const url = '';
        this.earth.scene.mode = Engine.SceneMode.SCENE3D;
        this.earth.camera.flyTo({
            destination: Engine.Cartesian3.fromDegrees(142.204728, 27.018492, 5000.0),
            orientation: {
                heading: Engine.Math.toRadians(0.0),
                pitch: Engine.Math.toRadians(-35.0),
                roll: 0.0
            }
        });
    }

    componentWillUnmount() {
        this.layer.removeFrom(this.earth.layers);
        if (this.marker) {
            this.marker.removeFrom(this.earth.features);
            this.marker = undefined;
        }

    }

    getBBOX(earth) {
        const positionArray = [];
        let leftUp = { x: 0, y: 0 }, rightUp = { x: 0, y: 0 }, leftDown = { x: 0, y: 0 }, rightDown = { x: 0, y: 0 };
        let upHeight = 0;
        let windowPositionsLeftUp = new Engine.Cartesian2(0, upHeight);
        let cartesian = earth.camera.pickEllipsoid(windowPositionsLeftUp, earth.scene.globe.ellipsoid);
        while (!Engine.defined(cartesian) && upHeight < screen.height) {
            windowPositionsLeftUp = new Engine.Cartesian2(0, upHeight);
            cartesian = earth.camera.pickEllipsoid(windowPositionsLeftUp, earth.scene.globe.ellipsoid);
            upHeight++;
        }
        if (Engine.defined(cartesian)) {
            const cartographic = Engine.Cartographic.fromCartesian(cartesian);
            const longitudeString = Engine.Math.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = Engine.Math.toDegrees(cartographic.latitude).toFixed(6);
            leftUp = { x: longitudeString, y: latitudeString };
        }
        const windowPositionsRightUp = new Engine.Cartesian2(screen.width, upHeight);
        cartesian = earth.camera.pickEllipsoid(windowPositionsRightUp, earth.scene.globe.ellipsoid);
        if (Engine.defined(cartesian)) {
            const cartographic = Engine.Cartographic.fromCartesian(cartesian);
            const longitudeString = Engine.Math.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = Engine.Math.toDegrees(cartographic.latitude).toFixed(6);
            rightUp = { x: longitudeString, y: latitudeString };
        } else
            rightUp = leftUp;
        const windowPositionsLeftDown = new Engine.Cartesian2(0, screen.height);
        cartesian = earth.camera.pickEllipsoid(windowPositionsLeftDown, earth.scene.globe.ellipsoid);
        if (Engine.defined(cartesian)) {
            const cartographic = Engine.Cartographic.fromCartesian(cartesian);
            const longitudeString = Engine.Math.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = Engine.Math.toDegrees(cartographic.latitude).toFixed(6);
            leftDown = { x: longitudeString, y: latitudeString };
        }
        const windowPositionsRightDown = new Engine.Cartesian2(screen.width, screen.height);
        cartesian = earth.camera.pickEllipsoid(windowPositionsRightDown, earth.scene.globe.ellipsoid);
        if (Engine.defined(cartesian)) {
            const cartographic = Engine.Cartographic.fromCartesian(cartesian);
            const longitudeString = Engine.Math.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = Engine.Math.toDegrees(cartographic.latitude).toFixed(6);
            rightDown = { x: longitudeString, y: latitudeString };
        }
        positionArray.push(Math.min(leftUp.x, rightUp.x, leftDown.x, rightDown.x));
        positionArray.push(Math.min(leftUp.y, rightUp.y, leftDown.y, rightDown.y));
        positionArray.push(Math.max(leftUp.x, rightUp.x, leftDown.x, rightDown.x));
        positionArray.push(Math.max(leftUp.y, rightUp.y, leftDown.y, rightDown.y));
        return positionArray;
    }

    fetchData(url, callback) {
        fetch(url).then((response) => {
            // console.log(response);
            response.json().then((data) => {
                callback(data);
            });
        }).catch((err) => { console.error(err); });
    }

    render() {
        const canvas = document.getElementById('geovis-earth');
        const panoWidth = canvas.offsetWidth / canvas.offsetHeight > 1.2 ? canvas.offsetHeight * 1.2 / 2 + 70 : canvas.offsetWidth;
        const panoStyle = {
            width: `${panoWidth}px`,
            height: `${canvas.offsetHeight / 2}px`,
            left: `${(canvas.offsetWidth - panoWidth) / 2}px`
        }
        const panorama = this.state.isPanorama === true ? (
            <div className={styles.panorama} style={panoStyle}>
                <div className={styles.close} onClick={this.close.bind(this)}></div>
                <iframe
                  width="100%"
                  height="100%"
                  allowFullScreen={true}
                  className={styles.panorama}
                  src={`./google_sqlite.html?lon=${this.state.lon}&lat=${this.state.lat}&yaw=${this.state.yaw}`}
                >
                </iframe>
            </div>
        ) : null;
        return (
            <div>
                {panorama}
            </div>
        );
    }
}
