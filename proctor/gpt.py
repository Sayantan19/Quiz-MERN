import cv2
import dlib

# Initialize face detector and mouth detector
face_detector = dlib.get_frontal_face_detector()
mouth_detector = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# Set timer and threshold for mouth openness
open_mouth_time = 0
open_mouth_threshold = 5

# Load the input video
cap = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()
    if not ret:
        break
    
    # Detect faces in the input frame
    faces = face_detector(frame, 0)
    
    # For each face, detect mouth and check if it's open
    for face in faces:
        landmarks = mouth_detector(frame, face)
        mouth_openness = (landmarks.part(66).y - landmarks.part(62).y) / (landmarks.part(64).x - landmarks.part(60).x)
        if mouth_openness > 0.35: # You can adjust this threshold to fit your needs
            open_mouth_time += 1
        else:
            open_mouth_time = 0
        
        # Display warning message if mouth is open for more than 5 seconds
        if open_mouth_time >= open_mouth_threshold * 30: # 30 frames per second
            cv2.putText(frame, "Please close your mouth", (100, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
    
    # Display the resulting frame
    cv2.imshow('frame', frame)
    
    # Exit if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
