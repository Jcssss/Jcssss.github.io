import AboutContent from './page-contents/AboutContent';
import ProjectsContent from './page-contents/ProjectsContent';
import ExperienceContent from './page-contents/ExperienceContent';

const Main = ({page, width}) => {

    const displayContent = (page) => {
        if (page === 'Projects') {
            return <ProjectsContent />;
        } else if (page === 'Experience') {
            return <ExperienceContent />;
        } else {
            return <AboutContent />;
        }
    }

    if (width > 700) {
        return (
            <div className='content-container'>
                {displayContent(page)}
            </div>
        );
    } else {
        return (<>
            <div className='content-container'>
                {displayContent('About')}
            </div>
            <div className='content-container'>
                {displayContent('Experience')}
            </div>
            <div className='content-container'>
                {displayContent('Projects')}
            </div>
        </>);
    }
};

export default Main;