const PageDesc = (props: any) => {
  return (
    // @ts-ignore
    <div className="flex justify-center items-center flex-col w-full h-32 mt-20 sm:h-20">
      <p className="text-3xl font-medium " style={{ userSelect: 'none' }}>
        {props.title}
      </p>
      <p className="mt-2 text-[var(--article-content-default)]">{props.desc}</p>
    </div>
  );
};

export default PageDesc;
