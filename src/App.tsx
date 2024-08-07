import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { AuthProvider } from './api/authProvider';
import './App.scss'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App;
