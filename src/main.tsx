import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'


document.title = 'Gerador de Currículo Inteligente'


function setFavicon(href: string) {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = href
}


setFavicon('/favicon-32x32.png')

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
