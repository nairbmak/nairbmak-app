import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BoxText from '../core/boxText';
import { getReport } from 'modules/database.reducer';
import { transferWORK } from 'modules/work.reducer';


class DonateAction extends Component {
  constructor() {
    super();

    this.state = {
      amount: 0
    }

    this.returnData = this.returnData.bind(this);
    this._supportReport = this._supportReport.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  returnData(er, re) {
    return this.props.done(er, re);
  }

  _supportReport() {
    this.props.getReport(this.props.hash).then(re => {
      let to = re[3];
      let amount = this.state.amount.toString() + '000000000000000000'; // 100 WORK as default

      this.props.transferWORK(to, amount).then(txId => {
        this.returnData(null, txId);
      }).catch(er => {
        if (er) this.returnData('Cannot score this report', null);
      });
    }).catch(er => {
      if (er) this.returnData('Cannot score this report', null);
    });
  }

  onChange(value) {
    this.setState(value);
  }

  render() {
    var hash = this.props.hash;
    if (!hash) return null;

    return (
      <div className="row animated slideInLeft">
        <div className="col-6" key={0}>
          <div className="box">
            <div className="row">
              <div className="col">
                <p className="lengthy">Donate the report {this.props.hash} </p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <button className="my-btn secondary m-0" onClick={this._supportReport}>OK</button>
              </div>
              <div className="col-6">
                <button className="my-btn cancel m-0" onClick={() => { this.returnData(null, null) }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <BoxText
          key={1}
          pop="box secondary"
          title={<p>Amount:</p>}
          name="amount"
          hint="100"
          onChange={this.onChange}
          size="6" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  database: state.database,
  work: state.work
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getReport: (hash) => getReport(hash),
  transferWORK: (to, amount) => transferWORK(to, amount),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DonateAction);
