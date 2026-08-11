import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Departments from './pages/Departments'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Management from './pages/Management'
import Principal from './pages/Principal'
import NewsEvents from './pages/NewsEvents'
import AdminLogin from './pages/AdminLogin'
import AdminNewsEvents from './pages/AdminNewsEvents'

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal' | 'news-events'
type AdminRoute = 'login' | 'dashboard'

// Resolve an admin route from the current URL path (e.g. /admin/login, /admin/news-events).
function readAdminRoute(): AdminRoute | null {
  const segments = window.location.pathname.split('/').filter(Boolean)
  if (segments[0] !== 'admin') return null
  return segments[1] === 'news-events' ? 'dashboard' : 'login'
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [adminRoute, setAdminRoute] = useState<AdminRoute | null>(() => readAdminRoute())

const navigate = (p: Page) => {
  // Change page
  setPage(p)

  // Immediately return to the top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  })
}

  useEffect(() => {
    const onPop = () => setAdminRoute(readAdminRoute())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const goToLogin = () => {
    window.history.pushState({}, '', '/admin/login')
    setAdminRoute('login')
    window.scrollTo({ top: 0, left: 0 })
  }

  const goToDashboard = () => {
    window.history.pushState({}, '', '/admin/news-events')
    setAdminRoute('dashboard')
    window.scrollTo({ top: 0, left: 0 })
  }

  const goHome = () => {
    window.history.pushState({}, '', '/')
    setAdminRoute(null)
    window.scrollTo({ top: 0, left: 0 })
  }

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'Madha College of Nursing — Chennai',
      about: 'About Us — Madha College of Nursing',
      courses: 'Nursing Programmes — Madha College',
      departments: 'Departments — Madha College of Nursing',
      gallery: 'Gallery — Madha College of Nursing',
      contact: 'Contact & Admissions — Madha College',
      management: 'Management — Madha College of Nursing',
      principal: "Principal's Office — Madha College of Nursing",
      'news-events': 'News & Events — Madha College of Nursing',
    }

    if (adminRoute === 'login') document.title = 'Admin Login — Madha College of Nursing'
    else if (adminRoute === 'dashboard') document.title = 'News & Events Admin — Madha College of Nursing'
    else document.title = titles[page]
  }, [page, adminRoute])

  if (adminRoute === 'login') {
    return <AdminLogin goToDashboard={goToDashboard} goHome={goHome} />
  }

  if (adminRoute === 'dashboard') {
    return <AdminNewsEvents goToLogin={goToLogin} goHome={goHome} />
  }

  const pages: Record<Page, React.ReactNode> = {
    home: <Home navigate={navigate} />,
    about: <About navigate={navigate} />,
    courses: <Courses navigate={navigate} />,
    departments: <Departments navigate={navigate} />,
    gallery: <Gallery navigate={navigate} />,
    contact: <Contact navigate={navigate} />,
    management: <Management navigate={navigate} />,
    principal: <Principal navigate={navigate} />,
    'news-events': <NewsEvents navigate={navigate} />,
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav currentPage={page} navigate={navigate} />
      <main style={{ flex: 1 }} key={page} className="page-enter">
        {pages[page]}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
