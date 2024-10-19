from flask import Flask, Response
import cv2

app = Flask(__name__)

# Replace with your RTSP camera URL
camera_urls = {
    '1': 'rtsp://admin:admin@192.168.13.42:1935',
    '2': 'rtsp://admin:admin@192.168.13.228:1935',    
    '3': 'rtsp://admin:admin@192.168.13.42:1935',
    '4': 'rtsp://admin:admin@192.168.13.42:1935'
}

def generate_frames(rtsp_url):
    cap = cv2.VideoCapture(rtsp_url)
    
    if not cap.isOpened():
        raise Exception("Unable to open RTSP stream")
    
    while True:
        success, frame = cap.read()

        if not success:
            break

        cv2.imshow('Video Feed', frame)


        # Encode the frame in JPEG format
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        # Yield the output as multipart data stream (for MJPEG format)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        
    

@app.route('/video_feed/<cam_id>')
def video_feed(cam_id):
    
    rtsp_url = camera_urls.get(cam_id)
    print(rtsp_url)
    if not rtsp_url:
        return "Camera ID not found", 404

    return Response(generate_frames(rtsp_url), mimetype='multipart/x-mixed-replace; boundary=frame')

    

@app.route('/')
def index():
    return '''
    <html>
        <body>
            <h1>RTSP Stream</h1>
            <img src="/video_feed/1">
        </body>
    </html>
    '''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
