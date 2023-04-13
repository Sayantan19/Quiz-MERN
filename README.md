# Comprehensive Assessment System

<h2>Project Description</h2>
This is a Comprehensive Assessment System that I am currently working on.
It was initially developed on Flask, for the Prelims Round of the TechQuiz, the Quiz Event of Technovation 2022 (Technovation is the name of our department tech fest). Upon the advice of my professor and mentor, I decided to take this project further and implement a full fledged assessment system.

<h2>Aim:</h2>
To develop a complete software solution which can be used by any teacher to conduct pop quizzes and other various assessments.

<h2>Target Audience:</h2>
<ol>
  <li>Schools and colleges for conducting regular assessments</li>
  <li>Private Tutors and Coaching Centers who need to conduct examinations, specially for Competitive Exams</li>
</ol>

<h2>Features:</h2>
<ul>
  <li><em>Proctoring Functionality</em>: This feature is under development, so far I have been able to incorporate face detection in proctoring side</li> 
  <li><em>Lightwight</em>: The teacher and the student side together take up around half a GB of space.(subject to scaling and further developments)</li>
  <li><em>Easy to use</em>: Very minimalistic design with easy to use features</li>
  <li><em>Customizable</em>: I am planning to incorporate different question forms for assessment like handwriting detection for subjective answer recognition, so that the teachers can correct subjective answers in a seamless and easy manner</li>
</ul>

## Snapshots of the application (Click on the image for a better view)
<h3>Teacher Side:</h3>

|<img src="https://user-images.githubusercontent.com/75779600/231831652-699a8988-8c48-4cf0-b543-055af02c54f3.png"/>|<img src="https://user-images.githubusercontent.com/75779600/231831646-93c65cef-02c6-41b6-aff6-f3cd6b10543c.png"/>|
|----|----|
|<img src="https://user-images.githubusercontent.com/75779600/231831629-de833e4d-4826-4c92-9360-47f5e62494de.png"/>|<img src="https://user-images.githubusercontent.com/75779600/231831635-78834957-4643-4ed9-8db4-a0448592ec96.png"/>|

<h3>Student Side:</h3>

|<img src="https://user-images.githubusercontent.com/75779600/231831638-affd02ed-ddaa-4e60-b479-e16212476720.png"/>|<img src="https://user-images.githubusercontent.com/75779600/231831608-7937a774-b462-43ea-8145-c86a048071c7.png"/>|
|----|----|
<img src="https://user-images.githubusercontent.com/75779600/231831632-8fe5320c-7a1a-4b9c-81a0-607d0e3fe43a.png"/>|<img src="https://user-images.githubusercontent.com/75779600/231831640-8afceefc-2460-49d2-9b1d-c764ecbf51d6.png"/>|

<h2>Technologies Used:</h2>

<ul>
<li><h3>Frameworks:</h3>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

</li>
  
<li>
<h3>Languages:</h3>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)

</li>
<li>
<h3>Libraries:</h3>
    
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![JQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Tensorflow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
  
</li>
  
<li>
<h3>Database</h3>

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

</li>
<li>  
<h3>API Testing Software</h3>
  
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
  
</li>
</ul>

<h2>How the app works?</h2>

<ul>
<li><h3>Teacher Side</h3>

![Teacher flow](https://user-images.githubusercontent.com/75779600/231784441-b09b709a-696a-4fe3-8cce-0cb4f58199c0.png)

</li>
<li><h3>Student Side</h3>

![Student flow](https://user-images.githubusercontent.com/75779600/231784079-83b95206-8de9-4a3d-a9d6-6cc6072cd17f.png)

</li>
</ul>
<h2>Getting Started</h2>
<h3>Step 1: Clone this repository</h3>
<h3>Step 2: Adding the keys.js file</h3>
<ul>
<li>Go to the Student/backend/config folder.</li>
<li>Create a file named 'keys.js'</li>
<li>Add the following code:

    module.exports = {
        mongoURI: "<generate from mongodb atlas website>/student",
        secretOrKey: "secret"
    }
</li>
<li>Repeat the same steps for the Teacher folder</li>
</ul>


<h3>Step 3: Installing dependencies in the Student Side</h3>
<ul>
<li>Copy the following code in the terminal (one line at a time):

    cd Student/backend
    npm i
    cd ..
    cd frontend
    npm i
</li>
</ul>

<h3>Step 4: Installing dependencies in the Teacher Side</h3>
<ul>
<li>Copy the following code in the terminal (one line at a time):

    cd Teacher/backend
    npm i
    cd ..
    cd frontend
    npm i
</li>
</ul>
<h3>Step 5: Running the applications</h3>
<ul>
<li>Copy the following code in the terminal for the backend:

    cd Teacher/backend
    npm start
</li>
<li>Copy the following code in a new terminal for the frontend:

    cd Teacher/frontend
    npm start
</li>
<li>Repeat the same steps for running the Student part</li>
</ul>


