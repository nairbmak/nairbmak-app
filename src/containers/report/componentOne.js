import React, { Component } from 'react';

import BoxText from '../core/boxText';
import CheckboxText from '../core/checkboxText';

const NAME = 'DetailsOfAdverseDrugReaction';

class ComponentOne extends Component {

  constructor() {
    super();

    this.state = {
      data: {
        DateOfOnset: null,
        Duration: null,
        DescriptionOfADR: null,
        RelevantADRTest: null,
        RelevantMedicalHistory: null,
        Intervention: null,
        SeriousnessOfADR: null,
        PatientOutcomes: null,
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
        <BoxText
          title={<p>1. Date of onset</p>}
          name="DateOfOnset"
          hint="Hint"
          onChange={this.onChange}
          size="6" />
        <BoxText
          title={<p>2. Duration <span className="italic">(At the last time using suspected drugs)</span></p>}
          name="Duration"
          hint="Hint"
          options={['hour', 'minute', 'second']}
          onChange={this.onChange}
          size="6" />
        <BoxText
          title={<p>3. Description of ADR(s)</p>}
          name="DescriptionOfADR"
          hint="Hint"
          onChange={this.onChange}
          size="6" />
        <BoxText
          title={<p>4. Relevant ADR test(s)</p>}
          name="RelevantADRTest"
          hint="Hint"
          onChange={this.onChange}
          size="6" />
        <BoxText
          title={<p>5. Relevant medical history:</p>}
          name="RelevantMedicalHistory"
          hint="Hint"
          onChange={this.onChange}
          size="6" />
        <BoxText
          title={<p>6. Intervention</p>}
          name="Intervention"
          hint="Hint"
          onChange={this.onChange}
          size="6" />
        <CheckboxText
          title={<p>7. Seriousness Of ADR(s):</p>}
          name="SeriousnessOfADR"
          options={['Patient died', 'Hospitalisation prolonged', 'Congenital Anomaly', 'Life threatening', 'Impairment/Disability', 'Non-serious', 'Unknown']}
          onChange={this.onChange}
          size="12" />
        <CheckboxText
          title={<p>8. Patient outcomes:</p>}
          name="PatientOutcomes"
          options={['Patient died due to ADR', 'Not recovered', 'Impairment/Disability', 'Patient died due to other reasons', 'Recovering', 'Recovered without impairment/disability', 'Unknown']}
          onChange={this.onChange}
          size="12" />
      </div>
    );
  }
}

export default ComponentOne;