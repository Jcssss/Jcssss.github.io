import React from 'react';
import SettingsContent from './page-contents/SettingsContent';
import EducationContent from './page-contents/EducationContent';
import AboutContent from './page-contents/AboutContent';
import ProjectsContent from './page-contents/ProjectsContent';
import ExperienceContent from './page-contents/ExperienceContent';

const Main = ({page}) => {

    const displayContent = (page) => {
        if (page === 'Settings') {
            return <SettingsContent />;
        } else if (page === 'Education') {
            return <EducationContent />;
        } else if (page === 'Projects') {
            return <ProjectsContent />;
        } else if (page === 'Experience') {
            return <ExperienceContent />;
        } else {
            return <AboutContent />;
        }
    }

    return (
        <div className='main'>
            {displayContent(page)}
        </div>
    );
};

export default Main;