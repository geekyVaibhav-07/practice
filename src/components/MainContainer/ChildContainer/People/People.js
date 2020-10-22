import React, { Component } from "react";
import Person from "./../Person/Person";
import { axiosRequest } from "./../../../../config/index";
import "./people.css";

class People extends Component {
  state = {
    page: 1,
    count: 10,
    people: [],
  };

  componentDidMount() {
    console.log("mounted");
    this.getPeople();
  }

  getPeople = async () => {
    const configuration = {
      path: `/api/v1/user?page=${this.state.page}&&count=${this.state.count}`,
      method: "get",
    };
    try {
      const result = await axiosRequest(configuration);
      console.log(result.data.users);
      if (result.status === 200 && Array.isArray(result.data.users)) {
        this.setState({
          people: result.data.users,
        });
      } else {
        throw new Error("Unable to get data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  handlePage = (val) => {
    if (this.state.page + val >= 1) {
      this.setState(
        {
          page: this.state.page + val,
        },
        () => this.getPeople()
      );
    }
  };

  generatePersonInfo = (person) => {
    const info = {
      ...person,
    };
    return info;
  };

  renderListOfPeople = () => {
    console.log(this.state);
    return (
      <>
        {this.state.people.map((person) => (
          <Person info={this.generatePersonInfo(person)} />
        ))}
      </>
    );
  };

  render() {
    return (
      <div>
        <div>{this.renderListOfPeople()}</div>
        <div className="people-button-class">
          <button onClick={() => this.handlePage(-1)}>Prev</button>
          <button onClick={() => this.handlePage(1)}>Next</button>
        </div>
      </div>
    );
  }
}

export default People;
