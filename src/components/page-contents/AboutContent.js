const AboutContent = () => {
    return (
        <>
            <div className="space-y-6">
                <p className="text-sm sm:text-base text-slate-300 dark:text-slate-200 leading-relaxed font-medium" style={{ color: 'var(--text-main)' }}>
                    Hi, I'm Justin!
                    <br/><br/>
                    I'm a Data Science student in my last semester at the University of Victoria. Whether it's a class, hackathon, or personal project I'm always looking for the next opportunity to hone my skills alongside other passionate individuals.
                    <br/><br/>
                    In my free time I love to play badminton, play Pokemon, and crochet!
                    <br/><br/>
                    Thanks for stopping by!
                </p>
                {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="content-box-bg p-4 rounded-xl border">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase block mb-1">Class</span>
                        <span className="text-lg font-extrabold text-blue-500 dark:text-blue-400">Full-Stack Mage</span>
                    </div>
                    <div className="content-box-bg p-4 rounded-xl border">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase block mb-1">Primary Weapon</span>
                        <span className="text-lg font-extrabold text-blue-500 dark:text-blue-400">C++ / React / Python</span>
                    </div>
                    <div className="content-box-bg p-4 rounded-xl border">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase block mb-1">Specialization</span>
                        <span className="text-lg font-extrabold text-blue-500 dark:text-blue-400">UI/UX & Systems</span>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default AboutContent;