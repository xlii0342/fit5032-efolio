<template>
      <div>
     
        <div id="geocoder" class="geocoder-container"></div>
    
     
        <div id="map" class="map-container"></div>
      </div>
</template>
    
    <script setup>
    import { onMounted } from 'vue';
    import mapboxgl from 'mapbox-gl';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
    import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
    

    const mapboxToken = 'pk.eyJ1IjoieGlueXVsaTAzIiwiYSI6ImNtMjA4bXgxbTBnMjcycW9lbmNjcW9odzYifQ._PVUTUHZrXZ_LZ-P3KVJhQ';
    

    onMounted(() => {

      mapboxgl.accessToken = mapboxToken;
    
  
      const map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [114.1694, 22.3193],
        zoom: 12 
      });
    
      
      map.addControl(new mapboxgl.NavigationControl());
    
    
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: 'Search for places',
        mapboxgl: mapboxgl,
        proximity: { longitude: 114.1694, latitude: 22.3193 }, 
        types: 'poi'
      });

      document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    
    
      geocoder.on('result', (e) => {
        new mapboxgl.Marker().setLngLat(e.result.center).addTo(map);
      });
    
    
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric', 
        profile: 'mapbox/driving', 
        interactive: false 
      });
    
  
      map.addControl(directions, 'top-right');
    
     
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = [position.coords.longitude, position.coords.latitude];
            console.log('User location:', userLocation);
    
         
            directions.setOrigin(userLocation);
    
            
    
            new mapboxgl.Marker().setLngLat(userLocation).addTo(map);
    
           
            map.setCenter(userLocation);
          },
          (error) => {
            console.error('Error getting location:', error);
           
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    });
    </script>
    
    <style scoped>
  
    .map-container {
      width: 100%;
      height: 600px;
      position: relative; 
    }
    
   
    .geocoder-container {
      top: 60px;
      left: 10px;
      z-index: 1000; 
      width: 50%; 
    }
    
   
    .mapboxgl-ctrl-geocoder {
      z-index: 1001;
    }

  
    </style>
       