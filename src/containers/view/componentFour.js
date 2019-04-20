import React, { Component } from 'react';
import CheckboxText from '../core/checkboxText';
import BoxText from '../core/boxText';

const NAME = 'ThongTinVeNguoiDonViGuiBaoCao';


class ComponentFour extends Component {

  render() {
    if (this.props.data) var data = this.props.data[NAME];
    return (
      <div className="row">
        <BoxText
          viewOnly={true}
          title={<p>Fullname</p>}
          name="Fullname"
          hint="Hint"
          data={data}
          size="4"
        />
        <BoxText
          viewOnly={true}
          title={<p>Email:</p>}
          name="Email"
          hint="Hint"
          data={data}
          size="4"
        />
        <BoxText
          viewOnly={true}
          title={<p>Phone number</p>}
          name="PhoneNumber"
          hint="Hint"
          data={data}
          size="4"
        />
        <CheckboxText
          viewOnly={true}
          title={<p>Profession</p>}
          name="Profession"
          options={['Doctor', 'Dentist', 'Pharmacist', 'Pharmacy Company', 'Nurse', 'Nursing', 'Midwife']}
          more='Other'
          data={data}
          size="7"
        />
        <CheckboxText
          viewOnly={true}
          title={<p>Kind of report</p>}
          name="KindOfReport"
          options={['New report', 'Supplementary report']}
          data={data}
          size="5"
        />
        <BoxText
          viewOnly={true}
          title={<p>Date reported</p>}
          name="DateReported"
          hint="Hint"
          data={data}
          size="4"
        />
        <BoxText
          viewOnly={true}
          title={<p>Name of department</p>}
          name="NameOfDepartment"
          hint="Hint"
          data={data}
          size="4"
        />
        <BoxText
          viewOnly={true}
          title={<p>Address of department</p>}
          name="AddressOfDepartment"
          hint="Hint"
          data={data}
          size="4"
        />
      </div>
    );
  }
}

export default ComponentFour;