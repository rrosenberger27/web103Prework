import { useEffect, useState } from 'react'
import { Link, useNavigate, useRoutes } from 'react-router-dom'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ShowCreator from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import './App.css'
import { supabase } from './client'


function App() {
  const navigate = useNavigate();

  useEffect(async () => {
    
  })

  return (
    <Router>
      <div className='app-container'>
        <nav>
          <Link to="/creators">All Creators</Link>
          <Link to="/addcreator">Add Creators</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/addcreator" element={<AddCreator />}/>
            <Route path="/creators/:id/edit" element={<EditCreator />} />
            <Route path="creators/:id" element={<ViewCreator />} />
            <Route path="/creators" element={<ShowCreator />} />
            <Route path = "/" element={<ShowCreator />} />
            
          </Routes>
        </main>

      </div>
    </Router>
  )
}

export default App
