import React from 'react';

const NavButton = ({curPage, pageName, onClick}) => {
    return (
        <div className='nav-button' onClick={() => onClick(pageName)}>
            {pageName}
        </div>
    );
};

export default NavButton;