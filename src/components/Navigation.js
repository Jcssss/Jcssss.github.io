import { faFolder, faGraduationCap, faHammer, faCircleUser, faBars} from '@fortawesome/free-solid-svg-icons';
import NavButton from './NavButton';
import FadeIn from "react-fade-in";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = ({curPage, navClick, menuClick, menuState, width}) => {
    const pageData = [['About', faCircleUser], ['Education', faGraduationCap], ['Experience', faHammer], ['Projects', faFolder]];

    if (width > 600) {
        return (
            <FadeIn>
            <div className='nav'>
                {pageData.map((page) => {
                    return (
                        <NavButton
                            curPage={curPage}
                            pageName={page[0]}
                            onClick={navClick}
                        />
                    );
                })}
            </div>
            </FadeIn>
        );
    } else {
        return (
            <div className='nav-mobile'>
                <div className='nav-mobile-top'>
                    <FadeIn>
                        <div className="title"> {curPage}</div>
                        <div className={'menu-icon-container'}>
                        <FontAwesomeIcon
                            icon = {faBars}
                            className = {`menu-icon ${(menuState)? 'active' : ''}`}
                            onClick={menuClick}
                        />
                        </div>
                    </FadeIn>
                </div>
                {pageData.map((page, i) => {
                    return (
                        <div 
                            key={i} 
                            className={`nav-mobile-row ${(menuState)? '' : 'hidden'}`}
                            onClick={() => navClick(page[0])}
                        >
                            <FontAwesomeIcon
                                icon = {page[1]}
                                className = {`nav-icon ${(menuState)? 'active' : ''}`}
                            />
                            <div style={{fontSize: '24px'}}> {page[0]} </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Navigation;