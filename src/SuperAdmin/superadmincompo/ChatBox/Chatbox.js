import React from 'react';
import { Box } from '@mui/material';
import IconMapper from '../IconMapper/IconMapper';
import './chatbox.css'; 

const ChatBox = () => {
  return (
    <Box className="chat-box">
      <IconMapper iconName="Query"  />
    </Box>
  );
};

export default ChatBox;
