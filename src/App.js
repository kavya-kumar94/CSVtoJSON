import React from 'react';
import './App.css';

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

   let listOfOwners = {};

  var totalCashRaised = 0;
  var totalShares = 0;

  for (var i = 0; i < allTextLines.length; i++){
    var data = allTextLines[i].split(',');
    let date = data[0];
    let numberOfShares = parseInt(data[1]);
    let cashRaised = parseInt(data[2]);
    let name = data[3].trim();

    let person = {} 
    person["date"] = date;
    person["numberOfShares"] = numberOfShares;
    person["cashRaised"] = cashRaised;
    person["name"] = name;
    person["ownership"] = 0;

    totalCashRaised = cashRaised + totalCashRaised;
    totalShares = totalShares + numberOfShares;

    if (listOfOwners[name] !== undefined) {
      let temp = listOfOwners[name];
      var shares = person["numberOfShares"] + temp["numberOfShares"];
      var raised = person["cashRaised"] + temp["cashRaised"];
      person["numberOfShares"] = shares;
      person["cashRaised"] = raised;
    }

    listOfOwners[name] = person;
  }

  let y = Object.values(listOfOwners);

  for(let j = 0; j < y.length; j++) {
    var owner = y[j];
    owner["ownership"] = 100 * (owner["numberOfShares"] / totalShares);
  }
  
  let day = new Date();
  let curr = day.getDay();
      var result = {
      "date": curr,
      "total_number_of_shares": totalShares,
      "cash_raised": totalCashRaised,
      "ownership": y,
    };
    return result;
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
      </div>
    );
  }
}

export default App;
