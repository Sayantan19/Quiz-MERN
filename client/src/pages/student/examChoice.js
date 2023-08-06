import React from 'react'
import { ExamChoice, Footer, Header } from '../../components/index.js'

export default function ExamChoicePage() {
    return (
        <>
            <Header name="Select your exam" />
            <ExamChoice />
            <Footer/>
        </>
    )
}
