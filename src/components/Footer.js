import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    const infoLinks = [
        [faGithub, "Github", "https://github.com/Jcssss"],
        [faLinkedin, "LinkedIn", "https://www.linkedin.com/in/justin-siu-142752231/"],
    ]

    const createLink = (icon, label, link) => {
        return <div className="footer-item">
            <FontAwesomeIcon
                icon={icon}
                className = "footer-icon"
            />
            <a href={`${link}`}>{label}</a>
        </div>
    }

    return (
        <div className="footer">
            {infoLinks.map(item => {
                return createLink(...item)
            })}
        </div>
    )
};

export default Footer;