import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, FileDown, GraduationCap, Briefcase, BadgeCheck, Microscope, Folder, ExternalLink } from 'lucide-react'
import './App.css'

/* projects data — re-enable with projects section
const projects: {
  id: string
  label: string
  image: React.ReactNode
  description: string
  link?: { url: string; label: string }
  details?: string[]
}[] = [
  {
    id: 'project-1',
    label: 'Human-Robot Interaction System',
    image: <Folder size={48} color="#8c92f9" />,
    description: 'Multi-model, memory and personality enabled human-robot interaction system for the NAO robot with VLM-powered interactions and camera/speech adaptive responses.',
    link: { url: 'https://github.com/breenice', label: 'Repository' },
    details: [
      'Built at UVA Collaborative Robotics Lab using NaoQi API.',
      'Predefined gestures, action functions, and PREDILECT framework integration.',
    ],
  },
  {
    id: 'project-2',
    label: 'Games',
    image: <Folder size={48} color="#8c92f9" />,
    description: 'Personal game projects and experiments.',
    link: { url: 'https://beechuus.itch.io/', label: 'See games on itch.io' },
    details: ['Add specific game titles and tech stack here.'],
  },
  {
    id: 'project-3',
    label: 'PomoWorld',
    image: <Folder size={48} color="#8c92f9" />,
    description: 'A gamified pomodoro / productivity app.',
    details: [
      'Add tech stack (e.g. React, Node).',
      'Add link to live app or repo below.',
    ],
  },
]
*/

const timelineData = [
  {
    title: 'Software Developer',
    company: 'Aderas',
    date: 'June 2025 – Present',
    description: [
      'Developing AI-powered data analysis platforms on AWS and Azure for government clients, integrating Salesforce and SharePoint pipelines to improve data interoperability.',
      'Containerized Azure Functions using Docker and applied DevSecOps scanning practices to harden images.',
      'Implemented real-time streaming within AI workflows to reduce latency.',
    ],
  },
  {
    title: 'Part-time Associate Software Engineer',
    company: 'VAE, Inc.',
    date: 'June 2024 – May 2025',
    // bullet points, new lines should be there
    description: [
      'Built a full-stack network device discovery/reporting tool for DoD deployment using Angular/TypeScript and C#/.NET.',
      'Containerized services with Docker and enforced DISA APL compliance through .NET code analyzers.',
      'Built Cypress regression tests and simulated 400+ device networks in PostgreSQL for vulnerability analysis.',
    ],
    },
]
const skillTags = [
  { name: 'Python', category: 'lang' },
  { name: 'C/C++', category: 'lang' },
  { name: 'HTML/CSS', category: 'lang' },
  { name: 'JavaScript', category: 'lang' },
  { name: 'ROS', category: 'library' },
  { name: 'React', category: 'library' },
  { name: 'Angular', category: 'library' },
  { name: '.NET', category: 'library' },
  { name: 'PyTorch', category: 'library' },
  { name: 'TensorFlow', category: 'library' },
  { name: 'OpenCV', category: 'library' },
  { name: 'AWS', category: 'cloud' },
  { name: 'Azure', category: 'cloud' },
  { name: 'Docker', category: 'cloud' },
]

const navItems = [
  { id: 'about',      label: 'about' },
  { id: 'education',  label: 'education' },
  { id: 'experience', label: 'experience' },
  { id: 'skills',     label: 'skills' },
  { id: 'research',   label: 'research' },
  { id: 'projects',   label: 'projects' },
]

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [carouselIdx, setCarouselIdx] = useState(0)
  const carouselVideos = [
    { src: '/images/test_run.mp4', label: 'Test Run' },
    { src: '/images/gap_follow.mp4', label: 'Gap Follow' },
    { src: '/images/competition.mp4', label: 'Competition' },
  ]
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.35 }
    )
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    canvasRef.current!.width = window.innerWidth
    canvasRef.current!.height = window.innerHeight

    const mouse = { x: 0, y: 0 }
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    const gravity = 0.15
    const balls = Array.from({ length: 30 }, () => ({
      x: 180 + Math.random() * (canvasRef.current!.width - 180),
      y: Math.random() * canvasRef.current!.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      r: 40 + Math.random() * 12,
    }))

    const ctx = canvasRef.current!.getContext('2d')!
    const width = canvasRef.current!.width
    const height = canvasRef.current!.height

    function loop() {
      ctx.clearRect(0, 0, width, height)

      for (const b of balls) {
        b.vy += gravity
        const dx = mouse.x - b.x
        const dy = mouse.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const cursorForce = 200
        if (dist < cursorForce && dist > 0) {
          const force = (cursorForce - dist) / cursorForce
          const nx = dx / dist
          const ny = dy / dist
          b.vx += force * nx
          b.vy += force * ny
        }
        b.x += b.vx
        b.y += b.vy

        const leftWall = 180
        if (b.x - b.r < leftWall) { b.vx *= -1; b.x = leftWall + b.r }
        if (b.x + b.r > width) { b.vx *= -1; b.x = width - b.r }
        if (b.y - b.r < 0 || b.y + b.r > height) {
          b.vy *= -0.8
          b.y = height - b.r
        }

        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const a = balls[i]
            const b = balls[j]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const minDist = a.r + b.r

            if (dist < minDist && dist > 0) {
              const nx = dx / dist
              const ny = dy / dist
              const overlap = (minDist - dist) / 2
              a.x -= overlap * nx
              a.y -= overlap * ny
              b.x += overlap * nx
              b.y += overlap * ny
              const dvn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny
              if (dvn > 0) {
                a.vx -= dvn * nx
                a.vy -= dvn * ny
                b.vx += dvn * nx
                b.vy += dvn * ny
              }
            }
          }
        }

        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(249, 210, 243, 0.4)'
        ctx.fill()
      }
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="page">
      <div className="sidebar">
        <nav className="sidebar-nav" aria-label="Page sections">
          <span className="sidebar-name">bl</span>
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`sidebar-link${activeSection === id ? ' active' : ''}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="sidebar-connect">
          <span className="sidebar-connect-title">connect</span>
          <a href="https://github.com/breenice" target="_blank" rel="noopener noreferrer" className="sidebar-connect-link">
            <Github size={16} /><span>Github</span>
          </a>
          <a href="https://www.linkedin.com/in/breenice-lee-838664261/" target="_blank" rel="noopener noreferrer" className="sidebar-connect-link">
            <Linkedin size={16} /><span>LinkedIn</span>
          </a>
          <a href="mailto:breenicelee@gmail.com" className="sidebar-connect-link">
            <Mail size={16} /><span>Email</span>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download className="sidebar-connect-link">
            <FileDown size={16} /><span>Resume</span>
          </a>
        </div>
      </div>
      <div className="main-layout">
      <div className="right-content">
        <div className="title-row">
          <h1 className="title">breenice lee</h1>
          <div className="currently-badge">
            <span className="blink-dot"></span>
            <span className="currently-badge-label">currently...</span>
            <span className="currently-badge-role">Software Developer at Aderas</span>
          </div>
        </div>
        <div className="grid-layout">
        {/* Row 1: Banner */}
        <div
          id="about"
          className="cell banner"
        >
          <p className="banner-text">
            Currently building AI systems for government and research robotics
          </p>
        </div>

        {/* Education — full width */}
        <div id="education" className="cell education">
          <h2 className="cell-title"><GraduationCap size={18} className="cell-title-icon" />education</h2>
          <div className="edu-row">
            <span className="edu-school">University of Virginia</span>
            <span className="edu-degree">B.S. Computer Science — May 2025</span>
            <span className="edu-gpa">In-major GPA: 3.94</span>
            <span className="edu-courses">Relevant coursework: autonomous vehicles, machine learning, software development, cybersecurity, computer systems, networking, data structures &amp; algorithms</span>
          </div>
          <div className="edu-teaching">
            <h3 className="extras-heading">teaching</h3>
            <p className="extras-sub"><strong>Instructor — CS 1501: Intro to Hacktivism</strong> &nbsp;·&nbsp; Fall 2024</p>
            <p className="extras-sub">Delivered lectures, labs, and office hours on hacking ethics and networking fundamentals (subnetting, nmap, SQL injection, Wireshark, Metasploit on Virginia Cyber Range).</p>
          </div>
        </div>

        {/* Row 2: Experience | Skills */}
        <div id="experience" className="cell experience">
          <h2 className="cell-title"><Briefcase size={18} className="cell-title-icon" />experience</h2>
          <div className="timeline">
            {timelineData.map((entry, i) => (
              <div key={i} className="timeline-entry">
                <h3>{entry.title} — {entry.company}</h3>
                <div className="timeline-date">{entry.date}</div>
                <ul className="timeline-description">
                  {entry.description.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div id="skills" className="cell skills">
          <h2 className="cell-title"><BadgeCheck size={18} className="cell-title-icon" />skills &amp; credentials</h2>
          <div className="credentials-row">
            <div className="extras-section">
              <h3 className="extras-heading">certifications</h3>
              <p className="extras-sub">AWS Certified Solutions Architect</p>
              <p className="extras-sub">Azure Administrator Associate</p>
            </div>
            <div className="extras-section">
              <h3 className="extras-heading">clearance</h3>
              <p className="extras-sub">Interim Secret Clearance</p>
            </div>
          </div>
          <div className="extras-section">
          <h3 className="extras-heading">
            skills
            <span className="skill-legend skill-legend--library">libraries</span>
            <span className="skill-legend skill-legend--cloud">cloud</span>
          </h3>
          <div className="skill-tags">
            {skillTags.map((s) => (
              <span key={s.name} className={`skill-tag skill-tag--${s.category}`}>
                {s.name}
              </span>
            ))}
          </div>
          </div>
        </div>

        {/* Research */}
        <div id="research" className="cell research">
          <h2 className="cell-title"><Microscope size={18} className="cell-title-icon" />research</h2>
          <div className="extras-section">
            <h3 className="extras-heading">UVA Collaborative Robotics Lab &nbsp;·&nbsp; February 2025 - Present</h3>
            <div className="research-projects">
              <div className="research-project">
                <h4 className="research-project-title">Computer Vision / Robot Manipulation</h4>
                <p className="extras-sub">Built a Grounded-SAM perception pipeline for segmenting 3D point clouds from an Intel RealSense camera, enabling object-aware task and motion planning for a Franka Panda manipulator in PyBullet.</p>
              </div>
              <div className="research-project">
                <h4 className="research-project-title">Human-Robot Interaction</h4>
                <p className="extras-sub">Built a multimodal HRI system for NAO combining speech recognition, visual/auditory cues, and adaptive physical responses for healthcare applications.</p>
              </div>
            </div>
          </div>
          <div className="research-divider" />
          <div className="extras-section">
            <h3 className="extras-heading">publications</h3>
            <div className="pub-stack">
              <div className="pub-card">
                <img src="/images/naos.png" alt="NAO robots" className="pub-img" />
                <p className="pub-text">
                  <em>A Multimodal Framework for Human-Multi-Agent Interaction</em><br />
                  <span className="pub-venue">first author · ACM/IEEE HRI 2026 Workshop&nbsp;<a href="https://arxiv.org/abs/2603.23271" target="_blank" rel="noopener noreferrer"><ExternalLink size={12} style={{ verticalAlign: 'middle', display: 'inline' }} /></a></span>
                </p>
              </div>
              <div className="pub-card">
                <img src="/images/m2hri.png" alt="M2HRI system diagram" className="pub-img" />
                <p className="pub-text">
                  <em>M2HRI: An LLM-Driven Multimodal Multi-Agent Framework for Personalized HRI</em><br />
                  <span className="pub-venue">IEEE RO-MAN 2026&nbsp;<a href="https://project-m2hri.github.io/" target="_blank" rel="noopener noreferrer"><ExternalLink size={12} style={{ verticalAlign: 'middle', display: 'inline' }} /></a></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div id="projects" className="cell projects">
          <h2 className="cell-title"><Folder size={18} className="cell-title-icon" />projects</h2>
          <div className="project-stack">
            <div className="f1-layout">
              <div className="extras-section">
                <h3 className="extras-heading">F1 Tenth Autonomous Vehicle Racing &nbsp;·&nbsp; UVA</h3>
                <p className="extras-sub" style={{ marginBottom: '0.35rem' }}><strong>Programmer</strong> &nbsp;·&nbsp; Fall 2024</p>
                <ul className="extras-list">
                  <li>Developed autonomous navigation algorithms for F1Tenth racing under Prof. Madhur Behl, using LiDAR and NVIDIA Jetson within a Ubuntu ROS environment.</li>
                  <li>Implemented ROS Cartographer SLAM and AMCL for real-time localization, and a follow-the-gap algorithm with dynamic speed-steering control for high-speed obstacle avoidance and passing moving vehicles.</li>
                </ul>
              </div>
              <div className="carousel">
                <video
                  key={carouselVideos[carouselIdx].src}
                  className="carousel-video"
                  src={carouselVideos[carouselIdx].src}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="carousel-controls">
                  <button className="carousel-btn" onClick={() => setCarouselIdx((carouselIdx + 2) % 3)}>‹</button>
                  <span className="carousel-label">{carouselVideos[carouselIdx].label}</span>
                  <button className="carousel-btn" onClick={() => setCarouselIdx((carouselIdx + 1) % 3)}>›</button>
                </div>
              </div>
            </div>

            <div className="project-divider" />

            <div className="f1-layout">
              <div className="extras-section">
                <h3 className="extras-heading">Chuchu's Bakery</h3>
                <p className="extras-sub" style={{ marginBottom: '0.35rem' }}><strong>Game jam project programmer</strong> &nbsp;·&nbsp; August 2026</p>
                <ul className="extras-list">
                  <li>Built a timed bakery management game in Phaser. Implemented round progression, inventory crafting, a recipe book UI, smithing minigame, and boss encounters with original pixel art and sound design.</li>
                  <li>Led a three-person team through a game jam, coordinating an artist and musician, assigning tasks, tracking progress, and keeping communication organized while handling the game's programming and systems.</li>
                </ul>
                <p className="extras-sub" style={{ marginTop: '0.5rem' }}>
                  <a href="https://beechuus.itch.io/bread-sword" target="_blank" rel="noopener noreferrer" className="project-link">
                    Play on itch.io <ExternalLink size={12} style={{ verticalAlign: 'middle', display: 'inline' }} />
                  </a>
                </p>
              </div>
              <div className="project-media">
                <img src="/images/chuchu-bakery-gameplay.png" alt="Chuchu's Bakery gameplay" className="project-img" />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>

      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      />
    </div>
  )
}

export default App
