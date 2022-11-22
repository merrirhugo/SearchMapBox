import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from 'mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVnb21lcnJpciIsImEiOiJja3N0ZnB5djcxNXRnMnF0ZnVqZnppNnM4In0.Zvob6FKrKNsUkesh-ZU-KQ';

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(3.057256);
    const [lat, setLat] = useState(50.62925);
    const [zoom, setZoom] = useState(12.5);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
        });
        // Initialize the GeolocateControl.
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
            });
            // Add the control to the map.
            map.current.addControl(geolocate);
            // Set an event listener that fires
            // when a geolocate event occurs.
            geolocate.on('geolocate', () => {
            console.log('A geolocate event has occurred.');
            })
            map.current.addControl(
                new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
                })
                );;
    });



        useEffect(() => {
            if (!map.current) return; // wait for map to initialize
            map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
            });
        });

        return (
            <div>
                <h1 className='title'>SearchMapBox</h1>
                <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={mapContainer} className="map-container" />
            </div>
        );
}