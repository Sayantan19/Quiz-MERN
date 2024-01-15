import React from 'react'
import { Footer, Scores, Sidebar } from '../../components/index.js'

export default function ScoresPage() {
  return (
    <>
      <Sidebar />
      <div id="scores" style={{marginLeft: '240px', display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Scores />
      </div>
      <Footer />
    </>
  )
}
