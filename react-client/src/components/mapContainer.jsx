import React from 'react';
import Map from 'google-maps-react';
import {GoogleApiWrapper} from 'GoogleMapsReactComponent';
import GOOGLE_API_KEY from '../google/googleAPI.js';

export class MapContainer extends React.Component { 

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    const style = {
      width: '100px',
      height: '100px'
    };
    return (
    <div className="mapContainer" style={style}>
      <Map google={this.props.google} />
    </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);