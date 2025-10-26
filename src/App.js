import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Main from './components/Main';

const App = () => {
    const [page, setPage] = useState('About');
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

    const displayContent = () => {
        return (<>
            <div class="page">
                <Navigation 
                    curPage={page} 
                    navClick={changePage} 
                    menuClick={toggleMenu}
                    menuState={menu}
                    width={width}
                />
                <Main 
                    width={width}
                    page={page}
                />
            </div>
        </>
        );
    }

    return (
        <>{displayContent()}</>
    );
}

export default App;
