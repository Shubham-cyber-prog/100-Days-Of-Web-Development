import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { DocumentEditor } from './components/DocumentEditor';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/document/:id" element={<DocumentEditor />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
