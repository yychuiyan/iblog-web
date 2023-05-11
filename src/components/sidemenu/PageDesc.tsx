import React from 'react';

const PageDesc = (props: any) => {
  return (
    // @ts-ignore
    <div className="flex justify-center items-center w-full h-48 mt-20 sm:h-20">
      <span className="text-3xl font-medium " style={{ userSelect: 'none' }}>
        {props.title}
      </span>
    </div>
  );
};

export default PageDesc;
