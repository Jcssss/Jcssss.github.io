import { useEffect, useMemo } from "react";

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
            badges: ["Python", "CSS", "JavaScript", "Machine Learning"]
        },
        {
            company: "Big Think Technologies Inc.",
            position: "Quality Assurance Analyst",
            icon: "fa-shield-halved",
            dates: "May 2022 - Aug 2022",
            summary: "Manual testing and automated data analysis of the crypto-currency based game Space Tokens.",
            badges: ["Python", "Cardano", "Block-chain", "Unity", "C#"]
        }
    ]), [])

    const createExperienceWidgets = () => {
        return widgetData.map((data) => {
            return (
                <div className="content-box-bg p-4 rounded-xl border flex items-start space-x-4">
                    <div className="text-indigo-500 dark:text-indigo-400 text-lg mt-1"><i className={`fa-solid ${data.icon}`}></i></div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100" style={{ color: 'var(--text-main)' }}>{data.position} — {data.company}</h3>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-300 block my-1">{data.dates}</span>
                        <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-200 mt-2 font-medium" style={{ color: 'var(--text-muted)' }}>{data.summary}</p>
                        {/* <div className="text-xs sm:text-sm flex flex-row text-slate-300 dark:text-slate-200 font-medium" style={{ color: 'var(--text-muted)' }}>
                            {data.badges.map((name) => {
                                return <div className="px-4 py-2 mx-1 border rounded-full border-blue-500/40 transition-all duration-200 flex items-center space-x-1.5 shadow-sm active:scale-95">{name}</div>
                            })}
                        </div> */}
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