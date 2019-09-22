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
    const types = ['text/csv']
    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err += files[x].type + ' is not a supported format\n';
      }
    };

    if (err !== '') { 
      event.target.value = null
      return(
        < div class="alert alert-warning alert-dismissible fade show" role = "alert" >
          <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          < button type = "button" class="close" data-dismiss="alert" aria-label="Close" >
                <span aria-hidden="true">&times;</span>
          </button >
        </div >
      )
      // return false;
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
        <input type="file" style={{"width":200}} name="file" onChange={this.onChangeHandler} />
        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 

      </div>
    );
  }
}

export default App;
