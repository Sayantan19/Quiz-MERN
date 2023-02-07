import { React } from 'react';
import './Quiz.css';
// import './logic'
import logic from './logic';
import { accessCurrentUser } from '../../actions/authActions';


accessCurrentUser();
export default function Quiz() {

    window.onload = function () { logic() }
    return (
        <>
            <div className="container" id="time">
                <div id="timer" name="timer">
                    <span>Time Left: 30:00</span>
                </div>
            </div>
            <div className="container">
                <div className="jumbotron bg-light container" id="quiz">
                    <div className="container-fluid" id="qelements">
                        <div id="main">
                            <button id="open" className="openbtn">&#9776; Open Question Palette</button>

                            <div>
                                <h2 className="quiz-header"><span id="qno">QNo.</span>:<span id="question">Question Text</span></h2>
                            </div>
                            <ol className="list-group list-group-numbered">
                                <li>
                                    <input type="radio" name="answer" id="a" className="btn-check answer" />
                                    <label htmlFor="a" id="a_text" className="btn btn-outline-dark answertext">Answer</label>
                                </li>
                                <li>
                                    <input type="radio" name="answer" id="b" className="btn-check answer" />
                                    <label htmlFor="b" id="b_text" className="btn btn-outline-dark answertext">Answer</label>
                                </li>
                                <li>
                                    <input type="radio" name="answer" id="c" className="btn-check answer" />
                                    <label htmlFor="c" id="c_text" className="btn btn-outline-dark answertext">Answer</label>
                                </li>
                                <li>
                                    <input type="radio" name="answer" id="d" className="btn-check answer" />
                                    <label htmlFor="d" id="d_text" className="btn btn-outline-dark answertext">Answer</label>
                                </li>
                            </ol>
                            <div id="buttons">
                                <button id="next" className="button btn btn-success">Next</button>
                                <button id="prev" className="button btn btn-success">Prev</button>
                                <button id="reset" className="button btn btn-success">Reset</button>
                            </div>
                            <div id="buttons">
                                <button id="submit" className="button btn btn-success">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}