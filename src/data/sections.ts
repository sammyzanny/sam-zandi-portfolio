/**
 * Nav stations.
 *
 * The nav is styled as a car radio, so each section carries a call sign
 * and a frequency. The frequencies are decoration; the `id` is the real
 * anchor and must match the `id` on the corresponding <section>.
 */
export interface Station {
  id: string
  callSign: string
  frequency: string
  label: string
}

export const STATIONS: Station[] = [
  { id: 'dossiers', callSign: 'WRK', frequency: '88.1', label: 'What I do' },
  { id: 'terminal', callSign: 'TRM', frequency: '92.5', label: 'Terminal' },
  { id: 'notes', callSign: 'NTS', frequency: '96.3', label: 'Field notes' },
  { id: 'samples', callSign: 'EVD', frequency: '100.7', label: 'Work samples' },
  { id: 'projects', callSign: 'SID', frequency: '104.5', label: 'Side projects' },
  { id: 'record', callSign: 'REC', frequency: '108.1', label: 'The record' },
]
