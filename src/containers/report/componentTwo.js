import React, { Component } from 'react';

import Table from '../core/table';
import InputOne from './componentTwo.inputOne';
import InputTwo from './componentTwo.inputTwo';

const NAME = 'DetailsOfDrugsSuspectedToHaveCausedTheADR';
const NAME_ONE = 'SuspectedDrugs';
const NAME_TWO = 'OtherDrugs';


class ComponentTwo extends Component {
  constructor() {
    super();

    this.onDataOne = this.onDataOne.bind(this);
    this.openInputOne = this.openInputOne.bind(this);
    this.closeInputOne = this.closeInputOne.bind(this);
    this.saveInputOne = this.saveInputOne.bind(this);
    this.removeInputOne = this.removeInputOne.bind(this);
    this.btnOne = {
      deactive: (
        <div className="row justify-content-end">
          <div className="col-2">
            <button className="my-btn primary" onClick={this.openInputOne}>Add</button>
          </div>
        </div>
      ),
      active: (
        <div className="row justify-content-end">
          <div className="col-2">
            <button className="my-btn cancel" onClick={this.closeInputOne}>Cancel</button>
          </div>
          <div className="col-2">
            <button className="my-btn secondary" onClick={this.saveInputOne}>Save</button>
          </div>
        </div>
      )
    }

    this.onDataTwo = this.onDataTwo.bind(this);
    this.openInputTwo = this.openInputTwo.bind(this);
    this.closeInputTwo = this.closeInputTwo.bind(this);
    this.saveInputTwo = this.saveInputTwo.bind(this);
    this.removeInputTwo = this.removeInputTwo.bind(this);
    this.btnTwo = {
      deactive: (
        <div className="row justify-content-end">
          <div className="col-2">
            <button className="my-btn primary" onClick={this.openInputTwo}>Add</button>
          </div>
        </div>
      ),
      active: (
        <div className="row justify-content-end">
          <div className="col-2">
            <button className="my-btn cancel" onClick={this.closeInputTwo}>Cancel</button>
          </div>
          <div className="col-2">
            <button className="my-btn secondary" onClick={this.saveInputTwo}>Save</button>
          </div>
        </div>
      )
    }

    this.state = {
      visibleOne: false,
      btnOne: this.btnOne.deactive,
      tempDataOne: null,
      dataOne: [],
      visibleTwo: false,
      btnTwo: this.btnTwo.deactive,
      tempDataTwo: null,
      dataTwo: [],
    }
  }

  componentDidUpdate() {
    let data = {};
    data[NAME] = {};
    data[NAME][NAME_ONE] = this.state.dataOne;
    data[NAME][NAME_TWO] = this.state.dataTwo;
    this.props.onData(data);
  }

  onDataOne(data) {
    this.setState({ tempDataOne: data });
  }
  openInputOne() {
    this.setState({ visibleOne: true, btnOne: this.btnOne.active });
  }
  closeInputOne() {
    this.setState({ tempDataOne: null, visibleOne: false, btnOne: this.btnOne.deactive });
  }
  saveInputOne() {
    let newData = this.state.dataOne;
    newData.push(this.state.tempDataOne);
    this.setState({ dataOne: newData }, () => {
      this.closeInputOne();
    });
  }
  removeInputOne(i) {
    let newData = this.state.dataOne;
    newData.splice(i, 1);
    this.setState({ dataOne: newData });
  }

  onDataTwo(data) {
    this.setState({ tempDataTwo: data });
  }
  openInputTwo() {
    this.setState({ visibleTwo: true, btnTwo: this.btnTwo.active });
  }
  closeInputTwo() {
    this.setState({ tempDataTwo: null, visibleTwo: false, btnTwo: this.btnTwo.deactive });
  }
  saveInputTwo() {
    var newData = this.state.dataTwo;
    newData.push(this.state.tempDataTwo);
    this.setState({ dataTwo: newData }, () => {
      this.closeInputTwo();
    });
  }
  removeInputTwo(i) {
    let newData = this.state.dataTwo;
    newData.splice(i, 1);
    this.setState({ dataTwo: newData });
  }

  render() {
    return (
      <div className="row">
        <Table
          viewOnly={false}
          title={<p>9. Suspected drugs</p>}
          size='12'
          headers={['Trade name', 'Pharmaceutical form', 'Content', 'Dose (for one time)', 'Route', 'Date started', 'Date stopped', 'Reason for use']}
          keys={['TradeName', 'PharmaceuticalForm', 'Content', 'Dose', 'Route', 'DateStarted', 'DateStopped', 'ReasonForUse']}
          btn={this.state.btnOne}
          remove={this.removeInputOne}
          data={this.state.dataOne}
        />
        {this.state.visibleOne ? <InputOne onData={this.onDataOne} /> : null}

        <Table
          viewOnly={false}
          title={<p>10. Other drugs (Including complementary medicines, consumed at the same time and/or 3 months before)</p>}
          size='12'
          headers={['Trade name', 'Pharmaceutical form', 'Content', 'Dose (for one time)', 'Route', 'Date started', 'Date stopped', 'Reason for use']}
          keys={['TradeName', 'PharmaceuticalForm', 'Content', 'Dose', 'Route', 'DateStarted', 'DateStopped', 'ReasonForUse']}
          btn={this.state.btnTwo}
          remove={this.removeInputTwo}
          data={this.state.dataTwo}
        />
        {this.state.visibleTwo ? <InputTwo onData={this.onDataTwo} /> : null}
      </div>
    );
  }
}

export default ComponentTwo;