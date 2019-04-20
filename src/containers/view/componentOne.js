import React, { Component } from 'react';

import BoxText from '../core/boxText';
import CheckboxText from '../core/checkboxText';

const NAME = 'DetailsOfAdverseDrugReaction';

class ComponentOne extends Component {
  render() {
    if (this.props.data) var data = this.props.data[NAME];
    return (
      <div className="row">
        <BoxText
          viewOnly={true}
          title={<p>1. Date of onset</p>}
          name="DateOfOnset"
          hint="Hint"
          data={data}
          size="6" />
        <BoxText
          viewOnly={true}
          title={<p>2. Duration <span className="italic">(At the last time using suspected drugs)</span></p>}
          name="Duration"
          hint="Hint"
          data={data}
          options={['hour', 'minute', 'second']}
          size="6" />
        <BoxText
          viewOnly={true}
          title={<p>3. Description of ADR(s)</p>}
          name="DescriptionOfADR"
          hint="Hint"
          data={data}
          size="6" />
        <BoxText
          viewOnly={true}
          title={<p>4. Relevant ADR test(s)</p>}
          name="RelevantADRTest"
          hint="Hint"
          data={data}
          size="6" />
        <BoxText
          viewOnly={true}
          title={<p>5. Relevant medical history:</p>}
          name="RelevantMedicalHistory"
          hint="Hint"
          data={data}
          size="6" />
        <BoxText
          viewOnly={true}
          title={<p>6. Intervention</p>}
          name="Intervention"
          hint="Hint"
          data={data}
          size="6" />
        <CheckboxText
          viewOnly={true}
          title={<p>7. Seriousness Of ADR(s):</p>}
          name="SeriousnessOfADR"
          options={['Patient died', 'Hospitalisation prolonged', 'Congenital Anomaly', 'Life threatening', 'Impairment/Disability', 'Non-serious', 'Unknown']}
          data={data}
          size="12" />
        <CheckboxText
          viewOnly={true}
          title={<p>8. Patient outcomes:</p>}
          name="PatientOutcomes"
          options={['Patient died due to ADR', 'Not recovered', 'Impairment/Disability', 'Patient died due to other reasons', 'Recovering', 'Recovered without impairment/disability', 'Unknown']}
          data={data}
          size="12" />
      </div>
    );
  }
}

export default ComponentOne;