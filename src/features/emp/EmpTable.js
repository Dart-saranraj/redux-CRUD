import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmp, selectAllEmp } from './employeeSlice';
import { fetchEmps } from './employeeSlice';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmpTable = () => {
  const { empDetails } = useSelector(selectAllEmp) || [];
  console.log(empDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmps());
    console.log(fetchEmps, 'fetch');
  }, [dispatch]);

  const handleDelete = (id) => {
    try {
      dispatch(deleteEmp({ id: id })).unwrap();
    } catch (err) {
      console.error('Failed to delete the employee', err);
    } finally {
    }
  };

  return (
    <main>
      <table className='table'>
        <thead className='thead'>
          <tr>
            <th>Name</th>
            <th>Mobile No</th>
            <th>Email Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {empDetails &&
            empDetails.map((value) => {
              return (
                <tr key={value.id}>
                  <td>{value.name}</td>
                  <td>{value.mobileNo}</td>
                  <td>{value.emailId}</td>
                  <td>
                    <RiDeleteBin6Fill className='Delete' onClick={() => handleDelete(value.id)} />
                    <Link to={`/edit/${value.id}`}>
                      <FaRegEdit className='Edit' />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
};

export default EmpTable;
