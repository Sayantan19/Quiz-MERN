import React from 'react'
import { Footer, Header, Scores, Sidebar } from '../../components/index.js'

export default function ScoresPage() {
  return (
    <>
      <div className='d-flex w-100'>
        <Sidebar />
        <div id="scores" className='w-100'>
          <Header name="Scores" />
          <Scores />
          <Footer />
        </div>
      </div>
    </>
  )
}
