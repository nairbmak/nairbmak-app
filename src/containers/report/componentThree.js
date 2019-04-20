import React, { Component } from 'react';

import CheckboxText from '../core/checkboxText';
import BoxText from '../core/boxText';

const NAME = 'TheADRAssessment';


class ComponentThree extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        AssessmentOfCausality: null,
        ProbabilityScale: null,
        Comments: null,
      }
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate() {
    let data = {};
    data[NAME] = this.state.data;
    this.props.onData(data);
  }

  onChange(value) {
    this.setState({
      data: {
        ...this.state.data,
        ...value
      }
    });
  }

  render() {
    return (
      <div className="row">
        <CheckboxText
          title={<p>11. Assessment of causality</p>}
          name="AssessmentOfCausality"
          options={['Certain', 'Probable/likely', 'Possible', 'Unlikely', 'Conditional/unclassified', 'Unassessable/unclassifiable', 'Not assess']}
          more="Other"
          onChange={this.onChange}
          size="6" />

        <CheckboxText
          title={<p>12. Probability scale</p>}
          name="ProbabilityScale"
          options={['WHO', 'Naranjo', 'Not assess']}
          more="Other"
          onChange={this.onChange}
          size="6" />

        <BoxText
          title={<p>13. Comments <span className="italic">(Optional)</span></p>}
          name="Comments"
          hint="Hint"
          onChange={this.onChange}
          size="12"
        />
      </div>
    );
  }
}

export default ComponentThree;