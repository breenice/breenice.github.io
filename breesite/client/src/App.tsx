import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, FileDown, GraduationCap, Briefcase, BadgeCheck, Microscope } from 'lucide-react'
// import { Folder } from 'lucide-react' // re-enable with projects section
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
    description: 'Developing AI-powered data analysis platforms on AWS and Azure for government clients, integrating Salesforce and SharePoint pipelines to improve data interoperability. Containerized Azure Functions using Docker and applied DevSecOps scanning practices to harden images; implemented real-time streaming within AI workflows to reduce latency.',
  },
  {
    title: 'Part-time Associate Software Engineer',
    company: 'VAE, Inc.',
    date: 'June 2024 – May 2025',
    description: 'Built a full-stack network device discovery and reporting tool for DoD deployment using Angular/TypeScript and C#/.NET; integrated REST APIs and containerized services with Docker; enforced DISA APL compliance via .NET code analyzers. Mapped Microsoft Code Analysis rules to GitLab SAST and OWASP Top 10; supported CI/CD regression testing with Cypress and simulated networks of 400+ devices in PostgreSQL for multi-cycle vulnerability analysis.',
  },
]

const navItems = [
  { id: 'about',      label: 'about' },
  { id: 'education',  label: 'education' },
  { id: 'experience', label: 'experience' },
  { id: 'skills',     label: 'skills' },
  { id: 'research',   label: 'research' },
]

function App() {
  const [activeSection, setActiveSection] = useState('about')
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
          <span className="bubble">software engineer</span>
        </div>
        <div className="grid-layout">
        {/* Row 1: Banner | Currently */}
        <div id="about" className="cell banner">
          <p className="banner-text">
            into: gamification, security, and robotics.<br />
            doing my best to improve my work and the world.
          </p>
        </div>
        <div className="cell currently">
          <h2 className="cell-title"><span className="blink-dot"></span>currently...</h2>
          <div className="currently-inner">Software Developer at Aderas</div>
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
                <p>{entry.description}</p>
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
            <h3 className="extras-heading">skills</h3>
            <div className="skill-tags">
              {['Python', 'JavaScript', 'TypeScript', 'C#', 'Java', 'C/C++', 'R', 'SQL', 'MATLAB', 'Assembly', 'React', 'Angular', 'Django', '.NET', 'ROS', 'PyTorch', 'TensorFlow', 'OpenCV', 'Docker', 'AWS', 'Azure', 'PostgreSQL', 'SLAM', 'HTML/CSS'].map((s) => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Research */}
        <div id="research" className="cell research">
          <h2 className="cell-title"><Microscope size={18} className="cell-title-icon" />research</h2>
          <div className="extras-section">
            <h3 className="extras-heading">UVA Collaborative Robotics Lab &nbsp;·&nbsp; Feburary 2025 - Present </h3>
            <p className="extras-sub">Developed an object detection pipeline using Grounded-SAM for 3D point cloud segmentation on an Intel RealSense camera (OpenCV, NumPy, PyTorch) to improve task and motion planning for a Franka Panda manipulator simulated in PyBullet. Built a multi-modal HRI system for the NAO robot integrating real-time speech recognition (OpenAI Whisper API) and physical responses to visual/auditory cues for hospital applications.</p>
          </div>
          <div className="research-divider" />
          <div className="extras-section">
            <h3 className="extras-heading">publications</h3>
            <p className="extras-sub">
              <a href="https://arxiv.org/abs/2604.11975" target="_blank" rel="noopener noreferrer"><em>A Multimodal Framework for Human-Multi-Agent Interaction</em></a> — first author, ACM/IEEE HRI 2026 Workshop
            </p>
            <p className="extras-sub">
              <a href="https://project-m2hri.github.io/" target="_blank" rel="noopener noreferrer"><em>M2HRI: An LLM-Driven Multimodal Multi-Agent Framework for Personalized HRI</em></a> — under review, IEEE RO-MAN 2026
            </p>
          </div>
        </div>

        {/* Projects — commented out for now
        <div id="projects" className="cell projects">
          <h2 className="cell-title">projects</h2>
          {activeProj
            ? <div className="project-content">
                <button className="back-btn" onClick={() => setActiveProject(null)}>
                  <ArrowBigLeft size={34} />
                </button>
                <h2>{activeProj.label}</h2>
                <p>{activeProj.description}</p>
                {activeProj.details && activeProj.details.length > 0 && (
                  <ul>
                    {activeProj.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {activeProj.link && (
                  <p>
                    <a href={activeProj.link.url} target="_blank" rel="noopener noreferrer">{activeProj.link.label}</a>
                  </p>
                )}
              </div>
            : <div className="icon-grid">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    className="icon-cell"
                    onClick={() => setActiveProject(proj.id)}
                  >
                    {proj.image && <span className="icon-img">{proj.image}</span>}
                    <span className="icon-label">{proj.label}</span>
                  </button>
                ))}
              </div>
          }
        </div>
        */}
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
