import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const EMPS_URL = 'http://localhost:3500';

export const fetchEmps = createAsyncThunk('emps/fetchEmps', async () => {
  const response = await axios.get(`${EMPS_URL}/empDetails`);
  console.log(response, 'id');
  return response.data;
});

export const addNewEmp = createAsyncThunk('emps/addNewEmp', async (initialState) => {
  try {
    const response = await axios.post(`${EMPS_URL}/empDetails`, initialState);
    console.log(response, 'post');
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const updateEmp = createAsyncThunk('emps/updateEmp', async (initialPost) => {
  const { id } = initialPost;
  try {
    const response = await axios.put(`${EMPS_URL}/empDetails/${id}`, initialPost);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const deleteEmp = createAsyncThunk('emps/deleteEmp', async (initialPost) => {
  const { id } = initialPost;
  try {
    const response = await axios.delete(`${EMPS_URL}/empDetails/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
    return err.message;
  }
});

const initialState = {
  empDetails: [],
  status: 'idle',
  error: null,
};

const employeeSlice = createSlice({
  name: 'empDetails',
  initialState,
  reducers: {
    empAdded: {
      reducer(state, action) {
        state.empDetails.push(action.payload);
      },
      prepare(id, name, mobileNo, emailId) {
        return {
          payload: {
            id,
            name,
            mobileNo,
            emailId,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmps.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchEmps.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.empDetails = action.payload;
      })
      .addCase(fetchEmps.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewEmp.fulfilled, (state, action) => {
        console.log(action.payload);
        state.empDetails.push(action.payload);
      })
      .addCase(updateEmp.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Updated could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const empDetails = state.empDetails.filter((emp) => emp.id !== id.toString());
        state.empDetails = [...empDetails, action.payload];
      })
      .addCase(deleteEmp.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const empDetails = state.empDetails.filter((emp) => emp.id !== id.toString());
        state.empDetails = empDetails;
      });
  },
});

export const selectAllEmp = (state) => state.empDetails;
export const getEmpsStatus = (state) => state.empDetails.status;
export const getEmpsError = (state) => state.empDetails.error;
export default employeeSlice.reducer;
