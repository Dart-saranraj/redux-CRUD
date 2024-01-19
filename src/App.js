import EditForm from './features/emp/EditForm';
import EmpForm from './features/emp/EmpForm';
import EmpTable from './features/emp/EmpTable';
import Header from './features/emp/Header';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <main>
      <Header />

      <Routes>
        <Route
          path='/'
          element={
            <>
              <EmpForm />
              <EmpTable />
            </>
          }
        />

        <Route path='/edit/:id' element={<EditForm />} />
      </Routes>
    </main>
  );
}

export default App;
