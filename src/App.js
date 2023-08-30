import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Main from './components/Main';
import LandingPage from './components/page-contents/LandingPage';

const App = () => {
    const [page, setPage] = useState('About');
    const [onLanding, setLanding] = useState(true);
    const [menu, setMenu] = useState(false);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        window.addEventListener("resize", detectWidth);
        detectWidth();
    });

    const detectWidth = () => {
        setWidth(window.innerWidth);
    }

    const changePage = (pageName) => {
        setPage(pageName);

        if (menu) {
            setMenu(false);
        }
    }

    const toggleMenu = () => {
        setMenu(!menu);
    }

    const displayContent = (landingState) => {
        if (landingState) {
            return (
                <div 
                    className="landing-container"
                    onClick={() => setLanding(false)} 
                    onKeyDown={() => setLanding(false)}
                >
                    <LandingPage />
                </div>
            );
        } else {
            return (
                <div> 
                    <Navigation 
                        curPage={page} 
                        navClick={changePage} 
                        menuClick={toggleMenu}
                        menuState={menu}
                        width={width}
                    />
                    <Main page={page} />
                </div>
            );
        }
    }

    return (
        <>{displayContent(onLanding)}</>
    );
}

export default App;
