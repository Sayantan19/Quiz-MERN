//This is the proctor mechanism that I have used in the software
//I have used face-api.js, a tensorflow based library which is extremely lightweight and easy to use
//I have been able to add the face detection system so far. It checks whether the person is giving the exam or not.
//If the person is not visible to the webcam for 5 seconds consecutively, then a warning message is displayed.
//The person gets 5+1 chances, after which his examination will get terminated.

import * as faceapi from 'face-api.js'
import axios from 'axios';
import { accessCurrentUser } from '../../../actions/authActions';

export default async function proctor() {
    var video = document.getElementById("video");
    const URI = '/models'
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(URI).then(err => { console.log(err) }).catch(err => { console.log(err) }),
        faceapi.nets.faceLandmark68Net.loadFromUri(URI).then(err => { console.log(err) }).catch(err => { console.log(err) }),
        faceapi.nets.faceRecognitionNet.loadFromUri(URI).then(err => { console.log(err) }).catch(err => { console.log(err) }),
        faceapi.nets.faceExpressionNet.loadFromUri(URI).then(err => { console.log(err) }).catch(err => { console.log(err) })
    ]).then(err => {
        console.log(err)
        startVideo();
    })
        .catch(console.log('bye'))

    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        var cheatInstance = -1;
        var cheatCapture = 0;
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
            if (detections.length === 0) {
                cheatCapture++;
                console.log("Face not visible: ", cheatCapture);
                if (cheatCapture > 5 && cheatInstance <= 0)
                    alert('Please sit properly for your exam.');
                if (cheatCapture > 5 && cheatInstance > 0 && cheatInstance < 4)
                    alert('Your action has been marked. Kindly sit properly for your exam.')
                if (cheatCapture > 5 && cheatInstance === 4)
                    alert('This is your final warning. Kindly sit properly for your exam.')
                if (cheatCapture > 5 && cheatInstance >= 5) {
                    alert("You have been disqualified");
                    localStorage.removeItem('saved_timer');
                    const token = accessCurrentUser().decoded;
                    const data = {
                        'id': token.id,
                        'name': token.name,
                        'score': 0,
                        'time': 0,
                    }

                    console.log(data);
                    axios.post('/results/result', data)
                        .then(function (response) {
                            if (response.status !== 200) {
                                console.log('Error', response.status);
                            }
                            else {
                                console.log(response);
                                console.log('Success');
                                window.location.href = '/student/summary';
                            }
                        }).catch(console.log("Fraud case"));
                }

            }
            else {
                if (cheatCapture > 5)
                    cheatInstance++;
                cheatCapture = 0;
                console.log("Face visible. Times cheated so far: ", cheatInstance);
                if(cheatInstance <= 0)
                    document.getElementById("cheat").innerText = 'Times Cheated: ' + 0;
                else if(cheatInstance > 0)
                    document.getElementById("cheat").innerText = 'Times Cheated: ' + cheatInstance;
            }
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        }, 1000)
    })

    function startVideo() {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!");
                });
        }
    }
}