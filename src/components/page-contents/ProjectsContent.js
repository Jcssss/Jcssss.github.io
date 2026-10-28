export const PROJECTS_DETAILS = [
    {
        title: "Chess Game Analyzer",
        tags: ["React", "TypeScript", "Tailwind CSS"],
        description: "An interactive, web-based chess evaluation analyzer that calculates real-time move probabilities, position evaluation scores, and optimal line suggestions.",
        demo: "https://jcssss.github.io/ChessAnalyzer/",
        link: "https://github.com/Jcssss/ChessAnalyzer",
        icon: "fa-chess-knight",
        stats: { ManaCost: "4", LinesOfCode: "12,400", Rating: "4.9 / 5.0" }
    },
    {
        title: "Team Fight Tactics Planner",
        tags: ["Typescript", "CSS", "HTML"],
        description: "A responsive team builder and strategy planner for Team Fight Tactics featuring an intuitive UI that allows seamless drag-and-drop unit placement across the board, alongside customizable item loadouts and set options.",
        demo: "https://jcssss.github.io/TFTTeamPlanner/",
        link: "https://github.com/Jcssss/TFTCompPlanner",
        icon: "fa-wand-magic-sparkles",
        stats: { ManaCost: "4", LinesOfCode: "8,900", Rating: "4.8 / 5.0" }
    },
    {
        title: "Green Not Greed Database",
        tags: ["Python", "PostgreSQL"],
        description: "A robust relational database and text-based interface built for Green Not Greed, providing comprehensive tracking, monitoring, and updating capabilities for sponsors, volunteers, and events.",
        link: "https://github.com/Jcssss/GNG",
        icon: "fa-server",
        stats: { ManaCost: "4", LinesOfCode: "10,200", Rating: "5.0 / 5.0" }
    }
];

const ProjectsContent = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECTS_DETAILS.map((proj, idx) => (
                <div key={idx} className="content-box-bg p-6 rounded-xl border hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between group min-h-[240px]">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-400/50 flex-shrink-0 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                <i className={`fa-solid ${proj.icon} text-base`}></i>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-500 transition-colors leading-snug break-words" style={{ color: 'var(--text-main)' }}>
                                {proj.title}
                            </h3>
                        </div>
                        
                        <p className="text-xs sm:text-sm leading-relaxed mb-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                            {proj.description}
                        </p>
                    </div>

                    <div>
                        {/* Badges using the 1-5 CSS variable variety system */}
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                            {proj.tags.map((t, i) => {
                                const colorNum = (i % 5) + 1;

                                return (
                                    <span 
                                        key={i} 
                                        className="px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 flex items-center shadow-sm"
                                        style={{
                                            backgroundColor: `var(--variety-bg-${colorNum})`,
                                            color: `var(--variety-text-${colorNum})`,
                                            borderColor: `var(--variety-border-${colorNum})`
                                        }}
                                    >
                                        {t}
                                    </span>
                                );
                            })}
                        </div>
                        
                        {/* Action Buttons: Conditionally renders Live Demo if present + Github Link */}
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-700/30">
                            {proj.demo && (
                                <a 
                                    href={proj.demo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-95"
                                >
                                    <span>Demo</span>
                                    <i className="fa-solid fa-up-right-from-square text-[10px]"></i>
                                </a>
                            )}
                            <a 
                                href={proj.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2 px-3 rounded-lg bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 hover:text-slate-200 border border-slate-500/30 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-95"
                            >
                                <i className="fa-brands fa-github text-xs"></i>
                                <span>Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectsContent;