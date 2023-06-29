import './style/common.css';

import React from 'react';

import LeaderBoard from './pages/leaderboard';

function App() {
  return (
    <div className="App">
      <body className="text-light">
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
          <div className="container">
            <h3 id="headerTitle">交流戦 Bot Webサービス</h3>
            <div className="navbar-nav flex-grow">
              <ul className="navbar-nav flex-grow">
                <li className="nav-item">
                  <a className="nav-link text-light" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="/info">お知らせ</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <LeaderBoard />
      </body>
    </div>
  );
}

export default App;
