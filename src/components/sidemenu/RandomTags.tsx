import React from 'react';
import styled from 'styled-components';

// 生成随机的RGB颜色值
export function getRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
}

// 使用styled-components创建带有随机背景颜色的标签组件
const RandomColorTag = styled.span`
  background-color: ${getRandomColor()};
  /* 添加其他样式属性 */
`;

export default RandomColorTag;
