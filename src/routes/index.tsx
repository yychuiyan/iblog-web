import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Landing = lazy(() => import('@/pages/landing'))

const routes: RouteObject[] = [
  {
    path: '*',
    element: (
      <Suspense fallback={''}>
        <Landing />
      </Suspense>
    )
  }
]
const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASE_URL
})
const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
