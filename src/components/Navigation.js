import { faFolder, faGear, faGraduationCap, faHammer, faCircleUser, faHouse} from '@fortawesome/free-solid-svg-icons';
import NavButton from './NavButton';

const Navigation = ({curPage, onClick}) => {
    const pageData = [['Projects', faFolder], ['Experience', faHammer], ['Education', faGraduationCap], ['About', faCircleUser], ['Home', faHouse]];

    return (
        <div className='nav'>
            <div className="title"> 
                {curPage}
            </div>
            {pageData.map((page) => {
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
        </div>
    );
}

export default Navigation;