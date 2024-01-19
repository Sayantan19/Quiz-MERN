import React from 'react'
import { Footer, Header, Questions, Sidebar } from '../../components/index.js'

export default function QuestionPage() {
    return (
        <>
            <Sidebar />
            <Header name="Create a new exam" />
            <div id="set-question" style={{marginLeft:'240px', marginTop: '50px'}}>
                <Questions />
                <Footer />
            </div>
        </>
    )
}
