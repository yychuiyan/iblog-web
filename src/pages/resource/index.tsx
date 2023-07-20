import React, { useEffect } from 'react'
import PageDesc from '@/components/sidemenu/PageDesc'

const Reaource = () => {
  // 滚动位置
  const myRef = React.useRef();
  // 回到顶部
  useEffect(() => {
    if (myRef.current) {
      // window.scrollTo(0, myRef.current.offsetTop || 0);
      window.scroll({
        //@ts-ignore
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);
  return (
    // @ts-ignore
    <div className="w-1200 mx-auto  lg:mx-5 lg:w-full sm:w-full" ref={myRef}>
      <PageDesc title="前端资源" />
      <div className="w-1000  mt-10 pt-5 pb-5 mx-auto bg-base-100 rounded-2xl  lg:w-full sm:w-full">
        <h3 className='ml-5' style={{ userSelect: 'none' }}>页面建设中·······</h3>
      </div>
    </div>
  )
}

export default Reaource
