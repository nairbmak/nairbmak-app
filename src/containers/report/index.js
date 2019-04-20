import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Util from 'helpers/util.lib';

import { setIPFS } from 'modules/ipfs.reducer';
import { submitReport } from 'modules/database.reducer';

import ComponentOne from './componentOne';
import ComponentTwo from './componentTwo';
import ComponentThree from './componentThree';
import ComponentFour from './componentFour';
import ComponentFive from './componentFive';


class Report extends Component {
  constructor() {
    super();

    this.state = {
      reset: true,
      successMsg: null,
      txId: null,
      errorMsg: null
    }

    this.data = {};
    this.reviewers = [];
    this.linkReportToView = this.linkReportToView.bind(this);
    this.reset = this.reset.bind(this);
    this.submit = this.submit.bind(this);
    this.message = this.message.bind(this);
    this.onData = this.onData.bind(this);
    this.onReviewers = this.onReviewers.bind(this);
  }

  linkReportToView(hash) {
    this.props.history.push('/view/' + hash);
  }

  reset() {
    this.setState({ reset: false }, () => {
      this.setState({ reset: true });
    });
  }

  submit() {
    this.props.setIPFS(this.data).then(re => {
      this.props.submitReport(Util.decodeIPFSHash(re.hash), this.reviewers).then(txId => {
        this.setState({
          successMsg: re.hash,
          txId: txId,
          errorMsg: null
        });
      }).catch(er => {
        console.error(er);
        this.setState({
          successMsg: null,
          errorMsg: 'Cannot submit report.'
        });
      });
    }).catch(er => {
      console.error(er);
      this.setState({
        successMsg: null,
        errorMsg: 'Cannot submit report.'
      });
    });
  }

  message() {
    if (this.state.errorMsg) return (<p className="error-msg italic">{this.state.errorMsg}</p>);
    if (this.state.successMsg) return (<p className="success-msg italic">Success!<br />
      {!this.state.successMsg ? null : <a href="javascript:void(0)" onClick={() => { this.linkReportToView(this.state.successMsg) }}>Review the report: {this.state.successMsg}</a>}<br />
      {!this.state.txId ? null : <a href={Util.linkTxScan(this.props.work.NETWORK, this.state.txId)} target="_blank" rel="noopener noreferrer">View on Scan: {this.state.txId}</a>}
    </p>);
    return null;
  }

  onData(re) {
    this.data = { ...this.data, ...re };
  }

  onReviewers(re) {
    this.data = { ...this.data, ...re };
    this.reviewers = re.ParticularsOfReviewers.ListOfReviewerAddresses;
  }

  render() {
    return (
      !this.state.reset ? null : // Tricky reset components
        <div className="wrapper animated fadeInUp">
          <div className="container">

            <div className="row">
              <h1 className="col-12">I. DETAILS OF ADVERSE DRUG REACTION (ADR)</h1>
            </div>
            <ComponentOne onData={this.onData} />

            <div className="row">
              <h1 className="col-12">II. DETAILS OF DRUGS SUSPECTED TO HAVE CAUSED THE ADR</h1>
            </div>
            <ComponentTwo onData={this.onData} />

            <div className="row">
              <h1 className="col-12">III. THE ADR ASSESSMENT</h1>
            </div>
            <ComponentThree onData={this.onData} />

            <div className="row">
              <h1 className="col-12">IV. PARTICULARS OF REPORTER</h1>
            </div>
            <ComponentFour onData={this.onData} />

            <div className="row">
              <h1 className="col-12">V. PARTICULARS OF REVIEWERS</h1>
            </div>
            <ComponentFive onData={this.onReviewers} />

            <div className="row">
              <div className="col-8">
                {this.message()}
              </div>
              <div className="col-2">
                <button className="my-btn cancel large" onClick={this.reset}>Cancel</button>
              </div>
              <div className="col-2">
                <button className="my-btn primary large" onClick={this.submit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  work: state.work,
  ipfs: state.ipfs,
  database: state.database
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setIPFS: (data) => setIPFS(data),
  submitReport: (hash, reviewers) => submitReport(hash, reviewers)
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);