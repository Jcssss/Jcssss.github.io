import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavButton = ({icon, curPage, pageName, onClick}) => {

    const getPageName = () => {
        if (pageName === curPage) {
            return <u className="nav-button-container">
                <FontAwesomeIcon
                    icon={icon}
                    className = "nav-icon"
                />
                {pageName}
            </u>
        } else {
            return <p className="nav-button-container">
                <FontAwesomeIcon
                    icon={icon}
                    className = "nav-icon"
                />
                {pageName}
            </p>
        }
    }

    return (
        <li className='nav-button' onClick={() => onClick(pageName)}>
            {getPageName()}
        </li>
    );
};

export default NavButton;