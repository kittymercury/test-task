import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './index.scss'
import App from './App'
import ArticlePage from './components/article-page'
import List from './components/list'
import ErrorPage from './components/error-page'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="articles" element={<List />} />
        <Route path="article">
          <Route path=":id" element={<ArticlePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
)
