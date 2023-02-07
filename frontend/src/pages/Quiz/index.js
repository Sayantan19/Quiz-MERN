import React from 'react';
import { Footer, Header, Quiz } from '../../components/index.js';
// import logic  from './logic.js'
// import $ from 'jquery'


export default function QuizPage() {
    return (
        <>
            <Header name="Answer the following questions" />
            <Quiz />
            <Footer />
            {/* <Helmet type="text/javascript" src='logic.js' /> */}
        </>
    );
}