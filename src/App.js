import React, { useState } from 'react';
import Navigation from './components/Navigation';
import SettingsContent from './components/page-contents/SettingsContent';
import EducationContent from './components/page-contents/EducationContent';
import AboutContent from './components/page-contents/AboutContent';
import ProjectsContent from './components/page-contents/ProjectsContent';
import ExperienceContent from './components/page-contents/ExperienceContent';

const App = () => {
    const [page, setPage] = useState('about');

    const changePage = (pageName) => {
        setPage(pageName);
    }

    const displayContent = (page) => {
        if (page === 'settings') {
            return <SettingsContent />;
        } else if (page === 'education') {
            return <EducationContent />;
        } else if (page === 'projects') {
            return <ProjectsContent />;
        } else if (page === 'experience') {
            return <ExperienceContent />;
        } else {
            return <AboutContent />;
        }
    }

    return (
        <div> 
            <Navigation curPage={page} onClick={changePage}/>
            <div className='main'>
                {displayContent(page)}
            </div>
        </div>
    );
}

export default App;
