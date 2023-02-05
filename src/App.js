import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Register, Landing, Error } from './pages'
import { AddJobs, AllJobs, Stats, Profile, SharedLayout, ProtectedRoute } from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>  
          }>
          {/* index is used in next line to make stats as default route for '/' */}
          <Route index element={<Stats />} />   
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>          
    </BrowserRouter>
    
  );
}

export default App;
