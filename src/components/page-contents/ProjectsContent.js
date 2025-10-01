import FadeIn from "react-fade-in";

const ProjectsContent = (props) => {
    return (
        <>
            <FadeIn>
                <h2 class="title">Projects:</h2>
                <div className='experience content'>
                    <p class="main-content">
                        <h4>Team Fight Tactics Team Planner</h4>
                        <a href="https://github.com/Jcssss/TFTCompPlanner">https://github.com/Jcssss/TFTCompPlanner</a>
                    </p>
                    <ul class="main-content">
                        <li>A responsive team planner for the video game Team Fight Tactics</li>
                    </ul>
                    <div></div>
                    <p class="main-content">
                        <h4>Green Not Greed Database and UI</h4>
                        <a href="https://github.com/Jcssss/GNG">https://github.com/Jcssss/GNG</a>
                    </p>
                    <ul class="main-content">
                        <li>A relational database and text-based user interface for the company Green Not Greed.</li>
                    </ul>
                    <div></div>
                    <p class="main-content">
                        <h4>Ray Tracer</h4>
                        <a href="https://github.com/Jcssss/ray-tracer">https://github.com/Jcssss/ray-tracer</a>
                    </p>
                    <ul class="main-content">
                        <li>A series of ray tracers built with increasing complexity with components including reflection, refraction, rasterization, and shadows.</li>
                    </ul>
                    <div></div>
                    <p class="main-content">
                        <h4>Last Light</h4>
                        <a href="https://github.com/Jcssss/LastLight">https://github.com/Jcssss/LastLight</a>
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