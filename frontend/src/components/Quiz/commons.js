// ./commons.js

import * as faceapi from 'face-api.js';

// define face detection options
export const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });

// load face detection network
export const faceDetectionNet = faceapi.nets.ssdMobilenetv1;

// load canvas element
export const canvas = document.getElementById('canvas');

// save file function
export function saveFile(blob, filename) {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
