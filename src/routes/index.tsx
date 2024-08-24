import { lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import lazyLoad from './lazyLoad'
import LayoutComponent from '@/pages/layout'
import type { RouteObject } from 'react-router-dom'
const Home = lazy(() => import('@/pages/home'))
const Category = lazy(() => import('@/pages/category'))
const Tags = lazy(() => import('@/pages/tags'))
const TimeLine = lazy(() => import('@/pages/timeline'))
const About = lazy(() => import('@/pages/about'))
const Message = lazy(() => import('@/pages/message'))
const Friendly = lazy(() => import('@/pages/friendly'))
const Essay = lazy(() => import('@/pages/essay'))
const Reader = lazy(() => import('@/pages/reader'))
const FE_Project = lazy(() => import('@/pages/navigation/fe-project'))
const FE_Tools = lazy(() => import('@/pages/navigation/fe-tools'))
const FE_Website = lazy(() => import('@/pages/navigation/fe-website'))
const ArticleDetail = lazy(() => import('@/components/content/ArticleDetail'))
const NotFound = lazy(() => import('@/pages/404'))
const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: 'home',
        element: lazyLoad(Home)
      },
      {
        path: '/article/detail/:id',
        element: lazyLoad(ArticleDetail)
      },
      {
        path: 'category',
        element: lazyLoad(Category)
      },
      {
        path: 'tags',
        element: lazyLoad(Tags)
      },
      {
        path: 'timeline',
        element: lazyLoad(TimeLine)
      },
      {
        path: 'links',
        element: lazyLoad(Friendly)
      },
      {
        path: 'essay',
        element: lazyLoad(Essay)
      },
      {
        path: 'message',
        element: lazyLoad(Message)
      },
      {
        path: 'about',
        element: lazyLoad(About)
      },
      {
        path: 'reader',
        element: lazyLoad(Reader)
      },
      {
        path: 'project',
        element: lazyLoad(FE_Project)
      },
      {
        path: 'tools',
        element: lazyLoad(FE_Tools)
      },
      {
        path: 'website',
        element: lazyLoad(FE_Website)
      }
    ]
  },
  {
    path: '*',
    element: lazyLoad(NotFound)
  }
]
const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASE_URL
})
const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
