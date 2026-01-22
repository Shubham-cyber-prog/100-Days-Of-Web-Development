import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Rightbar from './components/Rightbar';

function App() {
  const [mode, setMode] = useState('light');

  return (
    <div className={`theme-${mode} bg-gray-100 min-h-screen font-sans`}>
      <Navbar />
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 pt-20">
        <div className="hidden md:block md:col-span-1">
          <Sidebar />
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <Feed />
        </div>
        
        <div className="hidden lg:block lg:col-span-1">
          <Rightbar />
        </div>
      </div>
    </div>
  );
}

export default App;