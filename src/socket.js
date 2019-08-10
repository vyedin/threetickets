import {Socket} from "phoenix";

const DEBUG_LOGGING = false;

const socket = new Socket("ws://rog.home.tilmonedwards.com:4000/socket/user", {
  reconnectAfterMs: (tries) => [10, 50, 100, 150, 200, 250, 500, 1000, 2000][tries - 1] || 5000,
  rejoinAfterMs: (tries) => [1000, 2000, 5000][tries - 1] || 10000,
  logger: (kind, msg, data) => { if(DEBUG_LOGGING) { console.log(`${kind}: ${msg}`, data); }}
});
socket.connect();

export default socket;

