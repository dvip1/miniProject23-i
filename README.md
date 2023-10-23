https://aboard-cougar-ae8.notion.site/Before-editing-backend-443ff2124b7940d6aeeb3ca8d396f31b?pvs=4
Create different branch before pushing.
# Installations
For client side, you need to install node.js and npm:
https://nodejs.org/en/download/
For server side, you need to install python3 and pip3:
https://www.python.org/downloads/
# How to run
## Client side
```
cd client
npm install
npm run dev 
```
## Server side
```
cd server
python -m venv venv
source venv/bin/activate (for mac)
venv\Scripts\activate (for windows)
pip install -r requirements.txt
flask run
```
