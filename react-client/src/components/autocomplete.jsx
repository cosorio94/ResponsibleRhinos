import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from 'material-ui/MenuItem';

export class Autocomplete extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentDidUpdate(prevProps) {
    const {google} = this.props;
    const map = window.map;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }
  
  componentDidMount() {
    this.renderAutoComplete();
  }
  
  renderAutoComplete() {
    console.log('render!!!');
    const {google} = this.props;
    const map = window.map;
    if (!google || !map) { return; }
    
    const autocompleteRef = this.refs.autocomplete;
    console.log(this.refs);
    const autocompleteNode = ReactDOM.findDOMNode(autocompleteRef);
    var autocomplete = new google.maps.places.Autocomplete(autocompleteNode);
    autocomplete.bindTo('bounds', map);
    
    autocomplete.addListener('place_changed', () => {
      console.log('Hrey?');
      const place = autocomplete.getPlace();
      this.props.searchPlace(place, map);
    });
  }
  
  render() {
    return (
      <MenuItem>
        <input
          type="text" 
          ref="autocomplete"/>
      </MenuItem>  
    );
  }
}

export default Autocomplete;