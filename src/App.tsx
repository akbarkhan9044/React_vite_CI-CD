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
      path="/" element={<Home/>}
      />
      <Route
      path='detail/:id' element={<ProductDetailPage/>}
      />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
