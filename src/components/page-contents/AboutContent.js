import FadeIn from "react-fade-in";

const AboutContent = () => {
    return (
        <div className='about-content-container'>
            <div className='about-text'>
                <FadeIn>
                    <div>Hi I'm Justin</div>
                    <div>Description</div>
                </FadeIn>
            </div> 
        </div>
    );
}

export default AboutContent;