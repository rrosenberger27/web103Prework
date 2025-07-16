import { useEffect, useState } from 'react'
import { Link, useNavigate, useRoutes, Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import './App.css'
import { supabase } from './client'


function App() {
  const [creators, setCreators] = useState();

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        
        const {data, error} = await supabase.from('creators').select('*');

        if (error) {
          console.error('Error fetching creators: ', error);
          return;
        } 
        setCreators(data);
      

      } catch (error) {
        console.error('An unexpected error occured: ', error);
    }
    }
    fetchCreators(); 
  }, []);

  return (
    <BrowserRouter>
      <div className='app-container'>
        <nav>
          <button className='nav-button'>
            <Link to="/">All Creators</Link>
          </button>
          <button className='nav-button'>
            <Link to="/add">Add Creators</Link>
          </button>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<ShowCreators creators={creators} />} /> 
            <Route path="/add" element={<AddCreator />}/>
            <Route path="/edit/:id" element={<EditCreator />} />
            <Route path="/view/:id" element={<ViewCreator />} />    
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App
