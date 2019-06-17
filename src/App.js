import React, { Component } from 'react';
import ko from 'knockout';
import './App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import '@devexpress/analytics-core/dist/css/dx-analytics.light.css';
import '@devexpress/analytics-core/dist/css/dx-analytics.common.css';
import 'devexpress-reporting/dist/css/dx-webdocumentviewer.css';
import 'devexpress-reporting';

import axios from 'axios';
import qs from 'qs';

class ReportViewer extends React.Component {
  constructor(props) {
    super(props);
    this.reportUrl = ko.observable(props.reportUrl);
  }
  render() {
    return (
      <div
        ref="viewer"
        className="fullscreen"
        data-bind="dxReportViewer: $data"
      />
    );
  }
  componentWillReceiveProps(newProps) {
    this.reportUrl(newProps.reportUrl);
  }
  componentDidMount() {
    const baseUrl = 'http://192.168.1.234:83';
    axios
      .post(
        baseUrl + '/oauth/token',
        qs.stringify({
          username: 'sturm',
          password: 'secret',
          grant_type: 'password'
        }),
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }
      )
      .then(r => r.data)
      .then(d => d.access_token)
      .then(token => {
        ko.applyBindings(
          {
            reportUrl: this.reportUrl,
            remoteSettings: {
              serverUri: baseUrl,
              authToken: token
            }
          },
          this.refs.viewer
        );
      });
  }
  componentWillUnmount() {
    ko.cleanNode(this.refs.viewer);
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { reportName: 'report/1' };
  }
  render() {
    return <ReportViewer reportUrl={this.state.reportName} />;
  }
}

export default App;
