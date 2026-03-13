import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, Folder, ArrowBigLeft } from 'lucide-react'
import './App.css'

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

const timelineData = [
  { title: 'Full Stack Developer', company: 'Aderas', date: '2024 - Present', description: 'Building full-stack web applications. Emergency reporting system built with AWS Lambda, API Gateway, and S3. Proprietary AI tool for the Department of Finance Development on Azure webapp, integrated with Sharepoint and Salesforce.' },
  { title: 'Software Developer Intern', company: 'VAE Inc.', date: 'June 2024 - May 2025', description: '- Contributed to the Agile software development process on a full-stack development team to develop a network device discovery and reporting tool submitted for DISA APL testing and deployed at several sites in the Department of Defense\n- Enforced C#/.NET code analyzers by fixing violations in existing code base to ensure compliance to cybersecurity and regulatory rules\n- Mapped enforced Microsoft Code Analysis security rules to GitLab SAST rules and the OWASP Top 10 Web Application Security Risks' },
  { title: 'Researcher', company: 'University of Virginia', date: 'January 2025 - Present', description: '- Researching at the UVA Collaborative Robotics Lab to help publish first-author paper at the HRI conference (Multi-Agentic Systems in HRI workshop)\n- Presented to a group of researchers on mitigating labor-intensive reinforcement learning in robotics with the PREDILECT framework, combining state-action pairs with human preferences'},
  { title: 'Instructor', company: 'University of Virginia', date: 'Auguest 2024 - December 2024', description: '- Led a student instructor class CS 1501: Hacktivism through lectures, coding labs and office hours on social and technical analysis of hacking events related to activism. Held additional review sessions on networking basics including subnetting, special IP address usage, nmap commands\n- Exercised ethical hacking basics: port scanning, SQL Injection, bash scripting, packet sniffing with Wireshark, Metasploit attacks on Virginia Cyber Range Kali Linux (Cyber Basics and Metasploitable 3)' },
  
]

function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const activeProj = projects.find((p) => p.id === activeProject)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
      <div className="sidebar"></div>
      <div className="main-layout">
      <div className="right-content">
        <div className="title-row">
          <h1 className="title">breenice lee</h1>
          <span className="bubble">software engineer</span>
        </div>
        <div className="grid-layout">
        {/* Row 1: Banner | Currently */}
        <div className="cell banner">
          <p className="banner-text">
            an engineer who loves to build and found passion in coding in the process.
            into: gamification, security, and robotics.<br />
            putting ideas into reality.<br />
            doing my best to improve my work and the world.
          </p>
        </div>
        <div className="cell currently">
          <h2 className="cell-title"><span className="blink-dot"></span>currently...</h2>
          <div className="currently-inner">Full Stack Developer at Aderas</div>
        </div>

        {/* Row 2: Experience | Skills */}
        <div className="cell experience">
          <h2 className="cell-title">experience</h2>
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
        <div className="cell skills">
          <h2 className="cell-title">extras</h2>
          <p> AWS Solutions Certified Solutions Architect (2025)</p>
        </div>

        {/* Row 3: Projects | Connect */}
        <div className="cell projects">
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
        <div className="cell connect">
          <h2 className="cell-title">connect with me</h2>
          <ul className="link-list">
            <li className="link-item">
              <Github className="link-icon" />
              <a href="https://github.com/breenice" target="_blank" rel="noopener noreferrer">Github</a>
            </li>
            <li className="link-item">
              <Linkedin className="link-icon" />
              <a href="https://www.linkedin.com/in/breenice-lee-838664261/" target="_blank" rel="noopener noreferrer">Linkedin</a>
            </li>
            <li className="link-item">
              <Mail className="link-icon" />
              <a href="" target="_blank" rel="noopener noreferrer">breenicelee@gmail.com</a>
            </li>
          </ul>
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
