import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavButton = ({icon, curPage, pageName, onClick}) => {
    return (
        <FontAwesomeIcon 
            icon={icon}
            className={`nav-icon ${(curPage===pageName)? 'selected' : ''}`} 
            onClick={() => onClick(pageName)}
        />
    );
};

export default NavButton;