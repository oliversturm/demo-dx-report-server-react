import React, { Component } from 'react';
import ko from 'knockout';
import './App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devexpress-reporting/css/web-document-viewer-light.min.css';
import axios from 'axios';
import qs from 'qs';

const viewerHtml = require('devexpress-reporting/dx-web-document-viewer').Html;

class ReportViewer extends React.Component {
  constructor(props) {
    super(props);
    this.reportUrl = ko.observable(props.reportUrl);
  }
  render() {
    return (
      <div>
        <div ref="innerScript" />
        <div className="fullscreen" data-bind="dxReportViewer: $data" />
      </div>
    );
  }
  componentWillReceiveProps(newProps) {
    this.reportUrl(newProps.reportUrl);
  }
  componentDidMount() {
    this.refs.innerScript.innerHTML = viewerHtml;
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
