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
        description: "A responsive team planner for the video game Team Fight Tactics",
        demo: "https://jcssss.github.io/TFTTeamPlanner/",
        link: "https://github.com/Jcssss/TFTCompPlanner",
        icon: "fa-wand-magic-sparkles",
        stats: { ManaCost: "4", LinesOfCode: "8,900", Rating: "4.8 / 5.0" }
    },
    {
        title: "Green Not Greed Database",
        tags: ["Python", "PostgreSQL"],
        description: "A relational database and text-based user interface for the company Green Not Greed.",
        link: "https://github.com/Jcssss/GNG",
        icon: "fa-server",
        stats: { ManaCost: "4", LinesOfCode: "10,200", Rating: "5.0 / 5.0" }
    }
];

const ProjectsContent = ({onOpenModal}) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECTS_DETAILS.map((proj, idx) => (
                <div key={idx} className="content-box-bg p-6 rounded-xl border hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between group min-h-[240px]">
                    <div>
                        {/* Changed items-start to items-center for vertical alignment */}
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-400/50 flex-shrink-0 flex items-center justify-center text-emerald-500  group-hover:scale-110 transition-transform">
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
                        
                        <button 
                            onClick={() => onOpenModal(idx)}
                            className="w-full py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border border-emerald-400/40 text-xs font-bold transition-colors flex items-center justify-center space-x-2"
                        >
                            <span>Inspect Artifact</span>
                            <i className="fa-solid fa-arrow-right text-[10px]"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectsContent;