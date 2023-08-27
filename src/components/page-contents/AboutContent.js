import LetterLine from '../LetterLine';

const AboutContent = (props) => {

    return (
        <div className="lines">
            <LetterLine
                lineText="I'm Justin"
                letterClass="large-text"
                wordClass="large-text"
            />
            <LetterLine
                lineText="Data Science"
                letterClass="normal-text"
                wordClass="normal-text"
            />
        </div> 
    );
}

export default AboutContent;