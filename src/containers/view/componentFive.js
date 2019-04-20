import React, { Component } from 'react';
import BoxText from '../core/boxText';

const NAME = 'ParticularsOfReviewers';


class ComponentFive extends Component {

  render() {
    if (this.props.data) var data = this.props.data[NAME];
    return (
      <div className="row">
        <BoxText
          viewOnly={true}
          title={<p>List of reviewer addresses:</p>}
          name="ListOfReviewerAddresses"
          hint="0xa, 0xb, ..."
          onChange={this.onChange}
          data={data}
          size="12"
        />
      </div>
    );
  }
}

export default ComponentFive;