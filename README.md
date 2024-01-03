# Comprehensive Assessment System

<h2>Project Description</h2>
This is a Comprehensive Assessment System that I am currently working on.
It was initially developed on Flask, for the Prelims Round of the TechQuiz, the Quiz Event of Technovation 2022 (Technovation is the name of our department tech fest). Now, under the guidance of my professor and mentor, I have devloped this software further for taking assessments in my department.

<h2>Aim:</h2>
To develop a complete software solution which can be used by any teacher to conduct pop quizzes and other various assessments.

<h2>Target Audience:</h2>
<ol>
  <li>Schools and colleges for conducting regular assessments</li>
  <li>Private Tutors and Coaching Centers who need to conduct examinations, specially for Competitive Exams</li>
</ol>

<h2>Features:</h2>
<ul>
  <li><em>Proctoring Functionality</em>: This feature is under development, so far I have been able to incorporate face detection (Singular and Multiple) in proctoring side</li> 
  <li><em>Lightwight</em>: The teacher and the student side together take up around half a GB of space.(subject to scaling and further developments)</li>
  <li><em>Easy to use</em>: Very minimalistic design with easy to use features</li>
  <li><em>Customizable</em>: I am planning to incorporate different question forms for assessment like handwriting detection for subjective answer recognition, so that the teachers can correct subjective answers in a seamless and easy manner</li>
</ul>

<h2>Snapshots of the application (Click on the image for a better view)</h2>

<div style="display: flex; flex-wrap: wrap;">
  <a href="https://github.com/Sayantan19/Quiz-MERN/assets/75779600/ada29ea0-5b0b-4651-8e96-d6e0dd5e19f0">
    <img src="https://github.com/Sayantan19/Quiz-MERN/assets/75779600/ada29ea0-5b0b-4651-8e96-d6e0dd5e19f0" alt="Screenshot 1" style="width: 100%;">
  </a>
  <div style="display: flex">
    <a href="https://github.com/Sayantan19/Quiz-MERN/assets/75779600/e832e9b7-9b0a-4129-8a5e-01deb127dc78">
      <img src="https://github.com/Sayantan19/Quiz-MERN/assets/75779600/e832e9b7-9b0a-4129-8a5e-01deb127dc78" alt="Screenshot 2" style="width: 48%">
    </a>
    <a href="https://github.com/Sayantan19/Quiz-MERN/assets/75779600/c70f9d1b-210b-48fe-b214-70b9cab2de29">
      <img src="https://github.com/Sayantan19/Quiz-MERN/assets/75779600/c70f9d1b-210b-48fe-b214-70b9cab2de29" alt="Screenshot 3" style="width: 48%;">
    </a>
  </div>
  <div style="display: flex">
    <a href="https://github.com/Sayantan19/Quiz-MERN/assets/75779600/568d2ca8-f818-4ec2-9e0e-f94057c5a37a">
      <img src="https://github.com/Sayantan19/Quiz-MERN/assets/75779600/568d2ca8-f818-4ec2-9e0e-f94057c5a37a" alt="Screenshot 4" style="width: 48%;">
    </a>
    <a href="https://github.com/Sayantan19/Quiz-MERN/assets/75779600/65021909-6589-4dc5-857c-623a2a706a5b">
      <img src="https://github.com/Sayantan19/Quiz-MERN/assets/75779600/65021909-6589-4dc5-857c-623a2a706a5b" alt="Screenshot 5" style="width: 48%;">
    </a>
  </div>
</div>


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

![image](https://github.com/Sayantan19/Quiz-MERN/assets/75779600/91d239bf-f85a-4169-a943-b06fe8b3e0f6)

</li>
<li><h3>Student Side</h3>

![image](https://github.com/Sayantan19/Quiz-MERN/assets/75779600/f580061b-76f5-4910-8702-829a58cc9b26)

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
        mongoURI: "<generate from mongodb atlas website>",
        secretOrKey: "secret"
    }
</li>
</ul>
<h3>Step 3: Installing dependencies: </h3>
<ul>
<li>
  
    cd client
    npm i
    cd ..
    cd server
    npm i
</li>
</ul>
<h3>Step 4: Running the applications</h3>
<ul>
<li>Copy the following code in the terminal:

    cd client
    npm start
</li>
<li>In another terminal:

    cd server
    npm start
</li>
</ul>


