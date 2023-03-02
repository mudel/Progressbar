import React, { useState } from "react";
import avatar from './images/avatar.png';

function Profile(downArrow, setdownArrow) {
  setdownArrow(!downArrow);
  return
}

function Header() {
  const [downArrow, setdownArrow] = useState(true);
  return (
    <div className="headerContainer">
      <p className="headerTitle">Awesome Kanban Board</p>
      <div className="headerRightContainer">
        <div className="profileContainer">
          <img className="avatar" src={avatar} alt={'Avatar'} />
          <button className="buttonProfile"
            onClick={() => Profile(downArrow, setdownArrow)}>
            <svg className="vector"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              transform={downArrow ? "translate(0 2) rotate(-180) translate(-0 -2)" : "translate(0 2) rotate(0) translate(-0 -2)"}
            >
              <path d="M1.415 7.79001L6 3.20501L10.585 7.79001L12 
                  6.37501L6 0.375008L0 6.37501L1.415 7.79001Z"
              />
            </svg>
          </button>
        </div>
        {
          !downArrow &&
          <nav className='changeProfileContainer'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rectangle">
              <rect x="7.7782" width="11" height="11" transform="rotate(45 7.7782 0)" fill="white" />
            </svg>
            <select
              className='statusSelectorProfile'
              aria-label='statusSelectorProfile'
              size='2'
              onChange={
                () => Profile(downArrow, setdownArrow)
              }
            >
              <option key={1} className='taskStringProfile'>Profile</option>
              <option key={2} className='taskStringProfile'>Log Out</option>
            </select>
          </nav>
        }
      </div>
    </div>

  );
}

export default Header;