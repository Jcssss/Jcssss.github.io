import FadeIn from "react-fade-in";
import Widget from "./Widget.js";
import { useEffect, useMemo } from "react";

const ExperienceContent = ({badgeColours, setBadgeNames}) => {
    const widgetData = useMemo(() => ({
        "A Thinking Ape": {
            description: "Software Developer, May 2026 - Aug 2026",
            summary: "Built internal tooling to assist in designer authoring workflows for a variety of mobile games.",
            badges: ["Django", "React", "Python", "JavaScript", "Docker"],
        },
        "SAP": {
            description: "Software Developer, Jan 2025 - Dec 2025",
            summary: "Maintained the testing infrastructure for SAP Business Data Cloud and automated test feedback services.",
            badges: ["JavaScript", "Groovy", "Python", "Java", "SQL", "Docker", "Kubernetes"],
        },
        "ACD Systems": {
            description: "Software Developer, Jan 2025 - Dec 2025",
            summary: "Maintained the testing infrastructure for SAP Business Data Cloud and automated test feedback services.",
            badges: ["Python", "CSS", "JavaScript", "Machine Learning"]
        },
        "Big Think Technologies Inc": {
            description: "QA Analyst, May 2022 - Aug 2022",
            summary: "Manual testing and automated data analysis of the crypto-currency based game Space Tokens.",
            badges: ["Python", "Cardano", "Block-chain", "Unity", "C#"]
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
                <h2 class="title">Work Experience:</h2>
                <div className='experience content'>
                    {Object.keys(widgetData).map((key) => {
                        const data = widgetData[key]
                        return <Widget 
                            title={key}
                            description={data["description"]}
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

export default ExperienceContent;