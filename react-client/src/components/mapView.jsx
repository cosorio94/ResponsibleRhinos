import React from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './header.jsx';
import MapContainer from './mapContainer.jsx';
import PinInfo from './pininfo.jsx';


class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCenter: {
        lat: 37.774929,
        lng: -122.41941600000001
      },
      zoom: 15,
      currentUser: null,
      markers: [],
      mapId: null,
      currPin: null
    };
    this.updateCenter = this.updateCenter.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.save = this.save.bind(this);
    this.github = this.github.bind(this);
    this.replaceURL = (id) => props.history.push(`?=${id}`);
    this.setCurrPin = this.setCurrPin.bind(this);
    this.updateCurrPinInfo = this.updateCurrPinInfo.bind(this);
  }

  setCurrPin(index) {
    this.setState({
      currPin: index
    });
  }

  componentDidMount() {
    let mapId = window.location.href.split('=')[1];
    if (mapId) {
      this.fetch(mapId);
    }
    axios.get('/user/signedIn')
      .then((res) => {
        this.setState({
          currentUser: res.data[0].user_name
        });
      })
      .catch(err => console.log('signedIn error:', err));
  }

  // Changed this function to accept a marker object instead of only a position.
  addMarker(marker){
    var markers = this.state.markers;
    markers.push(marker);
    this.setState({
      markers: markers
    });
  }


  github() {
    axios.get('/auth/github')
      .then(res => {
        console.log('github response:', res);
      })
      .catch(err => console.log('ERROR:', err));
  }

  update() {
    let state = JSON.stringify(this.state);
    let mapId = window.location.href.split('=')[1];
    axios.put(`/map/${id}`, {state: state})
      .then((res) => {
        console.log(res);
      })
      .catch(err => console.log('put error:', err));
  }

  save() {
    let state = JSON.stringify(this.state);
    axios.post('/map', {state: state})
      .then(res => {
        this.setState({
          mapId: res.data
        });
        console.log("Data is:", res.data);
        this.replaceURL(res.data);
      })
      .catch(err => console.log(err));
  }

  fetch(id) {
    axios.get(`/map/${id}`)
      .then(res => {
        this.setState(res.data);
      })
      .catch(err => console.log('get error:', err));

  }

  updateCenter(center) {
    this.setState({
      currentCenter: center
    });
  }

  updateZoom(zoom) {
    this.setState( {
      zoom: zoom
    });
  }

  updateCurrPinInfo(text){
    let markers = this.state.markers;
    markers[this.state.currPin].info = text;
    this.setState({
      markers: markers
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header
            save={this.save}
            git={this.github}
            currentUser={this.state.currentUser}
          />
          <div style={{height: '0.5em'}}>
          </div>
          <MapContainer
            currentCenter={this.state.currentCenter}
            updateCenter={this.updateCenter}
            updateZoom={this.updateZoom}
            markers={this.state.markers}
            addMarker={this.addMarker}
            zoom={this.state.zoom}
            setCurrPin={this.setCurrPin}
          />
          {this.state.currPin !== null &&
            <PinInfo text={this.state.markers[this.state.currPin].info}
                     updateCurrPinInfo={this.updateCurrPinInfo}/>
          }
          
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MapView;