import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';

import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './api/firebase-config/firebase-config';
import UnAuthLayout from './components/layouts/unauth-layout';

function App() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    })

    return unsubscribe;
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<UnAuthLayout user={currentUser} />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<Home user={currentUser} />} />
      </>
    )
  );

  return (
    <main className='App'>
      <RouterProvider router={router} />
    </main>
  )
}

export default App;
