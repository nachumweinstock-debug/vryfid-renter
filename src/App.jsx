import { Routes, Route, Navigate } from 'react-router-dom'
import Hub from './components/Hub'
import Shell from './components/Shell'
import Homey from './components/tabs/Homey'
import RoommateFinder from './components/tabs/RoommateFinder'
import Documents from './components/tabs/Documents'
import Applications from './components/tabs/Applications'
import Settings from './components/tabs/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hub />} />
      <Route element={<Shell />}>
        <Route path="/homey"      element={<Homey />} />
        <Route path="/roommates"  element={<RoommateFinder />} />
        <Route path="/documents"  element={<Documents />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/settings"   element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
