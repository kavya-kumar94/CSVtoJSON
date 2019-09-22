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

  // axios.post("http://localhost:8000/upload", data, {
  // })
  //     .then(res => {
  //   console.log(res.statusText)
  //     })

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

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
  }

  render() {
    return (
      <div className="App">
        <h2>Upload a CSV file!</h2>
        <input type="file" style={{"width":200}} name="file" onChange={this.onChangeHandler} />
        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 

      </div>
    );
  }
}

export default App;
