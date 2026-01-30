import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from './page/home/Home';
import ProductDetailPage from './page/detail/Detail';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route
      path="/React_vite_CI-CD" element={<Home/>}
      />
      <Route
      path='/React_vite_CI-CD/detail/:id' element={<ProductDetailPage/>}
      />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
