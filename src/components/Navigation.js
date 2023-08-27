import { faFolder, faGraduationCap, faHammer, faCircleUser} from '@fortawesome/free-solid-svg-icons';
import NavButton from './NavButton';
import FadeIn from "react-fade-in";

const Navigation = ({curPage, onClick}) => {
    const pageData = [['Projects', faFolder], ['Experience', faHammer], ['Education', faGraduationCap], ['About', faCircleUser]];

    return (
        <div className='nav'>
            <FadeIn>
                <div className="title"> 
                    {curPage}
                </div>
                {pageData.map((page, i) => {
                    return (
                        <div className='nav-buttonContainer'>
                            <NavButton
                                key={page[0]} 
                                icon={page[1]}
                                curPage={curPage}
                                pageName={page[0]}
                                onClick={onClick}
                            />
                        </div>
                    );
                })}
            </FadeIn>
        </div>
    );
}

export default Navigation;