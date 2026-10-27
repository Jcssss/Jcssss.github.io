import React, { useState, useEffect } from 'react';

// ==========================================
// 1. NAVBAR COMPONENT
// ==========================================
const Navbar = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#about" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
          Justin Siu
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle Dark and Light Mode"
            className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer"
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun text-amber-400 text-lg"></i>
            ) : (
              <i className="fa-solid fa-moon text-slate-700 text-lg"></i>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation Menu"
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <i className="fa-solid fa-xmark text-xl"></i>
            ) : (
              <i className="fa-solid fa-bars text-xl"></i>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-8 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

// ==========================================
// 2. ABOUT COMPONENT
// ==========================================
const About = () => {
  const coreSkills = [
    'React',
    'Node.js',
    'TypeScript',
    'Docker',
    'SQL',
    'JavaScript',
    'Python',
    'R',
  ];

  return (
    <section id="about" className="pt-2 scroll-mt-24 space-y-8">

      <div className="flex flex-col-reverse md:flex-row md:items-start justify-between gap-12 lg:gap-16">
        <div className="space-y-6 max-w-xl">

          {/* Intro Heading & Summary */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Hi, I'm Justin! <br />
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            I'm a 5th year Data Science student in my last semester of study at the University of Victoria. Whether it's a class, hackathon, or personal project I'm always looking for the next opportunity to hone my skills alongside other like-minded individuals.
            <br/><br/>
            In my free time I love to play badminton, play Pokemon, and crochet!
            <br/><br/>
            Thanks for stopping by!
          </p>

          {/* Core Tech Stack Badges */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-md text-xs font-medium bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300/50 dark:border-slate-700/50 hover:border-sky-500/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-sm transition-all duration-200"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Profile Image */}
        {/* <div className="relative shrink-0 w-36 h-36 sm:w-48 sm:h-48">
          <img
            src="TODO"
            alt="Justin Siu"
            className="w-full h-full object-cover rounded-2xl shadow-lg ring-2 ring-slate-200 dark:ring-slate-800"
          />
        </div> */}
      </div>
    </section>
  );
};

// ==========================================
// 3. EXPERIENCE COMPONENT (Box-Free Timeline)
// ==========================================
const Experience = () => {
  const experiences = [
    {
        role: 'Software Developer',
        company: 'A Thinking Ape',
        period: 'May 2026 - Aug 2026',
        bullets: [
            'Automated price point conversions using Django and the Apple Connect API, synchronizing prices for 100 different countries at 900 unique price points.',
            'Improved designer authoring interfaces, implementing features with Django and React.',
            'Reduced end to end testing time by 35% by integrating test and lint commands with Docker and Python.'
        ],
        tags: ["Django", "React", "Python", "JavaScript", "Docker"],
    },
    {
        role: 'Software Developer',
        company: 'SAP',
        period: 'Jan 2025 — Dec 2025',
        bullets: [
            'Built an automated test failure detection system using Python and SQL, cutting detection and alert times by 50%.',
            'Reduced manual workload by 5 hours per week using the Gerrit and Jira REST APIs along with Docker, Python, and Java to automate the test failure notification process through a Jenkins CI/CD pipeline.',
            'Expanded automated test coverage using Pytest, Mockito, and JavaScript/Selenium to maintain regression tests across environments',
            'Monitored version deployments using Kubernetes, OpenLens, and Microsoft Azure pipelines.'
        ],
        tags: ["JavaScript", "Groovy", "Python", "Java", "SQL", "Docker", "Kubernetes"],
    },
    {
        role: 'Quality Assurance Analyst',
        company: 'ACD Systems',
        period: 'May 2023 — Dec 2023',
        bullets: [
            'Developed a Python web scraper to collect images for 1,000+ keywords, used the data to test an AI recognition model, and analyzed the results with a Python script to generate a comprehensive report.',
            'Executed over 500 tests on digital asset management and image post-processing software.',
            'Tested account creation, licensing, and server communications using Wireshark and Debug View.'
        ],
        tags: ['Python', 'CSS', 'JavaScript', 'HTML'],
    },
    {
        role: 'Quality Assurance Analyst',
        company: 'Big Think Technologies Inc.',
        period: 'May 2022 — Aug 2022',
        bullets: [
            'Engineered real-time telemetry dashboards processing streaming time-series data.',
            'Implemented optimized SQL queries reducing database response latency by 35%.',
            'Built dynamic user interface components with Tailwind CSS and React hooks.',
        ],
        tags: ['Python', 'Unity', 'C#'],
    },
  ];

  return (
    <section id="experience" className="scroll-mt-24 space-y-8">
      {/* Clean Section Header */}
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
        <i className="fa-solid fa-briefcase text-sky-500 text-2xl"></i>
        Experience
      </h2>

      {/* Minimalist Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-200 dark:border-slate-800 space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative group">
            {/* Node Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-700 ring-4 ring-slate-50 dark:ring-slate-950 group-hover:bg-sky-500 group-hover:ring-sky-500/20 transition-all duration-200"></div>

            {/* Role Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {exp.role}{' '}
                <span className="text-slate-500 dark:text-slate-400 font-normal">
                  @ {exp.company}
                </span>
              </h3>
              <time className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                {exp.period}
              </time>
            </div>

            {/* Bullet Points */}
            <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              {exp.bullets.map((bullet, bIdx) => (
                <li key={bIdx}>{bullet}</li>
              ))}
            </ul>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==========================================
// 4. PROJECTS COMPONENT
// ==========================================
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Front-End' },
    { id: 'ai', label: 'AI Tools' },
  ];

  const projectList = [
    {
      id: 1,
      category: 'fullstack',
      title: 'DevMetrics Dashboard',
      description: 'A real-time developer productivity analytics suite tracking PR metrics and automated build telemetry across GitHub repositories.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
      tags: ['React', 'Node.js', 'SQL'],
      demoUrl: '#',
      githubUrl: 'https://github.com',
    },
    {
      id: 2,
      category: 'ai',
      title: 'NeuralScribe Copilot',
      description: 'AI-powered Markdown editor featuring contextual suggestions, automated document summarization, and tone adjustments.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
      tags: ['Python', 'React', 'Docker'],
      demoUrl: '#',
      githubUrl: 'https://github.com',
    },
    {
      id: 3,
      category: 'frontend',
      title: 'Prism UI Design System',
      description: 'An accessible component design system engineered with dark/light mode tokens and customizable animation primitives.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600',
      tags: ['TypeScript', 'React', 'Tailwind'],
      demoUrl: '#',
      githubUrl: 'https://github.com',
    },
    {
      id: 4,
      category: 'fullstack',
      title: 'HyperRoute Microservice',
      description: 'High-throughput microservice router engineered with edge caching, dynamic rate-limiting, and realtime metric loggers.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600',
      tags: ['C++', 'Docker', 'R'],
      demoUrl: '#',
      githubUrl: 'https://github.com',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectList
    : projectList.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="scroll-mt-24 space-y-8">
      {/* Clean Section Header & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <i className="fa-solid fa-folder-open text-sky-500 text-2xl"></i>
          Featured Projects
        </h2>

        {/* Filter Buttons
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div> */}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden hover:border-sky-500/50 dark:hover:border-sky-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400/1e293b/white?text=Project+Preview';
                  }}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Action Links */}
              <div className="flex items-center space-x-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <a
                  href={project.demoUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  <i className="fa-brands fa-github"></i> Repository
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

// ==========================================
// 5. CONTACT & FOOTER COMPONENT
// ==========================================
const ContactFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 pt-12 pb-8">
      <div className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24 space-y-12">
        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <i className="fa-solid fa-paper-plane text-sky-500 text-2xl"></i>
            Get In Touch
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Whether you have a project in mind, want to discuss software engineering, or just want to connect, feel free to reach out.
          </p>

          {/* Social Links with Font Awesome Classes */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="mailto:alex@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-sm transition-all duration-200"
            >
              <i className="fa-solid fa-envelope"></i> alex@example.com
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-200"
            >
              <i className="fa-brands fa-github text-base"></i> GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-200"
            >
              <i className="fa-brands fa-linkedin text-base"></i> LinkedIn
            </a>
          </div>
        </section>

        {/* Footer Links & Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <a
            href="#about"
            className="inline-flex items-center gap-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Back to Top <i className="fa-solid fa-chevron-up text-xs"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// 6. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [theme, setTheme] = useState('dark');

  // Load Font Awesome CSS dynamically
  useEffect(() => {
    const linkId = 'font-awesome-cdn';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
      document.head.appendChild(link);
    }
  }, []);

  // Sync theme with document root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-sky-500 selection:text-white min-h-screen flex flex-col justify-between transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24 space-y-16 md:space-y-24 py-12 md:py-16 flex-grow w-full">
        <About />
        <Experience />
        <Projects />
      </main>

      <ContactFooter />
    </div>
  );
}