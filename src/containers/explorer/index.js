import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import eachSeries from 'async/eachSeries';
import Util from 'helpers/util.lib';
import { getExplorer, getReport } from 'modules/database.reducer';


class Explorer extends Component {

  constructor() {
    super();

    this.state = {
      page: 0,
      limit: 10,
      data: []
    }

    this.linkReportToView = this.linkReportToView.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this._getExplorer = this._getExplorer.bind(this);
  }

  linkReportToView(hash) {
    this.props.history.push('/view/' + hash);
  }

  previous() {
    if (this.state.page === 0) return;
    this.setState({ page: this.state.page - 1 }, () => {
      this._getExplorer();
    });
  }

  next() {
    if (!this.state.data || this.state.data.length === 0) return;
    this.setState({ page: this.state.page + 1 }, () => {
      this._getExplorer();
    });
  }

  _getExplorer() {
    let from = this.state.page * this.state.limit + 1;
    let to = from + this.state.limit;
    let indices = []
    for (let i = from; i < to; i++) {
      indices.push(i);
    }

    let data = [];
    eachSeries(indices, (index, callback) => {
      this.props.getExplorer(index).then(hash => {
        if (hash && hash !== '0x') {
          this.props.getReport(hash).then(report => {
            report.push(hash);
            data.push(report);
          }).catch(er => {
            console.error(er);
          });
        }
        return callback();
      }).catch(er => {
        return callback(er);
      });
    }, (er) => {
      if (er) data = [];
      return this.setState({ data: data });
    });
  }

  show(data) {
    return data.map((item, index) => {
      return <div key={index} className="row animated slideInLeft">
        <div className="box">
          <div className="row">
            <div className="col-1">
              <a href={Util.linkBlockScan(this.props.work.NETWORK, Number(item[0]))} target="_blank" rel="noopener noreferrer">{Number(item[0])}</a>
            </div>
            <div className="col-2">
              <p className="lengthy">{Date(Number(item[1]) * 1000)}</p>
            </div>
            <div className="col-3">
              <a href={Util.linkAddressScan(this.props.work.NETWORK, item[3])} target="_blank" rel="noopener noreferrer" className="lengthy">{item[3]}</a>
            </div>
            <div className="col-3">
              <a onClick={() => { this.linkReportToView(item[5]) }} className="lengthy">{item[5]}</a>
            </div>
            <div className="col-2">
              <p className="lengthy">{Number(item[2]) / 10 ** 18}</p>
            </div>
            <div className="col-1">
              <p>{item[4].toString()}</p>
            </div>
          </div>
        </div>
      </div>
    });
  }

  componentDidMount() {
    this._getExplorer();
  }

  render() {
    return (
      <div className="wrapper animated fadeInUp">
        <div className="container">

          <div className="row">
            <div className="pseudo-box">
              <div className="row">
                <div className="col-1"><h1>Block</h1></div>
                <div className="col-2"><h1>Timestamp</h1></div>
                <div className="col-3"><h1>Submitter</h1></div>
                <div className="col-3"><h1>Report ID</h1></div>
                <div className="col-2"><h1>Weight</h1></div>
                <div className="col-1"><h1>Closed</h1></div>
              </div>
            </div>
          </div>

          {this.show(this.state.data)}

          <div className="row">
            <div className="box">
              <div className="row">
                <div className="col-3">
                  <button className="my-btn secondary m-0" onClick={this._getExplorer}>Reload</button>
                </div>
                <div className="col-4">
                  <button className="my-btn primary m-0" onClick={this.previous}>Previous</button>
                </div>
                <div className="col-1">
                  <p className="text-center">Page: {this.state.page + 1}</p>
                </div>
                <div className="col-4">
                  <button className="my-btn primary m-0" onClick={this.next}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  work: state.work,
  database: state.database,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getExplorer: (index) => getExplorer(index),
  getReport: (hash) => getReport(hash),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explorer);