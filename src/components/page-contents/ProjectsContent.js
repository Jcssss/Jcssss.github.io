import { useEffect, useMemo } from "react";
import FadeIn from "react-fade-in";
import Widget from "./Widget";

const ProjectsContent = ({badgeColours, setBadgeNames}) => {

    const widgetData = useMemo(() => ({
        "Team Fight Tactics Team Planner": {
            link: "https://github.com/Jcssss/TFTCompPlanner",
            summary: "A responsive team planner for the video game Team Fight Tactics",
            badges: ["Typescript", "CSS", "HTML"]
        },
        "Green Not Greed Database and UI": {
            link: "https://github.com/Jcssss/GNG",
            summary: "A relational database and text-based user interface for the company Green Not Greed.",
            badges: ["Python", "PostgreSQL"]
        },
        "Ray Tracer Series": {
            link: "https://github.com/Jcssss/ray-tracer",
            summary: "A series of ray tracers built with increasing complexity with components including reflection, refraction, rasterization, and shadows.",
            badges: ["C++"]
        },
        "Last Light": {
            link: "https://github.com/Jcssss/LastLight",
            summary: "A 2D platformer where you and your loyal companion, Pixie, must escape the darkness and monsters that haunts the lighthouse.",
            badges: ["C#", "Unity"]
        }
    }), [])

    useEffect(() => {
        setBadgeNames((curr) => {
            const newBadges = Object.keys(widgetData).map((key) => widgetData[key]["badges"])
            let updatedBadges = [...curr]
            for (let badgeSet of newBadges) {
                for (let badgeName of badgeSet) {
                    if (!updatedBadges.includes(badgeName)) {
                        updatedBadges.push(badgeName)
                    }
                }
            }
            return [...updatedBadges]
        })
    }, [widgetData, setBadgeNames])

    return (
        <>
            <FadeIn>
                <h2 class="title">Projects:</h2>
                <div className='experience content'>
                    {Object.keys(widgetData).map((key) => {
                        const data = widgetData[key]
                        return <Widget 
                            title={key}
                            link={data["link"]}
                            summary={data["summary"]}
                            badges={data["badges"]}
                            badgeColours={badgeColours}
                        />
                    })}
                </div>
            </FadeIn>
        </>
    );
}

export default ProjectsContent;