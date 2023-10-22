import FadeIn from "react-fade-in";

const AboutContent = () => {
    return (
        <div className='about-content-container'>
            <div className='about-text'>
                <FadeIn>
                    <h1>Hi, I'm Justin</h1>
                    <div>Description</div>
                </FadeIn>
            </div> 
        </div>
    );
}

export default AboutContent;