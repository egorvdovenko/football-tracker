import React from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from '~/pages/home'
import { TeamPage } from '~/pages/team'
import { MatchPage } from '~/pages/match'
import { PlayerPage } from '~/pages/player'
import Layout from '~/shared/ui/Layout'

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
