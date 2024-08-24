import { Suspense } from 'react'

const lazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={''}>
      <Component />
    </Suspense>
  )
}
export default lazyLoad
