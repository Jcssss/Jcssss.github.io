const AboutContent = ({switchToContactSection}) => {
    const MAIN_TOOLS = [
        { name: 'Python', icon: 'fa-brands fa-python', colorClass: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
        { name: 'JavaScript', icon: 'fa-brands fa-js', colorClass: 'bg-amber-500/10 text-amber-500 border-amber-500/30' },
        { name: 'React', icon: 'fa-brands fa-react', colorClass: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30' },
        { name: 'Java', icon: 'fa-brands fa-java', colorClass: 'bg-orange-500/10 text-orange-500 border-orange-500/30' },
        { name: 'SQL', icon: 'fa-solid fa-database', colorClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
    ];

    return (
        <div className="space-y-6">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium" style={{ color: 'var(--text-main)' }}>
                Hi, I'm Justin!
                <br/><br/>
                I'm a Data Science student in my last semester at the University of Victoria. Whether it's a class, hackathon, or personal project I'm always looking for the next opportunity to hone my skills alongside other passionate individuals.
                <br/><br/>
                In my free time I love to play badminton, play Pokemon, and crochet!
                <br/><br/>
                Thanks for stopping by!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Main Tools Component */}
                <div className="content-box-bg p-4 rounded-xl border flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-3">Main Tools</span>
                        <div className="flex flex-wrap items-center gap-2">
                            {MAIN_TOOLS.map((tool, idx) => (
                                <span 
                                    key={idx} 
                                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 shadow-sm ${tool.colorClass}`}
                                >
                                    <i className={`${tool.icon} text-sm`}></i>
                                    <span>{tool.name}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Connect / Socials Card (Spans 2 columns wide, horizontal layout) */}
                <div className="content-box-bg p-4 rounded-xl border md:col-span-1 flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-3">Connect With Me</span>
                        <div className="flex flex-wrap items-center gap-3">
                            <a 
                                href="https://www.linkedin.com/in/justin-siu-142752231/" 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-3.5 py-2 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 text-xs font-bold flex items-center space-x-2 transition-all shadow-sm active:scale-95"
                            >
                                <i className="fa-brands fa-linkedin text-sm"></i>
                                <span>LinkedIn</span>
                            </a>
                            <a 
                                href="https://github.com/Jcssss" 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-xs font-bold flex items-center space-x-2 transition-all shadow-sm active:scale-95"
                            >
                                <i className="fa-brands fa-github text-sm"></i>
                                <span>GitHub</span>
                            </a>
                            <button 
                                onClick={() => switchToContactSection()}
                                className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 text-xs font-bold flex items-center space-x-2 transition-all shadow-sm active:scale-95"
                            >
                                <i className="fa-solid fa-envelope text-sm"></i>
                                <span>Email Me</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutContent;