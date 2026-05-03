/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import AddActivity from './pages/AddActivity';
import Reports from './pages/Reports';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/add-activity" element={<AddActivity />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}
