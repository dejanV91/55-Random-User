import React, { useState, useEffect } from "react";

import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random user");

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];

    const { large: image } = person.picture;

    const {
      name: { first, last },
    } = person;

    const { email, phone } = person;

    const {
      dob: { age },
    } = person;

    const {
      street: { name, number },
    } = person.location;

    const {
      login: { password },
    } = person;

    const newPerson = {
      name: `${first}${last}`,
      email,
      phone,
      age,
      street: `${name} ${number}`,
      password,
      image,
    };

    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            className="user-img"
            src={(person && person.image) || defaultImage}
            alt={title}
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={(e) => handleValue(e)}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={() => handleValue()}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseOver={(e) => handleValue(e)}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={(e) => handleValue(e)}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={(e) => handleValue(e)}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={(e) => handleValue(e)}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={() => getPerson()}>
            {loading ? "Loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
