import FadeIn from "react-fade-in";

const LandingPage = (props) => {

    return ( 
        <div className="landing-page lines center">
            <FadeIn>
                <div>Justin Siu</div>
                <div>Data Analysis | Software Development</div>
                <div>Java | Python | Javascript</div>
                <div>(Click to Continue)</div>
            </FadeIn>
        </div>
    );
}

export default LandingPage;