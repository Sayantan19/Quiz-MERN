// This is the brain of the entire student side
// This is where the question is randomized and displayed.

import axios from 'axios';
import { accessCurrentUser, logoutUser } from '../../../actions/authActions';
// import proctor from './proctor';

export default async function logic(questionData) {
    const data = questionData
    var totalSeconds;
    const NoOfQuestions = Number(data.Question_settings.quizquestions)  //To set the number of questions
    const timerValue = NoOfQuestions * Number(data.Question_settings.questiontime); //To set the time
    let time = localStorage.getItem('saved_timer'); //Initializing the time at the beginning of the quiz
    const timerID = setInterval(timeUpdate, 1000);  //To update the time
    const totalMarks = NoOfQuestions * Number(data.quizData[0]['positive_marks'])
    // const cheated = await proctor(questionData, totalMarks)
    let cheated = 0

    const quizData = data.quizData; //The question set is stored in 'quizData'
    //Various elements of the question to be displayed in the page.
    const answerEls = document.querySelectorAll('.answer')
    const questionEl = document.getElementById('question')
    const a_text = document.getElementById('a_text')
    const b_text = document.getElementById('b_text')
    const c_text = document.getElementById('c_text')
    const d_text = document.getElementById('d_text')

    //Button for various purposes
    const submitBtn = document.getElementById('submit')
    const resetBtn = document.getElementById('reset')
    const nextBtn = document.getElementById('next')
    const prevBtn = document.getElementById('prev')

    //Variables for manipulation and navigation of the questions
    let visited = new Array(quizData.length).fill(0)
    let selector = new Array(NoOfQuestions).fill(0)
    let optionSelector = []
    let answerList = new Array(NoOfQuestions).fill('n')
    let correctIncorrect = new Array(NoOfQuestions).fill(0)
    let currentQuiz = 0
    let correctscore = 0
    var count = 0;

    function setTimer() {
        if (time == null) {
            const saved_timer = new Date().getTime() + (timerValue * 1000);
            localStorage.setItem('saved_timer', saved_timer);
            time = saved_timer;
        }
    }
    setTimer()

    //This is where the result gets formatted and submitted
    function SubmitResult() {
        const timetaken = (timerValue - totalSeconds)
        const token = accessCurrentUser().decoded;
        const data1 = {
            'id': token.id,
            'name': token.name,
            'score': correctscore,
            'time': timetaken,
            'cheated': cheated,
            'totalmarks': totalMarks,
            'papername': data.Question_settings.papername,
            'papercode': data.Question_settings.papercode,
            'testno': data.Question_settings.testno
        }
        axios.post('/results/result', data1)
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Error', response);
                }
                else if (response.data === 'Fraud case') {
                    alert('Congratulations on wasting your time giving the exam again!');
                    window.location.href = `/student/summary`
                }
                else {
                    window.location.href = `/student/summary`;
                }
            }).catch(console.log("Fraud case"));
    }




    //This is the function which updates the time
    function timeUpdate() {
        const now = new Date().getTime();
        const difference = time - now;

        totalSeconds = Math.floor(difference / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        document.getElementById("timer").innerText = 'Time Left: ' + minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds);
        //Changes if the time ends
        if (totalSeconds <= 0) {
            alert("TIME'S UP!!!");
            clearInterval(timerID);
            localStorage.removeItem('saved_timer');
            calculateMarks();
            // closeNav();

            SubmitResult()
        }
    }

    //This function selects the questions from a pool of n number of questions stored in the .json file
    questionSelector()
    function questionSelector() {
        let i = 0
        while (i < NoOfQuestions) {
            let x = Math.floor(Math.random() * quizData.length);
            if (visited[x] === 0) {
                selector[i] = x;
                visited[x] = 1;
                i++;
            }
        }
    }

    questionShuffler()
    function questionShuffler() {
        let i = 0
        while(i<NoOfQuestions) {
            let array = ['a','b','c','d']
            let shuffledArray = []
            while (array.length > 0) {
                const randomIndex = Math.floor(Math.random() * array.length) 
                shuffledArray.push(array[randomIndex])
                array.splice(randomIndex,1)
            }
            optionSelector.push(shuffledArray);
            i++;
        }
    }

    //Used to display the questions on the screen
    loadQuiz()
    function loadQuiz() {
        if (count === 0) {
            document.getElementById('prev').setAttribute("disabled", "");
            document.getElementById('prev').removeAttribute("enabled", "");
        }
        else if(count === NoOfQuestions - 1) {
            document.getElementById('next').setAttribute("disabled", "");
            document.getElementById('next').removeAttribute("enabled", "");
        }
        else if (count > 0) {
            document.getElementById('prev').setAttribute("enabled", "");
            document.getElementById('prev').removeAttribute("disabled", "");
            document.getElementById('next').setAttribute("enabled", "");
            document.getElementById('next').removeAttribute("disabled", "");
        }
        if (answerList[count] === 'n')
            deselectAnswers()
        else
            document.getElementById(answerList[count]).checked = true;
        currentQuiz = selector[count];

        document.getElementById("qno").innerHTML = (count + 1);
        const currentQuizData = quizData[currentQuiz];
        questionEl.innerText = currentQuizData.question

        // Display the shuffled answer options
        a_text.innerText = currentQuizData[optionSelector[count][0]];
        b_text.innerText = currentQuizData[optionSelector[count][1]];
        c_text.innerText = currentQuizData[optionSelector[count][2]];
        d_text.innerText = currentQuizData[optionSelector[count][3]];
    }

    //function to deselect all the options.
    function deselectAnswers() {
        answerEls.forEach(answerEl => answerEl.checked = false)
    }

    //This is used to select the option that the user clicks
    function getSelected() {
        let answerId
        let flag = 0
        answerEls.forEach(answerEl => {
            if (answerEl.checked) {
                answerId = answerEl.id
                flag = 1;
            }
        })
        if(flag===0)
            return 'n'
        return answerId
    }


    //For looping through the questions
    function updateQ() {
        if (count < NoOfQuestions) {
            loadQuiz()
        }
    }

    //This function adds the functionality to the submit button
    submitBtn.addEventListener('click', onSubmit)
    function onSubmit() {
        if (window.confirm("Do you want to Submit the quiz?") === true) {
            calculateMarks()
            clearInterval(timerID);
            localStorage.removeItem('saved_timer');
            SubmitResult()
        }
    }

    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
          // The user switched to another tab or minimized the browser.
          cheated += 1;
          alert('Tab changed/minimized. Event has been recorded')
        } else {
          // The user switched back to this tab.
          console.log("User is on this tab.");
        }
      });
      

    //Adds functionality to the next button
    nextBtn.addEventListener('click', onNext)
    function onNext() {
        answerList[count] = getSelected()
        if (count === NoOfQuestions - 1)
            count = 0;
        else
            count++;
        updateQ()
    }

    //Adds functionality to the previous button
    prevBtn.addEventListener('click', onPrev)
    function onPrev() {
        answerList[count] = getSelected()
        count--;
        updateQ()
    }

    //Adds functionality to the reset button
    resetBtn.addEventListener('click', onReset)
    function onReset() {
        deselectAnswers()
    }

    //For calculating the marks obtained by the user
    function calculateMarks() {
        for (let i = 0; i < answerList.length; i++) {
            let answer = ''
            switch(answerList[i]) {
                case 'a':
                    answer = quizData[selector[i]].a;
                    break;
                case 'b':
                    answer = quizData[selector[i]].b;
                    break;
                case 'c':
                    answer = quizData[selector[i]].c;
                    break;
                case 'd':
                    answer = quizData[selector[i]].d;
                    break;
                default:
                    answer = 'n'
            }
            console.log(answer)
            if (answer === 'n') {
                correctIncorrect[i] = 0;
                correctscore += 0;
            }
            else if (answer.toLowerCase === String(quizData[selector[i]].correct).toLowerCase) {
                correctIncorrect[i] = Number(questionData.quizData[0]['positive_marks']);
                correctscore += Number(questionData.quizData[0]['positive_marks']);
            }
            else {
                correctIncorrect[i] = Number(questionData.quizData[0]['negative_marks']);
                correctscore += Number(questionData.quizData[0]['negative_marks']);
            }
        }
    }
}