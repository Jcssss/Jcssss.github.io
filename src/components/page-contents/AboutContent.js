import LetterLine from '../LetterLine';

const AboutContent = (props) => {

    return (
        <div className="lines center">
            <LetterLine
                lineText="Test Text"
                letterClass="large-text"
                wordClass="large-text"
            />
            <LetterLine
                lineText="Description"
                letterClass="normal-text"
                wordClass="normal-text"
            />
        </div> 
    );
}

export default AboutContent;