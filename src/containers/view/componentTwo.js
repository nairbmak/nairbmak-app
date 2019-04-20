import React, { Component } from 'react';
import Table from '../core/table';

const NAME = 'DetailsOfDrugsSuspectedToHaveCausedTheADR';
const NAME_ONE = 'SuspectedDrugs';
const NAME_TWO = 'OtherDrugs';


class ComponentTwo extends Component {

  render() {
    if (this.props.data) var data = this.props.data[NAME];
    if (data) var dataOne = data[NAME_ONE];
    if (data) var dataTwo = data[NAME_TWO];
    return (
      <div className="row">
        <Table
          viewOnly={true}
          title={<p>9. Suspected drugs</p>}
          size='12'
          headers={['Trade name', 'Pharmaceutical form', 'Content', 'Dose (for one time)', 'Route', 'Date started', 'Date stopped', 'Reason for use']}
          keys={['TradeName', 'PharmaceuticalForm', 'Content', 'Dose', 'Route', 'DateStarted', 'DateStopped', 'ReasonForUse']}
          data={dataOne}
        />

        <Table
          viewOnly={true}
          title={<p>10. Other drugs (Including complementary medicines, consumed at the same time and/or 3 months before)</p>}
          size='12'
          headers={['Trade name', 'Pharmaceutical form', 'Content', 'Dose (for one time)', 'Route', 'Date started', 'Date stopped', 'Reason for use']}
          keys={['TradeName', 'PharmaceuticalForm', 'Content', 'Dose', 'Route', 'DateStarted', 'DateStopped', 'ReasonForUse']}
          data={dataTwo}
        />
      </div>
    );
  }
}

export default ComponentTwo;