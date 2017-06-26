import React from 'react';
import MenuItem from 'material-ui/MenuItem';

export class Autocomplete extends React.Component {

  constructor(props) {
    super(props);
  } 
  
  renderAutoComplete() {
    const {google} = this.props;
    const map = window.map;
    if (!google || !map) { return; }
    
    const autocompleteRef = this.refs.autocomplete;
    console.log(this.refs);
    const autocompleteNode = ReactDOM.findDOMNode(autocompleteRef);
    var autocomplete = new google.maps.places.Autocomplete(autocompleteNode);
    autocomplete.bindTo('bounds', map);
    
    autocomplete.addListener('place', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) { return; }
      
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      
      this.setMapStateCenter();
      this.setState({
        currentPlace: place,
        currentPlacePosition: place.geometry.location
      });
    });
  }
  
  render() {
    return (
      <MenuItem>
        <input
          type="text" 
          ref="autocomplete" 
          onChange={this.textChange.bind(this)}/>
      </MenuItem>  
    );
  }
}