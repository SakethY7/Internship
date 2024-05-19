// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonList from './components/PersonList';
import AddPerson from './components/AddPerson';
import EditPerson from './components/EditPerson';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<PersonList />} />
          <Route path="/add" element={<AddPerson />} />
          <Route path="/edit/:id" element={<EditPerson />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
