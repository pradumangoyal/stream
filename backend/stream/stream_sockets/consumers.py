from channels.generic.websocket import AsyncWebsocketConsumer
import json

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
        text_data_json = json.loads(text_data)
        url = text_data_json['url']
        volume = text_data_json['volume']
        duration = text_data_json['duration']
        seek = text_data_json['seek']
        play = text_data_json['play']
        mute = text_data_json['mute']
        message = text_data_json['message']
        
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
                'message': message
            })

    async def stream_details(self, event):
        url = event['url']
        volume = event['volume']
        duration = event['duration']
        seek = event['seek']
        play = event['play']
        mute = event['mute']
        message = event['message']

        await self.send(text_data=json.dumps({
                'url': url,
                'volume': volume,
                'duration': duration,
                'seek': seek,
                'play': play,
                'mute': mute,
                'message': message
        }))

