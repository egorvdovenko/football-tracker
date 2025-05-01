import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage'
import MatchPage from './pages/MatchPage'
import PlayerPage from './pages/PlayerPage'
import Layout from './components/Layout'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams/:id" element={<TeamPage />} />
        <Route path="/matches/:id" element={<MatchPage />} />
        <Route path="/players/:id" element={<PlayerPage />} />
      </Routes>
    </Layout>
  )
}

export default App
