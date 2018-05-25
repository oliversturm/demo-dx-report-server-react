import React, { Component } from 'react';
import ko from 'knockout';
import './App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devexpress-reporting/css/web-document-viewer-light.min.css';
import 'devextreme/data/utils';
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
    ko.applyBindings(
      {
        reportUrl: this.reportUrl,
        remoteSettings: {
          serverUri: 'http://192.168.1.234:83',
          authToken:
            'yuBSRvLwGMQJAUSTbVxdml45zI_4tPPmFoVzymmgPbTr21Qb-zIUTmP4HAh5UdLGN7rUM-cT3CZNvBQC6XW8strA56edyWsit8qxO3ibuRStGy0_BXUGTJDh6x0KQp4-PQMsFAorQUXtxQLIzRZwk1aYaox21sYBAunTKJw1lfylvR6fp7nMFUlmppNhuBn0ONT9Z07ywjPK8oHO-okOB9SlAVD4EXJLC8yf_cLIAtBBkxtDBkUJZrhwuMqkVeJERsLmNcuSAN34D_u0_OIggyNBpYAbi_QjHdHjLtldvhQ'
        }
      },
      this.refs.viewer
    );
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
