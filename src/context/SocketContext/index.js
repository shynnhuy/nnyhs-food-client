import React, { useCallback, useContext, useEffect } from "react";
import SocketContext from "./context";
import * as io from "socket.io-client";

const SocketProvider = (props) => {
  let Socket = {
    connect,
    emit,
    on,
    removeListener,
    disconnect,
    socket: null,
  };

  function connect() {
    Socket.socket = io.connect("http://localhost:8000", { reconnect: true });
  }

  function on(eventName, callback) {
    if (Socket.socket) {
      Socket.socket.on(eventName, (data) => {
        callback(data);
      });
    }
  }

  function emit(eventName, data) {
    if (Socket.socket) {
      Socket.socket.emit(eventName, data);
    }
  }

  function removeListener(eventName) {
    if (Socket.socket) {
      Socket.socket.removeListener(eventName);
    }
  }

  function disconnect() {
    if (Socket.socket) {
      Socket.socket.disconnect();
    }
  }

  const connectCallback = useCallback(connect, []);

  useEffect(() => {
    connectCallback();
    return () => Socket.disconnect();
  }, [connectCallback, Socket]);

  return (
    <SocketContext.Provider value={Socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};
