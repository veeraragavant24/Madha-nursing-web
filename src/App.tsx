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

type Page = 'home' | 'about' | 'courses' | 'departments' | 'gallery' | 'contact' | 'management' | 'principal'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
    }
    document.title = titles[page]
  }, [page])

  const pages: Record<Page, React.ReactNode> = {
    home: <Home navigate={navigate} />,
    about: <About navigate={navigate} />,
    courses: <Courses navigate={navigate} />,
    departments: <Departments navigate={navigate} />,
    gallery: <Gallery navigate={navigate} />,
    contact: <Contact navigate={navigate} />,
    management: <Management navigate={navigate} />,
    principal: <Principal navigate={navigate} />,
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav currentPage={page} navigate={navigate} />
      <main style={{ flex: 1 }}>
        {pages[page]}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
