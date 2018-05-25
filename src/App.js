import React, { Component } from 'react';
import ko from 'knockout';
// import logo from './logo.svg';
import './App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devexpress-reporting/css/web-document-viewer-light.min.css';
import 'devextreme/data/utils';
//import { Html } 'devexpress-reporting';
const viewerHtml = require('devexpress-reporting/dx-web-document-viewer').Html;

class ReportViewer extends React.Component {
  constructor(props) {
    super(props);
    this.reportUrl = ko.observable(props.reportUrl);
    // this.requestOptions = {
    //   host,
    //   invokeAction: 'WebDocumentViewer/Invoke'
    // };
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
        //requestOptions: this.requestOptions
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

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    //    this.state = { value: 'report/1' };
    this.state = {};
    // this.state = { value: 'Products', reports: [] };
    // this.handleChangeValue = this.handleChangeValue.bind(this);
    this.loadReport = this.loadReport.bind(this);
  }
  componentDidMount() {
    // var self = this;
    // $.post(host + 'WebDocumentViewer/GetReports').done(result => {
    //   self.setState({ reports: result });
    // });
  }
  // handleChangeValue(event) {
  //   this.setState({ value: event.target.value });
  // }
  loadReport() {
    console.log('loading report');
    this.setState({ value: 'report/1' });
  }
  render() {
    // var options = [];
    // for (var i = 0; i < (this.state.reports || []).length; i++)
    //   options.push(
    //     <option value={this.state.reports[i].Value}>
    //       {this.state.reports[i].Value}
    //     </option>
    //   );
    return (
      <div>
        <button onClick={this.loadReport}>Click me</button>
        <div className="fullscreen">
          {/*        <select
          name="reports"
          value={this.state.value}
          onChange={this.handleChangeValue}
        >
          {options}
        </select>
        */}
          <ReportViewer reportUrl={this.state.value} />
        </div>
      </div>
    );
  }
}

export default App;
