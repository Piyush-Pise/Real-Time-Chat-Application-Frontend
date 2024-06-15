import { useEffect, useState } from 'react';
import { getSocket } from '../socket.io/socket';

const useSocket = () => {
  const [socket] = useState(getSocket);

  useEffect(() => {
    // Add your event listeners and any other setup logic here
    socket.on('connect', () => {
      console.log('connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('disconnected from socket server');
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [socket]);

  return socket;
};

export default useSocket;
