// src/App.jsx
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import SearchBooks from './components/SearchBooks';
import SavedBooks from './components/SavedBooks';
import LoginSignup from './components/LoginSignup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<SearchBooks />} />
        <Route path="/saved" element={<SavedBooks />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  </ApolloProvider>
);

export default App;
