import type { Submission, PendingStudent, ExamConfig, SubmittedFile, FileExt } from '../types';

let _fid = 0;
const f = (base: string, ext: FileExt, sizeKb: number): SubmittedFile => ({
  id: `f${++_fid}`,
  name: `${base}.${ext}`,
  ext,
  sizeKb,
});

const now = Date.now();
const ago = (min: number) => new Date(now - min * 60_000);

export const examConfig: ExamConfig = {
  subject: 'Objektno-orijentisano programiranje',
  examName: 'Kolokvijum I',
  totalStudents: 25,
  startedAt: ago(47),
  durationMinutes: 90,
};

export const initialSubmissions: Submission[] = [
  {
    id: 's1', studentName: 'Marko Petrović', indexNumber: 'SI15/2022',
    email: 'mpetrovic1522si@raf.rs', submittedAt: ago(40),
    files: [f('zadatak1', 'java', 14.2), f('zadatak2', 'java', 9.8), f('zadatak3', 'java', 11.5)],
    isLate: false,
  },
  {
    id: 's2', studentName: 'Ana Nikolić', indexNumber: 'SI27/2022',
    email: 'anikolic2722si@raf.rs', submittedAt: ago(37),
    files: [f('zadatak1', 'java', 12.1), f('zadatak2', 'java', 8.3), f('output', 'txt', 1.8)],
    isLate: false,
  },
  {
    id: 's3', studentName: 'Stefan Jovanović', indexNumber: 'RN31/2023',
    email: 'sjovanovic3123rn@raf.rs', submittedAt: ago(33),
    files: [f('zadatak1', 'java', 16.7), f('zadatak2', 'java', 7.4), f('zadatak3', 'java', 13.2), f('README', 'txt', 0.9)],
    isLate: false,
  },
  {
    id: 's4', studentName: 'Milica Đorđević', indexNumber: 'SI44/2022',
    email: 'mdjordjevic4422si@raf.rs', submittedAt: ago(28),
    files: [f('zadatak1', 'java', 10.3), f('zadatak2', 'java', 11.9)],
    isLate: false,
  },
  {
    id: 's5', studentName: 'Nikola Stojanović', indexNumber: 'RN52/2023',
    email: 'nstojanovic5223rn@raf.rs', submittedAt: ago(23),
    files: [f('zadatak1', 'java', 18.4), f('zadatak2', 'java', 12.6), f('zadatak3', 'java', 9.1)],
    isLate: false,
  },
  {
    id: 's6', studentName: 'Jelena Popović', indexNumber: 'SI63/2022',
    email: 'jpopovic6322si@raf.rs', submittedAt: ago(17),
    files: [f('zadatak1', 'java', 13.7), f('zadatak2', 'java', 8.9), f('output', 'txt', 2.3)],
    isLate: false,
  },
  {
    id: 's7', studentName: 'Milan Stanković', indexNumber: 'RN71/2023',
    email: 'mstankovic7123rn@raf.rs', submittedAt: ago(12),
    files: [f('zadatak1', 'java', 15.0), f('zadatak2', 'java', 10.2), f('zadatak3', 'java', 7.8), f('test_output', 'txt', 1.5)],
    isLate: false,
  },
  {
    id: 's8', studentName: 'Tamara Ilić', indexNumber: 'SI82/2022',
    email: 'tilic8222si@raf.rs', submittedAt: ago(5),
    files: [f('zadatak1', 'java', 11.8), f('zadatak2', 'java', 14.3)],
    isLate: false,
  },
];

export const pendingStudents: PendingStudent[] = [
  {
    id: 's9', studentName: 'Aleksandar Lazović', indexNumber: 'RN95/2022',
    email: 'alazovic9522rn@raf.rs',
    files: [f('zadatak1', 'java', 13.5), f('zadatak2', 'java', 9.2), f('zadatak3', 'java', 11.0)],
    isLate: false,
  },
  {
    id: 's10', studentName: 'Ivana Marinković', indexNumber: 'SI103/2023',
    email: 'imarinkovic10323si@raf.rs',
    files: [f('zadatak1', 'java', 8.7), f('zadatak2', 'java', 12.4), f('output', 'txt', 2.0)],
    isLate: false,
  },
  {
    id: 's11', studentName: 'Nemanja Kostić', indexNumber: 'RN112/2022',
    email: 'nkostic11222rn@raf.rs',
    files: [f('zadatak1', 'java', 17.3), f('zadatak2', 'java', 6.9), f('zadatak3', 'java', 14.1)],
    isLate: false,
  },
  {
    id: 's12', studentName: 'Sara Živković', indexNumber: 'SI124/2023',
    email: 'szivkovic12423si@raf.rs',
    files: [f('zadatak1', 'java', 10.8), f('zadatak2', 'java', 9.5)],
    isLate: false,
  },
  {
    id: 's13', studentName: 'Luka Đurić', indexNumber: 'RN135/2022',
    email: 'ldjuric13522rn@raf.rs',
    files: [f('zadatak1', 'java', 15.6), f('zadatak2', 'java', 11.3), f('zadatak3', 'java', 8.4), f('README', 'txt', 1.1)],
    isLate: false,
  },
  {
    id: 's14', studentName: 'Jovana Vasić', indexNumber: 'SI147/2023',
    email: 'jvasic14723si@raf.rs',
    files: [f('zadatak1', 'java', 12.9), f('zadatak2', 'java', 7.6), f('output', 'txt', 3.2)],
    isLate: false,
  },
  {
    id: 's15', studentName: 'Filip Simić', indexNumber: 'RN158/2022',
    email: 'fsimic15822rn@raf.rs',
    files: [f('zadatak1', 'java', 19.1), f('zadatak2', 'java', 13.7)],
    isLate: false,
  },
  {
    id: 's16', studentName: 'Maja Pavlović', indexNumber: 'SI169/2023',
    email: 'mpavlovic16923si@raf.rs',
    files: [f('zadatak1', 'java', 11.4), f('zadatak2', 'java', 8.2), f('zadatak3', 'java', 10.7)],
    isLate: false,
  },
  {
    id: 's17', studentName: 'Bojan Đukić', indexNumber: 'RN180/2022',
    email: 'bdjukic18022rn@raf.rs',
    files: [f('zadatak1', 'java', 14.8), f('zadatak2', 'java', 10.5), f('test_cases', 'txt', 4.1)],
    isLate: false,
  },
  {
    id: 's18', studentName: 'Katarina Milošević', indexNumber: 'SI192/2023',
    email: 'kmilosevic19223si@raf.rs',
    files: [f('zadatak1', 'java', 9.3), f('zadatak2', 'java', 13.8), f('zadatak3', 'java', 12.1)],
    isLate: false,
  },
  {
    id: 's19', studentName: 'Dragan Vuković', indexNumber: 'RN203/2022',
    email: 'dvukovic20322rn@raf.rs',
    files: [f('zadatak1', 'java', 16.2), f('zadatak2', 'java', 9.0)],
    isLate: false,
  },
  {
    id: 's20', studentName: 'Nina Todorović', indexNumber: 'SI214/2023',
    email: 'ntodorovic21423si@raf.rs',
    files: [f('zadatak1', 'java', 13.3), f('zadatak2', 'java', 7.9), f('zadatak3', 'java', 11.6), f('output', 'txt', 1.3)],
    isLate: false,
  },
  {
    id: 's21', studentName: 'Igor Marković', indexNumber: 'RN225/2022',
    email: 'imarkovic22522rn@raf.rs',
    files: [f('zadatak1', 'java', 20.4), f('zadatak2', 'java', 15.1)],
    isLate: false,
  },
  {
    id: 's22', studentName: 'Aleksandra Savić', indexNumber: 'SI236/2023',
    email: 'asavic23623si@raf.rs',
    files: [f('zadatak1', 'java', 12.7), f('zadatak2', 'java', 6.4), f('zadatak3', 'java', 9.8)],
    isLate: false,
  },
  {
    id: 's23', studentName: 'Vladimir Lukić', indexNumber: 'RN247/2022',
    email: 'vlukic24722rn@raf.rs',
    files: [f('zadatak1', 'java', 8.9), f('zadatak2', 'java', 11.7)],
    isLate: false,
  },
  {
    id: 's24', studentName: 'Jovana Đorđević', indexNumber: 'SI258/2023',
    email: 'jdjordjevic25823si@raf.rs',
    files: [f('zadatak1', 'java', 14.5), f('zadatak2', 'java', 10.9), f('zadatak3', 'java', 8.3), f('output', 'txt', 2.7)],
    isLate: true,
  },
  {
    id: 's25', studentName: 'Petar Stanojević', indexNumber: 'RN269/2022',
    email: 'pstanojevic26922rn@raf.rs',
    files: [f('zadatak1', 'java', 7.2), f('zadatak2', 'java', 5.8)],
    isLate: true,
  },
];
