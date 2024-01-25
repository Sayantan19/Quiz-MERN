import React from 'react'
import { Footer, Header, PaperSettings, Sidebar } from '../../components/index.js'

export default function PaperSettingsPage() {
    return (
        <>
            <div className='d-flex w-100'>
                <Sidebar />
                <div id="paper-details" className='w-100'>
                    <Header name='Your papers' />
                    <PaperSettings />
                    <Footer />
                </div>
            </div>
        </>
    )
}
