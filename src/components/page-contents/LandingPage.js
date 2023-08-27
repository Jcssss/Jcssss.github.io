import LetterLine from '../LetterLine';

const LandingPage = (props) => {

    return (
        <div className="landing-page lines center">
            <LetterLine
                lineText="Justin Siu"
                letterClass="large-text"
                wordClass="large-text"
            />
            <LetterLine
                lineText="Data Analysis | Software Development"
                letterClass="small-text"
                wordClass="small-text"
            />
            <LetterLine
                lineText="Java | Python | Javascript"
                letterClass="small-text"
                wordClass="small-text"
            />
            <div style={{height: 50}}></div>
            <LetterLine
                lineText="(Click to Continue)"
                letterClass="small-text"
                wordClass="small-text"
            />
        </div> 
    );
}

export default LandingPage;