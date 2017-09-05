import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from 'material-ui/MenuItem';

export class Autocomplete extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentDidUpdate(prevProps) {
    const {google, map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }
  
  componentDidMount() {
    this.renderAutoComplete();
  }
  
  renderAutoComplete() {
    const {google, map} = this.props;
    if (!google || !map) { return; }
    
    const autocompleteRef = this.refs.autocomplete;
    const autocompleteNode = ReactDOM.findDOMNode(autocompleteRef);
    var autocomplete = new google.maps.places.Autocomplete(autocompleteNode);
    autocomplete.bindTo('bounds', map);
    
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.props.searchPlace(place, map);
    });
  }
  
  render() {
    return (
      <input
        type="text" 
        ref="autocomplete"/>
    );
  }
}

export default Autocomplete;