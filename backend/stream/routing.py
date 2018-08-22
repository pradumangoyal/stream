from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import stream_sockets.routing

application = ProtocolTypeRouter({

    'websocket': AuthMiddlewareStack(
        URLRouter(
            stream_sockets.routing.websocket_urlpatterns
)),
})
