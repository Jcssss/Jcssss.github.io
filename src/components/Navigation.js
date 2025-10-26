import { faFolder, faHammer, faCircleUser} from '@fortawesome/free-solid-svg-icons';
import NavButton from './NavButton';

const Navigation = ({curPage, navClick, width}) => {
    const pageData = [['Projects', faFolder], ['Experience', faHammer], ['About', faCircleUser]].reverse();

    return (
        <ul className='nav'>
            {pageData.map((page) => {
                return (<>
                    <NavButton
                        icon={page[1]}
                        curPage={curPage}
                        pageName={page[0]}
                        onClick={navClick}
                    />
                </>
                );
            })}
        </ul>
    );
}

export default Navigation;