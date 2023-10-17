import LetterLine from '../LetterLine';

const AboutContent = () => {

    return (
        <div className='about-content-container'>
            <div className='lines center'>
                <LetterLine
                    lineText="Hi, I'm Justin"
                    letterClass="large-text"
                    wordClass="large-text"
                />
                <LetterLine
                    lineText="Description"
                    letterClass="normal-text"
                    wordClass="normal-text"
                />
            </div> 
        </div>
    );
}

export default AboutContent;