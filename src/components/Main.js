import { useState, useEffect } from "react"
import AboutContent from './page-contents/AboutContent';
import ProjectsContent from './page-contents/ProjectsContent';
import ExperienceContent from './page-contents/ExperienceContent';

const Main = ({page, width}) => {
    const [badgeNames, setBadgeNames] = useState([])
    const [badgeColours, setBadgeColours] = useState({})
    const displayContent = (page) => {
        if (width > 900) {
            if (page === 'Projects') {
                return <ProjectsContent badgeColours={badgeColours} setBadgeNames={setBadgeNames}/>;
            } else if (page === 'Experience') {
                return <ExperienceContent badgeColours={badgeColours} setBadgeNames={setBadgeNames}/>;
            } else {
                return <AboutContent />;
            }
        } else {
            return <>
                <AboutContent />
                <ExperienceContent badgeColours={badgeColours} setBadgeNames={setBadgeNames}/>
                <ProjectsContent badgeColours={badgeColours} setBadgeNames={setBadgeNames}/>
            </>
        }
    }

    useEffect(() => {
        setBadgeColours(() => {
            let maxHue = 0
            let currBadges = {}
            for (let name of badgeNames) {
                maxHue += 55
                const hue = maxHue % 360 // 5 * 2*3 * 3^2 = m * n = 720 432
                currBadges[name] = hue
            }
            return {...currBadges}
        })
    }, [badgeNames, setBadgeColours])

    return (
        <div className='content-container'>
            {displayContent(page)}
        </div>
    );
};

export default Main;