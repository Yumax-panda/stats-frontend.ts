import './style/common.css';

import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import LeaderBoard from './pages/leaderboard';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <body className="text-light">
        <header className="App-header">
        <div className="container">
          <nav className="navbar bg-dark mb-3">
          <NavLink className="nav-link text-light" to="/" id="headerTitle">交流戦Bot&nbsp;Webサービス</NavLink>
            <ul className="navbar-nav flex-grow">
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">概要</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/info">お知らせ</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">戦績一覧</NavLink>
              </li>
            </ul>
            <div className="dummy"></div>
          </nav>
        </div>
        </header>
        <Switch>
          <Route path="/leaderboard"><LeaderBoard /></Route>
        </Switch>
      </body>
    </div>
    </BrowserRouter>
  );
}

export default App;
