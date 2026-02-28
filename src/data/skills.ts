import type { Skill } from '../types';

export const skills: Skill[] = [
  // AI/ML Skills
  { name: 'Python', level: 95, category: 'AI/ML' },
  { name: 'TensorFlow', level: 90, category: 'AI/ML' },
  { name: 'PyTorch', level: 88, category: 'AI/ML' },
  { name: 'Machine Learning', level: 92, category: 'AI/ML' },
  { name: 'Deep Learning', level: 88, category: 'AI/ML' },
  { name: 'NLP', level: 82, category: 'AI/ML' },
  { name: 'Computer Vision', level: 80, category: 'AI/ML' },
  
  // Backend Skills
  { name: 'FastAPI', level: 92, category: 'Backend' },
  { name: 'Django', level: 90, category: 'Backend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Express', level: 85, category: 'Backend' },
  { name: 'PostgreSQL', level: 88, category: 'Backend' },
  { name: 'MongoDB', level: 86, category: 'Backend' },
  { name: 'Redis', level: 80, category: 'Backend' },
  { name: 'Docker', level: 82, category: 'Backend' },
  { name: 'AWS', level: 78, category: 'Backend' },
  
  // Frontend Skills
  { name: 'React', level: 92, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Next.js', level: 85, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 92, category: 'Frontend' },
  { name: 'Framer Motion', level: 85, category: 'Frontend' },
  { name: 'React Native', level: 82, category: 'Frontend' },
  
  // Tools & Others
  { name: 'Git', level: 92, category: 'Tools' },
  { name: 'Linux', level: 85, category: 'Tools' },
  { name: 'CI/CD', level: 80, category: 'Tools' },
  { name: 'Agile', level: 85, category: 'Tools' },
];

export const skillCategories = ['AI/ML', 'Backend', 'Frontend', 'Tools'];
