import React, { useState } from 'react';
import './bookappointment.css'; // Assuming you have a CSS file for styling
import { callApi, errorResponse } from '../main';

const tableStyle = { "width": "100%" };

function BookAppointment() {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [parentGender, setParentGender] = useState(''); // Assuming a radio button for parent's gender
  const [counsellorId, setCounsellorId] = useState('');
  const [date, setDate] = useState('');

  const handleParentGenderChange = (event) => {
    setParentGender(event.target.value);
  };

  const handleBookAppointment = () => {
    // Validation logic here

    // Example API call
    const url = "http://localhost:8081/appointment/book";
    const data = JSON.stringify({
      studentId,
      studentName,
      parentGender,
      counsellorId,
      date,
    });

    callApi("POST", url, data, validateAppointment, errorResponse);
  };

  const validateAppointment = (res) => {
    // Validation logic for the API response

    // Example success handling
    alert("Appointment booked successfully!");
  };

  return (
    <div className='full-height'>
      <div className='appointment-content'>
        <h3>Book an Appointment</h3>
        <table style={tableStyle}>
          <tr>
            <td>Student ID* <input type='text' value={studentId} onChange={(e) => setStudentId(e.target.value)} className='txtbox' /></td>
          </tr>
          <tr>
            <td>Student Name* <input type='text' value={studentName} onChange={(e) => setStudentName(e.target.value)} className='txtbox' /></td>
          </tr>
          <tr>
            <td>
              Parent : 
              <label>
                <input type='radio' value='father' checked={parentGender === 'father'} onChange={handleParentGenderChange} /> Father
              </label>
              <label>
                <input type='radio' value='mother' checked={parentGender === 'mother'} onChange={handleParentGenderChange} /> Mother
              </label>
            </td>
          </tr>
          <tr>
            <td>Counsellor ID* <input type='text' value={counsellorId} onChange={(e) => setCounsellorId(e.target.value)} className='txtbox' /></td>
          </tr>
          <tr>
            <td>Date* <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className='txtbox' /></td>
          </tr>
          <tr>
            <td><button className='button' onClick={handleBookAppointment}>Book Appointment</button></td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default BookAppointment;
