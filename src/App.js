import React from 'react';
import './App.css';

// import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }
  };

processData() {

  let x = "2016-04-03,1000,10000.00,Sandy Lerner\n" +
  "2017 - 11 - 14, 1000, 12000.00, Don Valentine\n" +
  "2018 - 01 - 20, 2000, 40000.00, Don Valentine\n" +
  "2018 - 03 - 20, 2000, 40000.00, Ann Miura - Ko\n" +
  "2019 - 01 - 02, 2000, 50000.00, Sandy Lerner\n" +
  "2019 - 01 - 02, 1500, 13500.00, Fred Wilson\n"

  var allTextLines = x.split(/\r?\n/).filter(line => line.length!== 0);
  let date = new Date();
  let results = [];
  
  for (var i = 0; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(',');
    var result = {
      "date": date,
      "total_number_of_shares": 0,
      "cash_raised": 0,
      "ownership": null,
    };

    var newOwner = {};
      for (var j = 0; j < data.length; j++) {
        if(j === 0) {
          result.date = data[0] || date;
        } else if ( j === 1) {
          result.total_number_of_shares = data[1];
        } else if (j === 2) {
          result.cash_raised = data[2];
        } else {
            newOwner["investor"] = data[3];
            newOwner["shares"] = data[1];
            newOwner["cash_paid"] =data[2];
            newOwner["ownership"] = (newOwner["shares"] / result.total_number_of_shares)
            result.ownership = (newOwner);
        }

      }
    results.push(result);
  }
  let final = {
    "date": date,
    "total_number_of_shares": 0,
    "cash_raised": 0,
    "ownership": [],
  };
  for(let k = 0; k < results.length; k++) {
    if (results[k].date > final.date) {
      final.date = results[k].date
    }

    final.cash_raised = parseInt(final.cash_raised)+parseInt(results[k].cash_raised);
    final.total_number_of_shares = parseInt(final.total_number_of_shares) + parseInt(results[k].total_number_of_shares);    
    final.ownership.push(results[k].ownership);
  }
  return final;
}


  maxSelectFile = (event) => {
    let files = event.target.files
    if (files.length > 1) {
      const msg = 'Only 1 file can be uploaded at a time'
      event.target.value = null
      console.log(msg)
      return false;

    }
    return true;
  }

  checkMimeType = (event) => {
    let files = event.target.files
    let err = ''
    const types = ['text/csv', 'application/csv', 'application / x - csv', 'text/comma-separated-values', 'text/x-comma-separated-values', 'text/tab-separated-values']
    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err += files[x].type + ' is not a supported format\n Please upload a .csv file.';
      }
    };

    if (err !== '') { 
      event.target.value = null
      alert(err);
      return false;
    }
    return true;

  }

  onChangeHandler = event => {
    if (this.maxSelectFile(event) && this.checkMimeType(event)) {
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
    }
  }

  // onClickHandler = () => {
  //   const data = new FormData()
  //   data.append('file', this.state.selectedFile)
  // }

  render() {
    
    return (
      <div className="App">
        <h2>Upload a CSV file!</h2>
        <input type="file" style={{"width":200}} name="file" onChange={this.onChangeHandler} />
        <button type="button" className="btn btn-success btn-block" onClick={this.state.selectedFile !== null ? this.processData(this.state.selectedFile) : this.processData}>Convert to JSON!</button> 
        {/* <div>{lines}</div> */}
      </div>
    );
  }
}

export default App;
