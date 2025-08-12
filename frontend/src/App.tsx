import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index.tsx';
import CitizenHome from './pages/CitizenHome.tsx';
import CitizenProfile from './pages/CitizenProfile.tsx';
import ReportIssue from './pages/ReportIssue.tsx';
import AdminHome from './pages/AdminHome.tsx';
import AdminProfile from './pages/AdminProfile.tsx';
import NotFound from './pages/NotFound.tsx';
import './App.css'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Index />} />
  <Route path='/citizen' element={<CitizenHome />} />
          <Route path='/citizen/profile' element={<CitizenProfile />} />
          <Route path='/report-issue' element={<ReportIssue />} />
          <Route path='/admin' element={<AdminHome />} />
          <Route path='/admin/profile' element={<AdminProfile />} />
          <Route path="*" element={<NotFound />} />
</Routes>
</BrowserRouter>
</QueryClientProvider>
)

export default App;