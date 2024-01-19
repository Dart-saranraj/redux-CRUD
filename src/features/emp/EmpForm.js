import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewEmp, selectAllEmp } from './employeeSlice';

const EmpForm = () => {
  const dispatch = useDispatch();
  const { empDetails } = useSelector(selectAllEmp);
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const canSave = [name, mobileNo, emailId].every(Boolean) && addRequestStatus === 'idle';
  const handleSubmit = (e) => {
    e.preventDefault();
    const empId = empDetails.length ? Number(empDetails[empDetails.length - 1].id) + 1 : 1;

    if (canSave) {
      const id = empId.toString();
      console.log(id);
      try {
        setAddRequestStatus('pending');
        dispatch(addNewEmp({ id, name, mobileNo, emailId }));
        setName('');
        setMobileNo('');
        setEmailId('');
      } catch (err) {
        console.error('Failed to save the details', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <main className='empForm'>
      <h3>Create Form:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <br />
        <input
          type='text'
          id='name'
          placeholder='Employee Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor='mobileNo'>Mobile No:</label>
        <br />
        <input
          type='tel'
          id='mobileNo'
          placeholder='Mobile Number'
          required
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
        <br />

        <label htmlFor='email'>Email Id:</label>
        <br />
        <input
          type='text'
          id='email'
          placeholder='Email Id'
          required
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <br />

        <button type='submit' className='subButton' disabled={!canSave}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default EmpForm;
