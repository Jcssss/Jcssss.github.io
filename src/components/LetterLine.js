import FadeIn from "react-fade-in";

const LetterLine = ({lineText, wordClass, letterClass}) => {
    const createLetters = (text, letterClass) => {
        return (
            <>  
                {text.split("").map((letter, index) => {
                    return <div
                        className={"hoverable-letter " + letterClass}
                        key={index}> 
                        {letter} 
                    </div>;
                })}
            </>
        )
    };

    const createLine = (text, letterClass, wordClass) => {
        var words = text.split(" ");
        return (
            <div className="flex-container line">
                {words.map((word, i) => {
                    return (
                        <div key={i} 
                            className={`word-container ${(i + 1 == words.length)? '' : wordClass}`}>
                            {createLetters(word, letterClass)}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <FadeIn>
            {createLine(lineText, wordClass, letterClass)}
        </FadeIn>
    );
}

export default LetterLine;