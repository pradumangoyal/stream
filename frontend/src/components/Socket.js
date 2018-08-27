const streamSocket = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/')

export default streamSocket