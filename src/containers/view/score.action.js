import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BoxText from '../core/boxText';
import { scoreReport } from 'modules/database.reducer';
import Util from 'helpers/util.lib';


class ScoreAction extends Component {
  constructor() {
    super();

    this.state = {
      completeness: 0,
      importance: 0
    }

    this._scoreReport = this._scoreReport.bind(this);
    this.onChange = this.onChange.bind(this);
    this.returnData = this.returnData.bind(this);
  }

  returnData(er, re) {
    return this.props.done(er, re);
  }

  _scoreReport(hash) {
    this.props.scoreReport(Util.decodeIPFSHash(hash), this.state.completeness, this.state.importance).then(txId => {
      this.returnData(null, txId);
    }).catch(er => {
      if (er) this.returnData('Cannot score this report', null);
    });
  }

  onChange(value) {
    this.setState(value);
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <div className="box">
            <div className="row">
              <div className="col">
                <p className="lengthy">You are scoring for the report {this.props.hash}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <button className="my-btn secondary no-margin" onClick={() => { this._scoreReport(this.props.hash) }}>OK</button>
              </div>
              <div className="col-6">
                <button className="my-btn cancel no-margin" onClick={() => { this.returnData(null, null) }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <BoxText
          pop="box secondary"
          title={<p>Completeness:</p>}
          name="completeness"
          hint="0 - 60"
          onChange={this.onChange}
          size="3" />
        <BoxText
          pop="box secondary"
          title={<p>Importance:</p>}
          name="importance"
          hint="0 - 40"
          onChange={this.onChange}
          size="3" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  database: state.database,
  work: state.work
});

const mapDispatchToProps = dispatch => bindActionCreators({
  scoreReport: (hash, completeness, importance) => scoreReport(hash, completeness, importance)
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreAction);