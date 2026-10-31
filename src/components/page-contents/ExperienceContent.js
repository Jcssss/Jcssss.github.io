import { useMemo } from "react";

const ExperienceContent = () => {
    const widgetData = useMemo(() => ([
        {
            company: "A Thinking Ape",
            position: "Software Developer",
            icon: "fa-shield-halved",
            dates: "May 2026 - Aug 2026",
            summary: "Built internal tooling to assist in designer authoring workflows for a variety of mobile games.",
            badges: ["Django", "React", "Python", "JavaScript", "Docker"],
        },
        {
            company: "SAP",
            position: "Software Developer",
            icon: "fa-shield-halved",
            dates: "Jan 2025 - Dec 2025",
            summary: "Maintained the testing infrastructure for SAP Business Data Cloud and automated test feedback services.",
            badges: ["JavaScript", "Groovy", "Python", "Java", "SQL", "Docker", "Kubernetes"],
        },
        {
            company: "ACD Systems",
            position: "Quality Assurance Analyst",
            icon: "fa-shield-halved",
            dates: "May 2023 - Dec 2023",
            summary: "Tested and analyzed data on AI recognition software for image post-processing software.",
            badges: ["Python", "CSS", "JavaScript"]
        },
        {
            company: "Big Think Technologies Inc.",
            position: "Quality Assurance Analyst",
            icon: "fa-shield-halved",
            dates: "May 2022 - Aug 2022",
            summary: "Manual testing and automated data analysis of the crypto-currency based game Space Tokens.",
            badges: ["Python", "Unity", "C#"]
        }
    ]), [])

    const createExperienceWidgets = () => {
        return widgetData.map((data) => {
            return (
                <div key={data.company} className="content-box-bg p-4 rounded-xl border flex items-start space-x-4">
                    <div className="text-yellow-500 text-lg mt-1">
                        <i className={`fa-solid ${data.icon}`}></i>
                    </div>
                    <div className="flex-1">
                        {/* Company Name (Moved above, smaller & lighter) */}
                        <span className="text-xs font-semibold tracking-wider uppercase block mb-0.5" style={{ color: 'var(--text-muted)', opacity: 0.85 }}>
                            {data.company}
                        </span>

                        {/* Job Title */}
                        <h3 className="text-base font-bold" style={{ color: 'var(--text-main)' }}>
                            {data.position}
                        </h3>
                        <span className="text-xs font-semibold text-slate-400 block my-1">
                            {data.dates}
                        </span>
                        <p className="text-xs sm:text-sm mt-2 font-medium" style={{ color: 'var(--text-muted)' }}>
                            {data.summary}
                        </p>
                        
                        {/* Variety tags mapped using the updated CSS variables */}
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                            {data.badges.map((name, index) => {
                                const colorNum = (index % 5) + 1;

                                return (
                                    <div 
                                        key={index} 
                                        className="px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 flex items-center space-x-1.5 shadow-sm hover:scale-105 active:scale-95"
                                        style={{
                                            backgroundColor: `var(--variety-bg-${colorNum})`,
                                            color: `var(--variety-text-${colorNum})`,
                                            borderColor: `var(--variety-border-${colorNum})`
                                        }}
                                    >
                                        <span>{name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="space-y-4">
            {createExperienceWidgets()}
        </div>
    );
}

export default ExperienceContent;