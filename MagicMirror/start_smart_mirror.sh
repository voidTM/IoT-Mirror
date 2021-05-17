#!/bin/bash
cd /home/pi/Desktop/iot_final/app/iot-magic-mirror/MagicMirror
python3 smart-mirror-login-app.py
node clientonly --address 3.92.70.39 --port 8080
