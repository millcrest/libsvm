import React, { Component } from 'react';
import { throttle } from 'lodash-es';
import { connect } from 'react-redux';
import {
  Route,
  Routes,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';

import { updateStyleBreakpoint } from '../actions/index';
import SVC from '../components/SVC';
import SVR from '../components/SVR';
import OneClassSVC from '../components/OneClassSVC';
import Navigation from '../components/Navigation';

import Benchmarks from './Benchmarks';

class App extends Component {
  componentWillMount() {
    const onResize = () => {
      const breakpoint = window
        .getComputedStyle(document.querySelector('body'), ':before')
        .getPropertyValue('content')
        .replace(/"/g, '');
      this.props.updateStyleBreakpoint(breakpoint);
    };

    window.addEventListener('resize', throttle(onResize, 150));
    onResize();
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navigation replace to="/SVC" />
          <Routes>
            <Route exact path="/" element={<Navigate to="/SVC" />} />
            <Route exact path="/SVC" element={<SVC />} />
            <Route exact path="/SVR" element={<SVR />} />
            <Route exact path="/SVC/OneClass" element={<OneClassSVC />} />
            <Route exact path="/benchmarks" element={<Benchmarks />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default connect(null, { updateStyleBreakpoint })(App);
