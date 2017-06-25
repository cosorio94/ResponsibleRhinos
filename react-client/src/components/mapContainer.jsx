import React from 'react';
// import Map from 'google-maps-react';
import {GoogleApiWrapper} from 'GoogleMapsReactComponent';
import GOOGLE_API_KEY from '../google/googleAPI.js';

export class MapContainer extends React.Component { 

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="mapContainer">
    </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(MapContainer);