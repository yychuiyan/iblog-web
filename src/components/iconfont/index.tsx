import React from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown';
interface iconProps {
  iconName: string; // 名称
  className?: string; // 自定义样式
  onIconClick?: () => void; // 回调
}
const IconFont = (props: iconProps): ReactElement => {
  const { iconName, className, onIconClick } = props;
  const handleIcon = () => onIconClick?.();
  return (
    <div>
      <i className={`iconfont ${iconName}  ${className} cursor-pointer`} onClick={handleIcon}></i>
    </div>
  )
}

export default IconFont
