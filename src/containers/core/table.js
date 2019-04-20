import React, { Component } from 'react';


class Table extends Component {
  constructor(props) {
    super(props);

    this.header = this.header.bind(this);
    this.table = this.table.bind(this);
  }

  header() {
    let data = this.props.headers;
    if (!data || data.length <= 0) return null;

    var re = [];
    for (var i = 0; i < data.length; i++) {
      re.push(<th key={i}>{data[i]}</th>);
    }
    if (!this.props.viewOnly) {
      re.push(<th key={i}>Remove</th>);
    }
    return (<tr>{re}</tr>)
  }

  table() {
    let data = this.props.data;
    let keys = this.props.keys;
    if (!data || data.length <= 0) return null;
    if (!keys || keys.length <= 0) return null;

    return data.filter(item => {
      if (!item || item.length <= 0) return false;
      return true;
    }).map((item, i) => {
      let row = keys.map(key=> {
        return <td key={`${i}.${key}`}>{item[key]}</td>
      });
      if (!this.props.viewOnly) {
        row.push(
          <td key={`${i}.trash`}>
            <a onClick={() => { this.props.remove(i) }}>
              <i className="fas fa-trash"></i>
            </a>
          </td>
        );
      }

      return <tr key={i}>{row}</tr>
    });
  }

  render() {
    return (
      <div className={"col-" + this.props.size}>
        <div className={"box"}>
          <div className="row">
            <div className="col">
              {this.props.title}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="my-table">
                <tbody>
                  {this.header()}
                  {this.table()}
                </tbody>
              </table>
            </div>
          </div>
          {!this.props.viewOnly ? this.props.btn : null}
        </div>
      </div>
    );
  }
}

export default Table;