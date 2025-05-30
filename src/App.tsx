import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/login/page.tsx";
import SignUp from "./components/signup/page.tsx";
import Home from "./components/page.tsx";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {/* public routes */}
        <Route>
          <Route index path='/' element={<Home/>}/>
          <Route path='/login' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Route>

        {/* private routes */}
        <Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;