import React from 'react';
import Map from 'google-maps-react';
import {GoogleApiWrapper} from 'google-maps-react';
import GOOGLE_API_KEY from '../google/googleAPI.js';
import Paper from 'material-ui/Paper';


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
    <Paper className="mapContainer" style={style}>
      <Map google={this.props.google} />
    </Paper>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);