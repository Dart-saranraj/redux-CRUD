import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllEmp, updateEmp } from './employeeSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditForm = () => {
  const { id } = useParams();
  const { empDetails } = useSelector(selectAllEmp);
  const emp = empDetails.find((emp) => emp.id.toString() === id);
  console.log(emp, 'emp');
  const [name, setName] = useState(emp?.name);
  const [mobileNo, setMobileNo] = useState(emp?.mobileNo);
  const [emailId, setEmailId] = useState(emp?.emailId);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const canSave = [name, mobileNo, emailId].every(Boolean) && addRequestStatus === 'idle';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(updateEmp({ id: emp.id, name, mobileNo, emailId }));
        setName('');
        setMobileNo('');
        setEmailId('');
        navigate('/');
      } catch (err) {
        console.error('Failed to update the details', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <main className='empForm'>
      <h3>Edit Form:</h3>
      <form onSubmit={handleUpdate}>
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
          Update
        </button>
      </form>
    </main>
  );
};

export default EditForm;
