import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { UploadPage } from './pages/UploadPage/UploadPage';
import { AccountPage } from './pages/AccountPage/AccountPage';
import { FavoritePage } from './pages/FavoritePage/FavoritePage';
import './App.scss'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/favorite' element={<FavoritePage />} />
      </Routes>
    </>
  )
}

export default App;
