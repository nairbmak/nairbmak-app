import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from 'configs';
import BoxText from '../core/boxText';
import { transferWORK } from 'modules/work.reducer';


class Buy extends Component {
  constructor() {
    super();

    this._buyReport = this._buyReport.bind(this);
    this.returnData = this.returnData.bind(this);
  }

  returnData(er, re) {
    return this.props.done(er, re);
  }

  _buyReport() {
    let to = config.eth.RETAIL.ADDRESS;
    let amount = config.eth.RETAIL.VALUE;
    return this.props.transferWORK(to, amount).then(txId => {
      this.returnData(null, txId);
    }).catch(er => {
      if (er) this.returnData('Cannot buy this report', null);
    });
  }

  render() {
    return (
      <div className="row">
        <BoxText
          viewOnly={true}
          title={<p>Address:</p>}
          name="address"
          hint="0xa"
          data={{ address: config.eth.RETAIL.ADDRESS }}
          size="4" />
        <BoxText
          viewOnly={true}
          title={<p>Amount (WORK):</p>}
          name="amount"
          hint="1 WORK"
          data={{ amount: Number(config.eth.RETAIL.VALUE) / 10 ** 18 }}
          size="4" />
        <div className="col-4">
          <div className="box">
            <div className="row">
              <div className="col">
                <p className="lengthy">Would you like to buy this data?</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button className="my-btn secondary m-0" onClick={() => { this._buyReport(this.props.hash) }}>OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  database: state.database,
  work: state.work
});

const mapDispatchToProps = dispatch => bindActionCreators({
  transferWORK: (to, amount) => transferWORK(to, amount),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buy);