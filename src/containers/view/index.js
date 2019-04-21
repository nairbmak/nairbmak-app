import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getIPFS } from 'modules/ipfs.reducer';
import { scoreReport } from 'modules/database.reducer';

import Action from './action';
import ComponentOne from './componentOne';
import ComponentTwo from './componentTwo';
import ComponentThree from './componentThree';
import ComponentFour from './componentFour';
import ComponentFive from './componentFive';


class View extends Component {
  constructor() {
    super();

    this.state = {
      hash: '',
      data: null,
      error: null
    }

    this.onChange = this.onChange.bind(this);
    this.find = this.find.bind(this);
    this.show = this.show.bind(this);
    this.error = this.error.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.hash) {
      this.setState({ hash: this.props.match.params.hash }, () => {
        this.find();
      });
    }
  }

  onChange(e) {
    this.setState({
      hash: e.target.value
    });
  }

  find() {
    this.props.getIPFS(this.state.hash).then(re => {
      this.setState({ data: re, error: null });
    }).catch(er => {
      if (er) this.setState({ data: null, error: 'Cannot load report' });
    });
  }

  error() {
    if (this.state.error) return <div className="row">
      <div className="col-12">
        <p className="error-msg-plain italic">{this.state.error}</p>
      </div>
    </div>
    return null;
  }

  show() {
    if (!this.state || !this.state.data) return null;

    return (
      <div className="animated slideInLeft">
        <div className="row">
          <h1 className="col-12">I. DETAILS OF ADVERSE DRUG REACTION (ADR)</h1>
        </div>
        <ComponentOne data={this.state.data} />

        <div className="row">
          <h1 className="col-12">II. DETAILS OF DRUGS SUSPECTED TO HAVE CAUSED THE ADR</h1>
        </div>
        <ComponentTwo data={this.state.data} />

        <div className="row">
          <h1 className="col-12">III. THE ADR ASSESSMENT</h1>
        </div>
        <ComponentThree data={this.state.data} />

        <div className="row">
          <h1 className="col-12">IV. PARTICULARS OF REPORTER (THIS IS PRIVATE DATA)</h1>
        </div>
        {/* <ComponentFour data={this.state.data} /> */}

        <div className="row">
          <h1 className="col-12">V. PARTICULARS OF REVIEWERS</h1>
        </div>
        <ComponentFive data={this.state.data} />
      </div>
    )
  }

  render() {
    return (
      <div className="wrapper animated fadeInUp">
        <div className="container">

          <div className="row">
            <div className="col-12">
              <div className="box">
                <div className="row">
                  <div className="col">
                    <p>Find report by ID</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <input type="text" placeholder="Report ID" onChange={this.onChange} value={this.state.hash} />
                  </div>
                  <div className="col-3">
                    <button className="my-btn primary m-0" onClick={this.find}>Find</button>
                  </div>
                </div>
                {this.error()}
              </div>
            </div>
          </div>
          <Action hash={this.state.hash} />

          {this.show()}

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ipfs: state.ipfs,
  database: state.database
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getIPFS: (hash) => getIPFS(hash),
  scoreReport: (hash, completeness, importance) => scoreReport(hash, completeness, importance)
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);