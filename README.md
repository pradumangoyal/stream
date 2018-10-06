# Stream

Stream is a webapp using Django, DRF, and Django Channels as backend and using React as frontend which can be use to stream live music on a PC, while you can control the song using other PC's connected by LAN, in a network.

![Login Screen](/images/login.png)
_Login Screen_

![Controller Screen](/images/controller.png)
_Controller Screen_

![Player Screen](/images/player.png)
_Player Screen_

# Build and Run

1. Clone the Repository
```shell
$ git clone https://github.com/pradumangoyal/stream.git stream
$ cd stream
```
2. Make virtual environment setup
```shell
$ sudo apt-get install python3-venv
$ python3 -m venv <env_name>
```
3. Activate your environment
```shell
$ source <env_name>/bin/activate
```
4. Install requirements
```shell
$ cd ./backend/
$ pip install -r requirement.txt
```
5. Migrate Files
```shell
$ python manage.py makemigrations
$ python manage.py migrate
```
6. Make a Superuser with username 'stream_mainpc'(keep this in mind)
```shell
$ python manage.py createsuperuser
```
6. Make a necessary entry in Song_model
```shell
$ python manage.py shell
> from stream_sockets.models import Song_model
> Song_model.objects.create()
```
Now exit from the shell using the EOF (Ctrl+D for linux).

6. Run the app(on localhost:8000)
```shell
$ docker run -p 6379:6379 -d redis:2.8
$ python manage.py runserver
```
7. Run react
```shell
$ cd ../frontend
$ npm install
$ npm start
```
8. Browser part
    1. Open localhost:3000/stream (or 127.0.0.1/stream) on a window preferably on the PC connected by speakers (Song will play on this window)
    2. Open localhost:3000 and make a new user before using it you have to approve the user
    3. Using Drag and Drop menu at localhost:8000/ an admin can approve users.
 3. Login using the user you have created and enjoy the streaming and best use of common speakers at your workplace or home.

# Acknowledgements

Design  Credits: [@github/gouranshi](https://github.com/gouranshi)
