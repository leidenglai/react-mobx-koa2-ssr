import BlogLayout from 'components/BlogLayout'
import BlogList from 'containers/blogList'
import Resume from 'containers/resume'
import NotFound from 'components/404'

const routes = [
  {
    path: '/resume',
    exact: true,
    component: Resume
  },
  {
    path: '/blog',
    component: BlogLayout,
    routes: [
      {
        path: '/blog/list',
        component: BlogList
      }
    ]
  },
  {
    path: '/404',
    exact: true,
    component: NotFound
  },
  {
    redirect: '/404',
    status: 404
  }
]

export default routes
