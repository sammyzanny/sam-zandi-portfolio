import { PROJECTS } from '../../data/record'
import { SectionHead } from '../SectionHead/SectionHead'

import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projects">
      <SectionHead
        eyebrow="SID 104.5"
        title="Projects"
        note="One I founded and run, two I built earlier. Each has a backend, a frontend and something live."
      />

      <div className={styles.grid}>
        {PROJECTS.map((project) => (
          <article className={styles.card} key={project.name}>
            <span className={styles.context}>{project.context}</span>
            <h3 className={styles.name}>{project.name}</h3>
            <p className={styles.blurb}>{project.blurb}</p>
            <ul className={styles.points}>
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className={styles.links}>
              {project.links.map((link) => {
                const external = link.href.startsWith('http')
                return (
                  <a
                    key={link.href}
                    className={styles.link}
                    href={link.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
