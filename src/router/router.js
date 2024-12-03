import { Register } from '../Layout/RegisterLayout'
import { Logintong } from '../Layout/LoginLayout'
import { Login } from '../Layout/LoginLayout/Login'
import { User } from '../Layout/UserLayout'
import { Admin } from '../Layout/AdminLayout'

const publicRoutes = [
  { path: '/', component: Logintong, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/login', component: Login, layout: null },
  { path: '/user', component: User, layout: null },
  { path: '/admin', component: Admin, layout: null }
]
const privateRoutes = []
export { publicRoutes, privateRoutes }
