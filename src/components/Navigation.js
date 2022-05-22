import { faFolder, faGear, faGraduationCap, faHammer, faCircleUser} from '@fortawesome/free-solid-svg-icons';
import NavButton from './NavButton';

const Navigation = ({curPage, onClick}) => {
    const icons = [faGear, faCircleUser, faGraduationCap, faFolder, faHammer];
    const pageNames = ['settings', 'about', 'education', 'projects', 'experience'];

    return (
        <div className='nav'>
            {icons.map(function (icon, i) {
                return (<NavButton
                    key={pageNames[i]} 
                    icon={icon}
                    curPage={curPage}
                    pageName={pageNames[i]}
                    onClick={onClick}
                />);
            })}
        </div>
    );
}

export default Navigation;