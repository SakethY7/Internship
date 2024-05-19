import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPerson.css'; // Import the CSS file

function AddPerson() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/persons', {
        name,
        email,
        mobileNumber,
        dateOfBirth,
      });
      navigate('/');
    } catch (error) {
      console.error('There was an error adding the person!', error);
    }
  };

  return (
    <div className="add-person-container">
      <h1>Add Person</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Mobile Number:
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        </label>
        <label>
          Date of Birth:
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        </label>
        <button type="submit">Add Person</button>
      </form>
    </div>
  );
}

export default AddPerson;
