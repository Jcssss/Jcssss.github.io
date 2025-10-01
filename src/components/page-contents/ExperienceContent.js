import FadeIn from "react-fade-in";

const ExperienceContent = (props) => {
    return (
        <>
            <FadeIn>
                <h2 class="title">Work Experience:</h2>
                <div className='experience content'>
                    <p class="main-content">
                        <h4>SAP</h4>
                        <i>Software Developer, Jan 2025 - Dec 2025</i>
                    </p>
                    <ul class="main-content">
                        <li>Maintained the testing infrastructure for SAP Business Data Cloud and automated test feedback services.</li>
                    </ul>
                    <div></div>
                    <p class="main-content">
                        <h4>ACD Systems</h4>
                        <i>QA Analyst, May 2023 - Dec 2023</i>
                    </p>
                    <ul class="main-content">
                        <li>Automated testing of the graphic design software ACDSee.</li>
                    </ul>
                    <div></div>
                    <p class="main-content">
                        <h4>Big Think Technologies Inc</h4>
                        <i>QA Analyst, May 2022 - Aug 2022</i>
                    </p>
                    <ul class="main-content">
                        <li>Manual testing and automated data analysis of the crypto-currency based game Space Tokens.</li>
                    </ul>
                </div>
            </FadeIn>
        </>
    );
}

export default ExperienceContent;