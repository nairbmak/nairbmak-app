import React, { Component } from 'react';

import CheckboxText from '../core/checkboxText';
import BoxText from '../core/boxText';

const NAME = 'TheADRAssessment';


class ComponentThree extends Component {

  render() {
    if (this.props.data) var data = this.props.data[NAME];
    return (
      <div className="row">
        <CheckboxText
          viewOnly={true}
          title={<p>11. Assessment of causality</p>}
          name="AssessmentOfCausality"
          options={['Certain', 'Uncertain', 'Probable/likely', 'Conditional/unclassified', 'Possible', 'Unassessable/unclassifiable', 'Not assess']}
          more="Other"
          data={data}
          size="6" />

        <CheckboxText
          viewOnly={true}
          title={<p>12. Probability scale</p>}
          name="ProbabilityScale"
          options={['WHO', 'Naranjo', 'Not assess']}
          more="Other"
          data={data}
          size="6" />

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

export default ComponentThree;