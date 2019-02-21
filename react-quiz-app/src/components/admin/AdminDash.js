/*eslint-env jquery*/
import * as XLSX from 'xlsx';
import React from 'react';
import './styles.css';
import '../../stylesheets/admin-dash.css';
import InfoComponent from './InfoComponent';
import PdfComponent from './PdfComponent';
import DropDownList from './DropDownList';

class Excel extends React.Component {
  constructor() {
    super();
    this.state = {
      subcatid: '',
      testname: '',
      time: 0,
      items: [],
    };
  }

  componentWillMount() {
    fetch('/api/subcategory/all', {
      'method': 'GET',
      'headers': {
        'content-type': 'application/json',
      },
      'cache-control': 'no-cache',
    })
    .then(response => {
      response.json().then(data => {
        this.setState({ items: data });
      })
    })
  }

  componentDidMount() {
    $(document).ready(() => {
      $('select').formSelect();
    })

  }

  ExcelToJSON = (file) => {
    var reader = new FileReader();

    reader.onload = (e) => {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });

      const sheetName = workbook.SheetNames[0];

      var arr = [];
      var row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      console.log(row_object);

      row_object.map(row => {
        if (row.answers === undefined) {
          document.getElementById('book').style.display = "block";
          return arr;
        } else {
          document.getElementById('book').style.display = "none";
          arr.push(row.answers.split("\r\n").map(element => {
            element = {
              "option": element
            };
            return element;
          }));
          row.answers = arr.pop();
          return arr;
        }
      });

      var json_object = JSON.stringify(row_object);
      console.log(json_object);

      fetch('/api/tests', {
          crossDomain: true,
          method: 'POST',
          body: JSON.stringify({
            subcatid: this.state.subcatid,
            testname: this.state.testname,
            question: json_object,
            time: this.state.time
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error));
    }

    reader.onerror = (ex) => {
      console.log(ex);
    }

    reader.readAsBinaryString(file);

  };

  createDropdownListItems() {  
    
    // return items;
  }

  render() {
    return ( 
      <div className="admin-dash valign-wrapper">
        <div className="container">
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="card-panel">
                <form>
                  <div className="row">
                    <div className="input-field col s10 offset-s1">
                      <select id="subcategory" onChange={e => this.setState({subcatid: e.target.value})}>
                        {this.state.items.map((element) =>
                            <option key={element.id} value={element.id}>{element.name}</option>
                        )}
                      </select>
                      <label>Choose subcategory</label>
                    </div>
                  </div>

                  <div className="row">
                      <div className="input-field col s10 offset-s1">
                        <input type="text" name="test-name" id="test-name" placeholder="Enter name of the test" onChange={e => this.setState({testname: e.target.value})} />
                        <label htmlFor="test-name">Test Name</label>
                      </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s10 offset-s1">
                      {/* <input type="time" className="duration" onChange={e => this.setState({time: e.target.value})} /> */}
                      <input type="number" className="time" onChange={e => this.setState({time: e.target.value})} />
                      <label htmlFor="time">Duration</label>
                    </div>
                  </div>

                  <div className="row">
                      <div className="input-field col s10 offset-s1">
                        <input type="file" name="file" id="input" accept=".xls,.xlsx" value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
                      </div>
                  </div>


                  <div className="row infoClass center-align">
                      <span id="info"></span>
                  </div>

                  <div className="row infoClass center-align">
                  <p id="book">Invalid book</p> 
                  </div>

                  <div className="row">
                      <div className="input-field center-align">
                        <button className="btn waves-effect waves-light" name="action" value="Upload" id="inputButton" onClick={() => this.ExcelToJSON(document.getElementById('input').files[0])} disabled = {!this.state.value}>Upload</button>
                      </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
                    
        

      {/* <PdfComponent />  */}
      </div>
    );
  }
}

export default Excel;