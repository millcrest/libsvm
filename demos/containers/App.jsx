import React, { Component } from 'react';
import { throttle } from 'lodash-es';
import { connect } from 'react-redux';
import {
  Route,
  HashRouter as Router,
  Redirect,
  Switch,
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
          <Navigation />
          <Switch>
            <Redirect exact from="/" to="/SVC" />
            <Route exact path="/SVC" component={SVC} />
            <Route exact path="/SVR" component={SVR} />
            <Route exact path="/SVC/OneClass" component={OneClassSVC} />
            <Route exact path="/benchmarks" component={Benchmarks} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null, { updateStyleBreakpoint })(App);
