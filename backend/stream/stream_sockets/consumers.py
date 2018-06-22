from channels.generic.websocket import AsyncWebsocketConsumer
import json
import jwt
from .models import Song_model
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
SECRET_KEY = '!1s%h1e8hma573fprdq3)kuv+-u5&bc#u4ejrm5h-o@@otseo!'

class StreamConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.channel_layer.group_add(
            "stream",
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "stream",
            self.channel_name
        )

    async def receive(self, text_data):
        song = Song_model.objects.get(id=1)
        text_data_json = json.loads(text_data)
        url = text_data_json['url']
        title = text_data_json['title']
        token = text_data_json['token']
        volume = text_data_json['volume']
        duration = text_data_json['duration']
        seek = text_data_json['seek']
        play = text_data_json['play']
        mute = text_data_json['mute']
        message = text_data_json['message']
        dj = text_data_json['dj']
        if(token=="stream"):
            user = get_object_or_404(User, id="23")
        else:
            text = (jwt.decode(token, SECRET_KEY, algorithms=['HS256']))
            if(text['user_id']):
                user = get_object_or_404(User, id = text['user_id'])
        if user.is_active:
            if(url):
                song.url = url
                song.dj = user.username
                song.title = title
            elif(volume):
                song.volume = volume
            elif(duration):
                song.duration = duration
            elif(seek):
                song.seek = seek
            elif(play):
                song.play = play
            elif(mute):
                song.mute = mute
            else:
                pass
            song.save()
            await self.channel_layer.group_send(
                "stream",
                {
                    'type': 'stream_details',
                    'url': url,
                    'volume': volume,
                    'duration': duration,
                    'seek': seek,
                    'play': play,
                    'mute': mute,
                    'message': message,
                    'dj': user.username,
                    'title': title,
                    'token': ""
                })

    async def stream_details(self, event):
        url = event['url']
        volume = event['volume']
        duration = event['duration']
        seek = event['seek']
        play = event['play']
        mute = event['mute']
        message = event['message']
        dj = event['dj']
        token = event['token']
        title = event['title']

        await self.send(text_data=json.dumps({
                'url': url,
                'title': title,
                'volume': volume,
                'duration': duration,
                'seek': seek,
                'play': play,
                'mute': mute,
                'message': message,
                'dj': dj,
                'token': '',
        }))

