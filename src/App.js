import React from "react";
import './App.css';
import MapContainer from './containers/Map';
import { connect } from 'react-redux';
import { setContent }from './actions/contentActions';

function App(state) {

  return (
    <div className="App">
      <header className="App-header">
        <MapContainer {...state} />
      </header>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    content: state.content
  }
};
const mapDispatchToProps = dispatch => {
  dispatch(setContent)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
