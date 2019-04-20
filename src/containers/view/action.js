import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Util from 'helpers/util.lib';
import { closeReport } from 'modules/database.reducer';

import ScoreAction from './score.action';
import SupportAction from './support.action';


class Action extends Component {
  constructor() {
    super();

    this.state = {
      visible: null,
      error: null,
      txId: null,
    }

    this.message = this.message.bind(this);
    this.openScore = this.openScore.bind(this);
    this.openSupport = this.openSupport.bind(this);
    this.done = this.done.bind(this);
    this._closeReport = this._closeReport.bind(this);
  }

  message() {
    if (this.state.error) return <div className="row">
      <div className="col-12">
        <p className="error-msg-plain italic">{this.state.error}</p>
      </div>
    </div>
    if (this.state.txId) return <div className="row">
      <div className="col-12">
        <p className="success-msg-plain italic">Success!</p>
        <a href={Util.linkTxScan(this.props.work.NETWORK, this.state.txId)} target="_blank" rel="noopener noreferrer">View on Scan: {this.state.txId}</a>
      </div>
    </div>
    return null;
  }

  openScore() {
    this.setState({ visible: null }, () => {
      this.setState({ visible: 'score' });
    });
  }

  openSupport() {
    this.setState({ visible: null }, () => {
      this.setState({ visible: 'support' });
    });
  }

  done(er, txId) {
    if (er) return this.setState({
      visible: null,
      error: er,
      txId: null
    });
    return this.setState({
      visible: null,
      error: null,
      txId: txId
    });
  }

  _closeReport(hash) {
    this.props.closeReport(Util.decodeIPFSHash(hash)).then(txId => {
      this.setState({
        txId: txId,
        error: null
      });
    }).catch(er => {
      this.setState({
        txId: null,
        error: 'Cannot close this report'
      });
    });
  }

  render() {
    var hash = this.props.hash;
    if (!hash) return null;

    return (
      <div style={{ "width": "100%" }}>

        {this.state.visible ? null : <div className="row">
          <div className="col-12">
            <div className="box">
              <div className="row">
                <div className="col">
                  <p className="lengthy">ADR/ADE {Util.decodeIPFSHash(hash)}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button className="my-btn secondary no-margin" onClick={this.openSupport}>Support</button>
                </div>
                <div className="col-4">
                  <button className="my-btn primary no-margin" onClick={this.openScore}>Score</button>
                </div>
                <div className="col-4">
                  <button className="my-btn primary no-margin" onClick={() => { this._closeReport(hash) }}>Close</button>
                </div>
              </div>

              {this.message()}
            </div>
          </div>
        </div>}

        {this.state.visible === "score" ? <ScoreAction hash={Util.decodeIPFSHash(hash)} done={this.done} /> : null}
        {this.state.visible === "support" ? <SupportAction hash={Util.decodeIPFSHash(hash)} done={this.done} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  database: state.database,
  work: state.work
});

const mapDispatchToProps = dispatch => bindActionCreators({
  closeReport: (hash) => closeReport(hash),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
