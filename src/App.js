import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Main from './components/Main';
import LandingPage from './components/page-contents/LandingPage';

const App = () => {
    const [page, setPage] = useState('About');
    const [onLanding, setLanding] = useState(true);

    const changePage = (pageName) => {
        setPage(pageName);
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
                    <Navigation curPage={page} onClick={changePage}/>
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
