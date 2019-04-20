import React, { Component } from 'react';
import BoxText from '../core/boxText';
import Util from 'helpers/util.lib';

const NAME = 'ParticularsOfReviewers';


class ComponentFive extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        ListOfReviewerAddresses: null
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
    let re = Util.string2Array(value.ListOfReviewerAddresses);
    this.setState({
      data: {
        ...this.state.data,
        ListOfReviewerAddresses: re
      }
    });
  }

  render() {
    return (
      <div className="row">
        <BoxText
          title={<p>List of reviewer addresses:</p>}
          name="ListOfReviewerAddresses"
          hint="0xa, 0xb, ..."
          onChange={this.onChange}
          size="12"
        />
      </div>
    );
  }
}

export default ComponentFive;