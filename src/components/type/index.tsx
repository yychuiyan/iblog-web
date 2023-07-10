import React, { useState, useEffect } from 'react';

const Typewriter = ({ content }: any) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex === content.length) {
        clearInterval(typingInterval);
        return;
      }

      currentText += content[currentIndex];
      setDisplayText(currentText);
      currentIndex++;
    }, 100); // 每个字符的显示间隔时间，可以根据需要调整

    return () => {
      clearInterval(typingInterval);
    };
  }, [content]);

  return <div>{displayText}</div>;
};

export default Typewriter;
