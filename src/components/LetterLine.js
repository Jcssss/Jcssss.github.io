import FadeIn from "react-fade-in";

const LetterLine = ({lineText, wordClass, letterClass}) => {
    const createLetters = (text, letterClass) => {
        return (
            <>  
                {text.split("").map((letter, index) => {
                    console.log(letter)
                    return <div
                        className={"hoverable-letter " + letterClass}
                        key={index}> 
                        {letter} 
                    </div>;
                })}
            </>
        )
    };

    return (
        <FadeIn>
            <div className="flex-container">
                {lineText.split(" ").map((word) => {
                    return (
                        <div className={"word-container " + wordClass}>
                            {createLetters(word, letterClass)}
                        </div>
                    )
                })}
            </div>
        </FadeIn>
    );
}

export default LetterLine;