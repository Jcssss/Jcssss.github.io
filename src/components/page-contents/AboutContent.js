import FadeIn from "react-fade-in";
import Footer from '../Footer';

const AboutContent = () => {
    return (
        <>
            <FadeIn>
                <h1 class="title">Hi I'm Justin!</h1>
                <div className='about content'>
                    <p class="main-content">
                        I'm a 4th year student studying Computer Science and Statistics at the University of Victoria. Whether it's a class, hackathon, or personal project I'm always looking for the next opportunity to hone my skills alongside other like-minded individuals.
                        <br/><br/>
                        In my free time I love to play badminton, Pokemon, and crochet!
                        <br/><br/>
                        Thanks for stopping by!
                    </p>
                </div>
                <Footer/>
            </FadeIn>
        </>
    );
}

export default AboutContent;