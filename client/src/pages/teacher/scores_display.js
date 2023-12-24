import React from 'react'
import { Footer, Header, Scores, Sidebar } from '../../components/index.js'

export default function ScoresPage() {
  return (
    <>
        <Header name="Scores Page" />
        <Sidebar />
        <Scores />
        <Footer />
    </>
  )
}
