import { Register } from '../Layout/RegisterLayout'
import { Home } from '../Layout/Home'

import DangKyChuXe from '../Layout/Home/DangKyChuXe/DangKyChuXe'
import { HomeAdmin } from '../Layout/AdminLayout'

const publicRoutes = [
  { path: '/', component: Home, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/user', component: Home},
  { path: '/admin', component: HomeAdmin, layout: null },
  { path: '/dangkychuxe', component: DangKyChuXe},


]
const privateRoutes = []
export { publicRoutes, privateRoutes }
