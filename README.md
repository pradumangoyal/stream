# stream

Stream aims to be a webapp using Django, DRF, and Django Channels as backend and using React as frontend which can be use to stream live music on a PC, while you can control the song using other PC's connected by LAN, in a network

# Dependencies

* python3
* pip
* virtualenv
* npm packages already added

# Build and Run

1. Clone the Repository
'''$ git clone [https://github.com/pradumangoyal/stream.git](https://github.com/pradumangoyal/stream.git)
$ cd stream'''
2. Make virtual environment setup
'$ sudo apt-get install python3-venv'
'$ python3 -m venv <env_name>'
3. Activate your environment
'$ source <env_name>/bin/activate'
4. Install requirements
'$ cd ./backend/sttream/
$ pip install requirement.txt'
5. Migrate Files
'$ python manage.py migrate
$ python manage.py makemigrations stream'
6. Run the app(on localhost:8000)
'$ python manage.py runserver'
7. Run react
'$ cd ../../frontend
$ npm start
'
8. Browser part
  1. Open localhost:3000/stream on a window preferably on the PC connected by speakers (Song will play on this window)
  2. Go to localhost:3000 and make a new user before using it you have to ## approve the user
    1. Go to localhost:8000 and login using admin user (if not make a superuser using shell)
        1. '$ cd ../backend/stream
        $ python manage.py createsuperuser'
    2. Also make a user with username 'stream_mainpc'
    3. Using Drag and Drop menu there approve users.
 3. Login using the user you have created and enjoy the streaming and best use of common speakers at your workplace or home.
