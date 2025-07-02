import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ListPage from './pages/ListPage.jsx'
import MapPage from './pages/MapPage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/relatar" element={<ReportPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
