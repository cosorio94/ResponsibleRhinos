import React from 'react';
import {Marker} from 'google-maps-react';

export class Markers extends React.Component { 
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <span>
        {this.props.markers.map((marker, index, markers) => {
          return (
            <Marker
              position={marker.position}/>
          );
        })}
      </span>
    );
  }
}


export default Markers;