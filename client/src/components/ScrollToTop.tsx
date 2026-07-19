import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // Wait a tick for the destination page to mount before looking up the anchor.
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView()
      })
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}
