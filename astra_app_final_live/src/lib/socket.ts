/**
 * Socket.IO client wrapper. Call getSocket() to get a singleton socket connected to the server.
 * Ensure you install socket.io-client in package.json.
 */
import { io } from "socket.io-client";

let socket = null;

export function getSocket() {
  if (socket) return socket;
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  // remove trailing slash if any
  const url = API_BASE.replace(/\/$/, '');
  socket = io(url, { autoConnect: true });
  return socket;
}
