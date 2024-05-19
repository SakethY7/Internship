import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import './EditPerson.css'; // Import the CSS file

function EditPerson() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await axios.get(`http://localhost:3000/persons/${id}`);
      const person = response.data;
      setName(person.name);
      setEmail(person.email);
      setMobileNumber(person.mobileNumber);
      setDateOfBirth(moment(person.dateOfBirth).format('YYYY-MM-DD')); // Update the format to match the input type="date"
      console.log(person.dateOfBirth);
    };

    fetchPerson();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/persons/${id}`, {
        name,
        email,
        mobileNumber,
        dateOfBirth,
      });
      navigate('/');
    } catch (error) {
      console.error('There was an error updating the person!', error);
    }
  };

  return (
    <div className="edit-person-container">
      <h1>Edit Person</h1>
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
        <button type="submit">Update Person</button>
      </form>
    </div>
  );
}

export default EditPerson;
