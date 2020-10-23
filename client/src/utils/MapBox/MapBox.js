import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import { MdLocationOn } from 'react-icons/md';
import _ from 'lodash';

const MapBox = ({ locations, startLocation }) => {
  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiZHpvbmlibGVqYSIsImEiOiJjazcxcjZkbWowMXV3M2ZudzhmMGM2YjNkIn0.wVjBsjzG2SIyZVhL-EA-kQ',
  });

  return (
    <Map
      style="mapbox://styles/dzonibleja/ckfjf8zmi0m5719lb9k82xa8j"
      containerStyle={{
        height: '100vh',
        width: '100%',
        clipPath: 'polygon(0 11rem, 100% 0, 100% calc(100% - 11rem), 0 100%)',
        marginTop: '-11rem',
      }}
      center={[startLocation.coordinates[0], startLocation.coordinates[1]]}
      zoom={[5]}
    >
      {}
      {locations.map((el) => {
        return (
          <Marker
            coordinates={[el.coordinates[0], el.coordinates[1]]}
            anchor="bottom"
          >
            <MdLocationOn style={{ fontSize: '4rem' }} />
          </Marker>
        );
      })}

      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[19.8322703, 45.242438]} />
      </Layer>
    </Map>
  );
};

export default MapBox;
