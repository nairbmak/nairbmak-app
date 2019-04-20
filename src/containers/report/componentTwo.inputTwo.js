import React, { Component } from 'react';

import BoxText from '../core/boxText';

class InputTwo extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        TradeName: null,
        PharmaceuticalForm: null,
        BranchName: null,
        Dose: null,
        Route: null,
        DateStarted: null,
        DateStopped: null,
        Content: null,
        BatchNumber: null,
        Interval: null,
        ReasonForUse: null,
      }
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({
      data: {
        ...this.state.data,
        ...value
      }
    }, () => {
      this.props.onData(this.state.data);
    });
  }

  render() {
    return (
      <div className="col-12">
        <div className="row">
          <BoxText
            pop="box secondary"
            title={<p>Trade name</p>}
            name="TradeName"
            hint="Hint"
            onChange={this.onChange}
            size='3'
          />
          <BoxText
            pop="box secondary"
            title={<p>Pharmaceutical form</p>}
            name="PharmaceuticalForm"
            hint="Hint"
            onChange={this.onChange}
            size='3'
          />
          <BoxText
            pop="box secondary"
            title={<p>Branch name</p>}
            name="BranchName"
            hint="Hint"
            onChange={this.onChange}
            size='3'
          />
          <BoxText
            pop="box secondary"
            title={<p>Dose (For one time)</p>}
            name="Dose"
            hint="Hint"
            options={['G', 'mg', 'mcg', 'ng', 'UI', 'g/l', 'mg/ml', 'mcg/ml', 'UI/ml']}
            onChange={this.onChange}
            size='3'
          />
          <BoxText
            pop="box secondary"
            title={<p>Route</p>}
            name="Route"
            hint="Hint"
            onChange={this.onChange}
            size='4'
          />
          <BoxText
            pop="box secondary"
            title={<p>Date started</p>}
            name="DateStarted"
            hint="Hint"
            onChange={this.onChange}
            size='4'
          />
          <BoxText
            pop="box secondary"
            title={<p>Date stopped</p>}
            name="DateStopped"
            hint="Hint"
            onChange={this.onChange}
            size='4'
          />
          <BoxText
            pop="box secondary"
            title={<p>Content</p>}
            name="Content"
            hint="Hint"
            options={['G', 'mg', 'mcg', 'ng', 'UI', 'g/l', 'mg/ml', 'mcg/ml', 'UI/ml']}
            onChange={this.onChange}
            size='6'
          />
          <BoxText
            pop="box secondary"
            title={<p>Batch number</p>}
            name="BatchNumber"
            hint="Hint"
            onChange={this.onChange}
            size='6'
          />
          <BoxText
            pop="box secondary"
            title={<p>Interval</p>}
            name="Interval"
            hint="Hint"
            options={['per day', 'per week', 'per month']}
            onChange={this.onChange}
            size='6'
          />
          <BoxText
            pop="box secondary"
            title={<p>Reason for use</p>}
            name="ReasonForUse"
            hint="Hint"
            onChange={this.onChange}
            size='6'
          />
        </div>
      </div>
    );
  }
}

export default InputTwo;