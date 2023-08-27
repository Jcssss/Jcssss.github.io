

const LetterLine = ({lineText, wordClass, letterClass}) => {
    const createLetters = (text, letterClass) => {
        return (
            <div>
                {text.split("").map((letter, index) => {
                    console.log(letter)
                    return <div
                        className={"hoverable-letter " + letterClass}
                        key={index}> 
                        {letter} 
                    </div>;
                })}
            </div>
        )
    };

    return (
        <div className="flex-container">
            {lineText.split(" ").map((word) => {
                return (
                    <div className={"word-container " + wordClass}>
                        {createLetters(word, letterClass)}
                    </div>
                )
            })}
        </div>
    );
}

export default LetterLine;