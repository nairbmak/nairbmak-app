import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckboxText from '../core/checkboxText';
import BoxText from '../core/boxText';
import Buy from './buy';
import { buyData } from 'modules/ipfs.reducer';

const NAME = 'TheADRAssessment';


class ComponentThree extends Component {
  constructor() {
    super();

    this.state = {
      data: null
    }

    this._buy = this._buy.bind(this);
    this.done = this.done.bind(this);
  }

  _buy(txId) {
    let data = this.props.data[NAME];

    this.props.buyData(txId, data).then(re => {
      this.setState({ data: re })
    }).catch(er => {
      return console.error(er)
    })
  }

  done(er, txId) {
    if (er) return console.error(er);
    return this._buy(txId);
  }

  render() {
    if (this.state.data) var data = this.state.data;
    else if (this.props.data) var data = this.props.data[NAME];
    
    console.log(data)
    if (typeof data === 'string') {
      return <Buy done={this.done} />
    }
    else return (
      <div className="row">
        <CheckboxText
          viewOnly={true}
          title={<p>11. Assessment of causality</p>}
          name="AssessmentOfCausality"
          options={['Certain', 'Uncertain', 'Probable/likely', 'Conditional/unclassified', 'Possible', 'Unassessable/unclassifiable', 'Not assess']}
          more="Other"
          data={data}
          size="8" />

        <CheckboxText
          viewOnly={true}
          title={<p>12. Probability scale</p>}
          name="ProbabilityScale"
          options={['WHO', 'Naranjo', 'Not assess']}
          more="Other"
          data={data}
          size="4" />

        <BoxText
          viewOnly={true}
          title={<p>13. Comments <span className="italic">(Optional)</span></p>}
          name="Comments"
          hint="Hint"
          data={data}
          size="12"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ipfs: state.ipfs
});

const mapDispatchToProps = dispatch => bindActionCreators({
  buyData: (txId, data) => buyData(txId, data),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentThree);