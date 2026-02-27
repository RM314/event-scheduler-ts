import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from "./pages/HomePage"
import Layout from './layouts/Layout'
import Event from './components/Event'
import NotFound from "./pages/NotFound";
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedLayout from './layouts/ProtectedLayout'
import NewEventPage from './pages/NewEventPage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<SignInPage />} />
        <Route path="register" element={<SignUpPage />} />

        <Route element={<ProtectedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="events/:id" element={<Event />} />
          <Route path="events/new" element={<NewEventPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App