import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/login/page.tsx";
import SignUp from "./components/signup/page.tsx";
import LearnPage from "./components/learn/page.tsx";
import Home from "./components/page.tsx";
import Example1 from "./components/learn/example-1.tsx";
import ProblemPage from "./components/problem/page.tsx";
import Problem from "./components/problem/problem.tsx";
import Contest from "./components/contest/page.tsx";
import Store from "./components/store/page.tsx";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {/* public routes */}
        <Route>
          <Route index path='/' element={<Home/>}/>
          <Route path='/login' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/learn' element={<LearnPage/>}/>
          <Route path='/example-1' element={<Example1/>}/>
          <Route path='/problem' element={<ProblemPage/>}/>
          <Route path='/problem-1' element={<Problem/>}/>
          <Route path='/contest' element={<Contest/>}/>
          <Route path='/store' element={<Store/>}/>
          {/* Add more public routes as needed */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;