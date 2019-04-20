import React, { Component } from 'react';
import CheckboxText from '../core/checkboxText';
import BoxText from '../core/boxText';

const NAME = 'ParticularsOfReporter';


class ComponentFour extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        Fullname: null,
        Email: null,
        PhoneNumber: null,
        Profession: null,
        KindOfReport: null,
        DateReported: null,
        NameOfDepartment: null,
        AddressOfDepartment: null,
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
          title={<p>Fullname</p>}
          name="Fullname"
          hint="Hint"
          onChange={this.onChange}
          size="4"
        />
        <BoxText
          title={<p>Email</p>}
          name="Email"
          hint="Hint"
          onChange={this.onChange}
          size="4"
        />
        <BoxText
          title={<p>Phone number</p>}
          name="PhoneNumber"
          hint="Hint"
          onChange={this.onChange}
          size="4"
        />
        <CheckboxText
          title={<p>Profession</p>}
          name="Profession"
          options={['Doctor', 'Dentist', 'Pharmacist', 'Pharmacy Company', 'Nurse', 'Nursing', 'Midwife']}
          more='Other'
          onChange={this.onChange}
          size="7"
        />
        <CheckboxText
          title={<p>Kind of report</p>}
          name="KindOfReport"
          options={['New report', 'Supplementary report']}
          onChange={this.onChange}
          size="5"
        />
        <BoxText
          title={<p>Date reported</p>}
          name="DateReported"
          hint="Hint"
          onChange={this.onChange}
          size="4"
        />
        <BoxText
          title={<p>Name of department</p>}
          name="NameOfDepartment"
          hint="Hint"
          onChange={this.onChange}
          size="4"
        />
        <BoxText
          title={<p>Address of department</p>}
          name="AddressOfDepartment"
          hint="Hint"
          onChange={this.onChange}
          size="4"
        />
      </div>
    );
  }
}

export default ComponentFour;