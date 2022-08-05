import React, { Component } from "react";
import { variables } from "./Variables.js";

export class PatientData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientId: 0,
      PatientName: "",
      Patient: [],
      MRN: "",
      Gender: "",
      DOB: "",
      HospitalName: "",
      LastUpdatedBy: "",
      NoteId: "",
      NoteDateTime: "",
      Prescription: "",

      PatientIdFilter: "",
      PatientNameFilter: "",
      PatientWithoutFilter: [],
    };
  }
  FilterFn() {
    var PatientIdFilter = this.state.PatientIdFilter;
    var PatientNameFilter = this.state.PatientNameFilter;
    var filteredData = this.state.PatientWithoutFilter.filter(function (el) {
      return (
        el.PatientId.toString()
          .toLowerCase()
          .includes(PatientIdFilter.toString().trim().toLowerCase()) &&
        el.PatientName.toString()
          .toLowerCase()
          .includes(PatientNameFilter.toString().trim().toLowerCase())
      );
    });
    this.setState({ Patient: filteredData });
  }
  sortResult(prop, asc) {
    var sortedData = this.state.PatientWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ Patient: sortedData });
  }
  refreshList() {
    fetch(variables.API_URL + "patientnewdata")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Patient: data, PatientWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }
  changePatientIdFilter = (e) => {
    this.state.PatientIdFilter = e.target.value;
    this.FilterFn();
  };
  changePatientNameFilter = (e) => {
    this.state.PatientNameFilter = e.target.value;
    this.FilterFn();
  };
  changePatientName = (e) => {
    this.setState({ PatientName: e.target.value });
  };
  changeMRN = (e) => {
    this.setState({ MRN: e.target.value });
  };
  changeGender = (e) => {
    this.setState({ Gender: e.target.value });
  };
  changeDOB = (e) => {
    this.setState({ DOB: e.target.value });
  };
  changeHospitalName = (e) => {
    this.setState({ HospitalName: e.target.value });
  };
  changeNoteId = (e) => {
    this.setState({ NoteId: e.target.value });
  };
  changePrescription = (e) => {
    this.setState({ Prescription: e.target.value });
  };
  changeLastUpdatedBy = (e) => {
    this.setState({ LastUpdatedBy: e.target.value });
  };
  addClick() {
    this.setState({
      modalTitle: "Add Patient Data",
      PatientId: 0,
      PatientName: "",
      MRN: "",
      Gender: "",
      DOB: "",
      HospitalName: "",
      LastUpdatedBy: "",
      NoteId: "",
      Prescription: "",
    });
  }
  editClick(pt) {
    this.setState({
      modalTitle: "Edit Patient Data",
      PatientId: pt.PatientId,
      PatientName: pt.PatientName,
      MRN: pt.MRN,
      Gender: pt.Gender,
      DOB: pt.DOB,
      HospitalName: pt.HospitalName,
      LastUpdatedBy: pt.LastUpdatedBy,
      NoteId: pt.NoteId,
      Prescription: pt.Prescription,
    });
  }

  createClick() {
    fetch(variables.API_URL + "patientnewdata", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PatientName: this.state.PatientName,
        MRN: this.state.MRN,
        Gender: this.state.Gender,
        DOB: this.state.DOB,
        HospitalName: this.state.HospitalName,
        LastUpdatedBy: this.state.LastUpdatedBy,
        NoteId: this.state.NoteId,
        Prescription: this.state.Prescription,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }
  updateClick() {
    fetch(variables.API_URL + "patientnewdata", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PatientId: this.state.PatientId,
        PatientName: this.state.PatientName,
        MRN: this.state.MRN,
        Gender: this.state.Gender,
        DOB: this.state.DOB,
        HospitalName: this.state.HospitalName,
        LastUpdatedBy: this.state.LastUpdatedBy,
        NoteId: this.state.NoteId,
        Prescription: this.state.Prescription,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "patientnewdata/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }
  render() {
    const {
      PatientId,
      PatientName,
      Patient,
      Gender,
      modalTitle,
      DOB,
      HospitalName,
      NoteId,
      Prescription,
      MRN,
      LastUpdatedBy,
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Add Patient Data
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changePatientIdFilter}
                    placeholder="Filter"
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("PatientId", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("PatientId", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                ID
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changePatientNameFilter}
                    placeholder="Filter"
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("PatientName", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("PatientName", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Patient Name
              </th>
              <th>MRN</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Hospital Name</th>
              <th>Last Updated By</th>
              <th>NoteID</th>
              <th>Prescription</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {Patient.map((pt) => (
              <tr key={pt.PatientId}>
                <td>{pt.PatientId}</td>
                <td>{pt.PatientName}</td>
                <td>{pt.MRN}</td>
                <td>{pt.Gender}</td>
                <td>{pt.DOB}</td>
                <td>{pt.HospitalName}</td>
                <td>{pt.LastUpdatedBy}</td>
                <td>{pt.NoteId}</td>
                <td>{pt.Prescription}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(pt)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(pt.PatientId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Patient Name</span>
                      <input
                        type="text"
                        className="form-control"
                        value={PatientName}
                        onChange={this.changePatientName}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">MRN</span>
                      <input
                        type="number"
                        className="form-control"
                        value={MRN}
                        onChange={this.changeMRN}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Gender</span>
                      <select
                        className="form-select"
                        onChange={this.changeGender}
                        value={Gender}
                      >
                        {Patient.map((pt) => (
                          <option key={pt.PatientId}>{pt.Gender}</option>
                        ))}
                      </select>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">DOB</span>
                      <input
                        type="date"
                        className="form-control"
                        value={DOB}
                        onChange={this.changeDOB}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Hospital Name</span>
                      <input
                        type="text"
                        className="form-control"
                        value={HospitalName}
                        onChange={this.changeHospitalName}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Last Updated By</span>
                      <input
                        type="text"
                        className="form-control"
                        value={LastUpdatedBy}
                        onChange={this.changeLastUpdatedBy}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Note ID</span>
                      <input
                        type="number"
                        className="form-control"
                        value={NoteId}
                        onChange={this.changeNoteId}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Prescription</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Prescription}
                        onChange={this.changePrescription}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight"></div>
                </div>

                {PatientId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {PatientId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
