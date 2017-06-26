import React from 'react';
import Paper from 'material-ui/Paper';

class Map extends React.Component{ 

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      // let {initialCenter, zoom} = this.props;
      // const {lat, lng} = initialCenter;
      const center = new maps.LatLng(38, 122);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      });
      this.map = new maps.Map(node, mapConfig);
    }
  }

  render() {
    return (
    <Paper className="mainMap" ref='map'>
      Loading map...
    </Paper>
    );
  }
}


export default Map;