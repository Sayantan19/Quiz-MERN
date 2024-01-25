import React from 'react'
import { Footer, Header, Questions, Sidebar } from '../../components/index.js'

export default function QuestionPage() {
    return (
        <>
        <div className='d-flex w-100'>
            <Sidebar />
            <div id="set-question" className='w-100'>
                <Header name="Create a new exam" />
                <Questions />
                <Footer />
            </div>
        </div>
        </>
    )
}
