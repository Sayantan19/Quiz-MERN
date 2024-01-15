import React from 'react'
import { Footer, Header, Questions, Sidebar } from '../../components/index.js'

export default function QuestionPage() {
    return (
        <>
            <Sidebar />
            <div id="set-question" style={{marginLeft:'240px', "display": "flex", 'flexDirection': 'row', 'justifyContent': 'center', 'alignItems': 'center' }}>
                <Questions />
            </div>
        </>
    )
}
