import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BoxText from '../core/boxText';
import Util from 'helpers/util.lib';
import { scoreReport, closeReport, getReport } from 'modules/database.reducer';
import { transferWORK } from 'modules/work.reducer';

class Action extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      error: null,
      txId: null,
      data: {
        completeness: 0,
        importance: 0
      },
      visibleInputSupportNumber : false,
      SoLuongUngHo: null
    }

    this.message = this.message.bind(this);
    this.openScore = this.openScore.bind(this);
    this.closeScore = this.closeScore.bind(this);
    this._scoreReport = this._scoreReport.bind(this);
    this._closeReport = this._closeReport.bind(this);
    this.onChange = this.onChange.bind(this);
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
    this.setState({ visible: false }, () => {
      this.setState({ visible: true });
    });
  }

  closeScore() {
    this.setState({ visible: true }, () => {
      this.setState({
        visible: false,
        importance: 0,
        completeness: 0
      });
    });
  }

  _scoreReport(hash) {
    this.props.scoreReport(Util.decodeIPFSHash(hash), this.state.data.completeness, this.state.data.importance).then(txId => {
      this.setState({
        txId: txId,
        error: null
      }, () => {
        this.closeScore();
      });
    }).catch(er => {
      this.setState({
        txId: null,
        error: 'Cannot score this report'
      }, () => {
        this.closeScore();
      });
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

  _supportReport(hash, numberSupport = "100") {
    this.props.getReport(Util.decodeIPFSHash(hash)).then(re => {
      let to = re[3];
      let amount = numberSupport + "000000000000000000"; // 100 WORK as default

      this.props.transferWORK(to, amount).then(txId => {
        this.setState({
          txId: txId,
          error: null
        });
      }).catch(er => {
        this.setState({
          txId: null,
          error: 'Cannot support this report'
        });
      });
    }).catch(er => {
      this.setState({
        txId: null,
        error: 'Cannot support this report'
      });
    });
  }

  onChange(value) {
    this.setState({SoLuongUngHo : value.SoLuongUngHo});
  }

  visibleInputSupportNumber = () => {
    this.setState({visibleInputSupportNumber : !this.state.visibleInputSupportNumber})
    this.setState({error : null});
  }

  sendSupportNumber = (hash) => {
    if(!this.state.SoLuongUngHo || isNaN(this.state.SoLuongUngHo)){
      this.setState({error : "Vui lòng nhập số."});
      return;
    }
    let numberSupport = this.state.SoLuongUngHo.toString();
    this._supportReport(hash, numberSupport);
    this.setState({SoLuongUngHo : null});
    this.visibleInputSupportNumber();
  }

  render() {
    var hash = this.props.hash;
    if (!hash) return null;

    return (
      <div className="row">

        {this.state.visible || this.state.visibleInputSupportNumber ? null : <div className="col-12">
          <div className="box">
            <div className="row">
              <div className="col">
                <p className="lengthy">Hoạt động với báo cáo {Util.decodeIPFSHash(hash)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <button className="my-btn secondary no-margin" onClick={this.visibleInputSupportNumber}>Ủng hộ</button>
              </div>

              <div className="col-4">
                <button className="my-btn primary no-margin" onClick={this.openScore}>Chấm điểm</button>
              </div>
              <div className="col-4">
                <button className="my-btn primary no-margin" onClick={() => { this._closeReport(hash) }}>Tổng kết</button>
              </div>
            </div>
            {this.message()}
          </div>
        </div>}

        {!this.state.visibleInputSupportNumber ? null :
          [
            <div className="col-6" key={0}>
              <div className="box">
                <div className="row">
                  <div className="col">
                    <p className="lengthy">Ủng hộ cho báo cáo {Util.decodeIPFSHash(hash)}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <button className="my-btn secondary no-margin" onClick={() => { this.sendSupportNumber(hash) }}>Ủng hộ</button>
                  </div>
                  <div className="col-6">
                    <button className="my-btn cancel no-margin" onClick={this.visibleInputSupportNumber}>Huỷ</button>
                  </div>
                </div>
              </div>
            </div>,
            <BoxText
            key={1}
            pop="box secondary"
            title={<p>Số lượng ủng hộ:</p>}
            name="SoLuongUngHo"
            hint="Nhập số lượng ủng hộ"
            onChange={this.onChange}
            size="6" />,
            <p className="error-msg-plain italic" style={{marginLeft:"70%"}}>{this.state.error}</p>
          ]
        }

        {!this.state.visible ? null : <div className="col-6">
          <div className="box">
            <div className="row">
              <div className="col">
                <p className="lengthy">Chấm điểm cho báo cáo {Util.decodeIPFSHash(hash)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <button className="my-btn secondary no-margin" onClick={() => { this._scoreReport(hash) }}>Chấm</button>
              </div>
              <div className="col-6">
                <button className="my-btn cancel no-margin" onClick={this.closeScore}>Huỷ</button>
              </div>
            </div>
          </div>
        </div>}

        {!this.state.visible ? null : <BoxText
          pop="box secondary"
          title={<p>Độ hoàn thành:</p>}
          name="completeness"
          hint="0 - 60"
          onChange={this.onChange}
          size="3" />}

        {!this.state.visible ? null : <BoxText
          pop="box secondary"
          title={<p>Độ quan trọng:</p>}
          name="importance"
          hint="0 - 40"
          onChange={this.onChange}
          size="3" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  database: state.database,
  work: state.work
});

const mapDispatchToProps = dispatch => bindActionCreators({
  scoreReport: (hash, completeness, importance) => scoreReport(hash, completeness, importance),
  closeReport: (hash) => closeReport(hash),
  getReport: (hash) => getReport(hash),
  transferWORK: (to, amount) => transferWORK(to, amount),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);