import React from 'react';
import Map from 'google-maps-react';
import {GoogleApiWrapper} from 'google-maps-react';
import GOOGLE_API_KEY from '../google/googleAPI.js';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/Refreshindicator';


export class MapContainer extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      initialMapCenter: {
        lat: 37,
        lng: -122
      },
      zoom: 15,
      centerAroundCurrentLocation: true
    }
    this.styles = {
      refresh: {
        position: 'relative'
      },
      mapFlexBox: {
        postition: 'relative',
        display: 'flex',
        width: '95%',
        height: '25em',
        paddingTop: '5em',
        paddingRight: '2em', 
      }
    }
  }

  handleClick(mapProps, map, clickEvent) {
    console.log('event: ', clickEvent);
  }

  render() {
    if (!this.props.loaded) {
      return (
        <RefreshIndicator 
          size={40} 
          left={10} 
          top={0} 
          status='loading'
          style={this.styles.refresh}
        />
      );
    }
    return (
      <Paper zDepth={4} >
        <Map google={this.props.google} style={this.styles.mapFlexBox}
          onClick={this.handleClick.bind(this)}
          centerAroundCurrentLocation={this.state.centerAroundCurrentLocation}/>
      </Paper>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);