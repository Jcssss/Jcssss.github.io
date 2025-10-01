import FadeIn from "react-fade-in";

const ProjectsContent = (props) => {
    return (
        <>
            <FadeIn>
                <h2 class="title">Projects:</h2>
                <div className='experience content'>
                    <p class="main-content">
                        <h4><a href="https://github.com/Jcssss/TFTCompPlanner">Team Fight Tactics Team Planner</a></h4>
                    </p>
                    <ul class="main-content">
                        <li>A responsive team planner for the video game Team Fight Tactics</li>
                    </ul>
                    <div></div>
                    <p class="main-content">
                        <h4><a href="https://github.com/Jcssss/GNG">Green Not Greed Database and UI</a></h4>
                    </p>
                    <ul class="main-content">
                        <li>A relational database and text-based user interface for the company Green Not Greed.</li>
                    </ul>
                    <div></div>
                    <p class="main-content">
                        <h4><a href="https://github.com/Jcssss/ray-tracer">Ray Tracer</a></h4>
                    </p>
                    <ul class="main-content">
                        <li>A series of ray tracers built with increasing complexity with components including reflection, refraction, rasterization, and shadows.</li>
                    </ul>
                    <div></div>
                    <p class="main-content">
                        <h4><a href="https://github.com/Jcssss/LastLight">Last Light</a></h4>
                    </p>
                    <ul class="main-content">
                        <li>A 2D platformer where you and your loyal companion, Pixie, must escape the darkness and monsters that haunts the lighthouse.</li>
                    </ul>
                </div>
            </FadeIn>
        </>
    );
}

export default ProjectsContent;