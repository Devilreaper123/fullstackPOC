import React, { Component } from "react";
import axios from "axios";
export class Home extends Component {
  state = {
    file: null,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleCsvChange = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append("file", this.state.file, this.state.file.name);
    let url = "http://localhost:4000/upload/";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="file"
              id="image"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={this.handleCsvChange}
              required
            />
          </p>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
