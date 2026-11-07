import { Dossiers } from './components/Dossiers/Dossiers'
import { FieldNotes } from './components/FieldNotes/FieldNotes'
import { Footer } from './components/Footer/Footer'
import { Hero } from './components/Hero/Hero'
import { Projects } from './components/Projects/Projects'
import { RadioNav } from './components/RadioNav/RadioNav'
import { Record } from './components/Record/Record'
import { Sky } from './components/Sky/Sky'
import { Terminal } from './components/Terminal/Terminal'
import { WorkSamples } from './components/WorkSamples/WorkSamples'

import styles from './App.module.css'

/**
 * Section order is the argument: what he does, proof you can poke at,
 * what he thinks, what he made, and only then the dates and titles.
 */
export default function App() {
  return (
    <>
      <Sky />
      <RadioNav />
      <main className={styles.page}>
        <Hero />
        <Dossiers />
        <Terminal />
        <FieldNotes />
        <WorkSamples />
        <Projects />
        <Record />
        <Footer />
      </main>
    </>
  )
}
