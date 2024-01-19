import React from 'react'
import { Footer, Header, PaperSettings, Sidebar } from '../../components/index.js'

export default function PaperSettingsPage() {
    return (
        <>
            <Header name='Your papers' />
            <Sidebar />
            <div id="paper-details" style={{marginLeft:'240px', "display": "flex", 'flexDirection': 'row', 'justifyContent': 'center', 'alignItems': 'center' }}>
                <PaperSettings />
                <Footer />
            </div>
        </>
    )
}
