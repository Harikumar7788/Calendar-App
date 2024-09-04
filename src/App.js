import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import EventPage from './pages/EditEvent';

const App = () => (
<div>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
    </Router>
    </div>
);

export default App;
