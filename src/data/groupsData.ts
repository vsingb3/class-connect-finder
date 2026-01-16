import { SchoolGroup } from '@/types/group';

// Sample student names for member previews
const studentNames = [
  'Abigail Amatucci', 'Alec Provo', 'Avia Ferrande', 'Breanne Bellao',
  'Billi Solis', 'Clara Mitchell', 'Diana Reyes', 'Emily Carter',
  'Frank Johnson', 'Grace Lee', 'Henry Wilson', 'Isabel Martinez',
  'James Brown', 'Katie Davis', 'Leo Thompson', 'Maya Anderson'
];

const getRandomMembers = (count: number) => {
  const shuffled = [...studentNames].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, 4));
};

export const schoolGroups: SchoolGroup[] = [
  // My Groups (first 6)
  { id: 'morning-studio-a', name: '25-26 Morning Studio A', type: 'studio', studentCount: 28, members: getRandomMembers(4), isMine: true },
  { id: 'anchor-group-1', name: 'Anchor Group 1', type: 'anchor', studentCount: 12, members: getRandomMembers(4), isMine: true },
  { id: 'flex-math', name: 'Flex Math Support', type: 'flex', studentCount: 18, members: getRandomMembers(4), isMine: true },
  { id: 'art-studio', name: 'Art Studio', type: 'studio', studentCount: 15, members: getRandomMembers(4), isMine: true },
  { id: 'my-anchor-2', name: 'Anchor Group 2', type: 'anchor', studentCount: 10, members: getRandomMembers(4), isMine: true },
  { id: 'special-projects', name: 'Special Projects', type: 'other', studentCount: 8, members: getRandomMembers(4), isMine: true },

  // All Groups (50+ total)
  { id: 'evening-studio', name: '25-26 Evening Studio', type: 'other', studentCount: 302, members: getRandomMembers(4) },
  { id: 'art-studio-main', name: 'Art Studio', type: 'flex', studentCount: 15, members: getRandomMembers(4) },
  { id: 'music-studio', name: 'Music Studio', type: 'studio', studentCount: 22, members: getRandomMembers(4) },
  { id: 'science-lab', name: 'Science Lab', type: 'studio', studentCount: 25, members: getRandomMembers(4) },
  { id: 'coding-club', name: 'Coding Club', type: 'flex', studentCount: 18, members: getRandomMembers(4) },
  { id: 'drama-studio', name: 'Drama Studio', type: 'studio', studentCount: 20, members: getRandomMembers(4) },
  { id: 'debate-team', name: 'Debate Team', type: 'anchor', studentCount: 14, members: getRandomMembers(4) },
  { id: 'math-olympiad', name: 'Math Olympiad', type: 'anchor', studentCount: 16, members: getRandomMembers(4) },
  { id: 'reading-circle', name: 'Reading Circle', type: 'flex', studentCount: 12, members: getRandomMembers(4) },
  { id: 'chess-club', name: 'Chess Club', type: 'other', studentCount: 10, members: getRandomMembers(4) },
  { id: 'photography', name: 'Photography Club', type: 'flex', studentCount: 15, members: getRandomMembers(4) },
  { id: 'robotics', name: 'Robotics Team', type: 'studio', studentCount: 20, members: getRandomMembers(4) },
  { id: 'environmental', name: 'Environmental Club', type: 'other', studentCount: 18, members: getRandomMembers(4) },
  { id: 'student-council', name: 'Student Council', type: 'anchor', studentCount: 12, members: getRandomMembers(4) },
  { id: 'yearbook', name: 'Yearbook Committee', type: 'other', studentCount: 8, members: getRandomMembers(4) },
  { id: 'spanish-club', name: 'Spanish Club', type: 'flex', studentCount: 22, members: getRandomMembers(4) },
  { id: 'french-club', name: 'French Club', type: 'flex', studentCount: 18, members: getRandomMembers(4) },
  { id: 'film-studio', name: 'Film Studio', type: 'studio', studentCount: 14, members: getRandomMembers(4) },
  { id: 'creative-writing', name: 'Creative Writing', type: 'flex', studentCount: 16, members: getRandomMembers(4) },
  { id: 'journalism', name: 'Journalism Club', type: 'anchor', studentCount: 10, members: getRandomMembers(4) },
  { id: 'history-buffs', name: 'History Buffs', type: 'other', studentCount: 12, members: getRandomMembers(4) },
  { id: 'garden-club', name: 'Garden Club', type: 'flex', studentCount: 8, members: getRandomMembers(4) },
  { id: 'cooking-club', name: 'Cooking Club', type: 'other', studentCount: 15, members: getRandomMembers(4) },
  { id: 'band', name: 'School Band', type: 'studio', studentCount: 35, members: getRandomMembers(4) },
  { id: 'choir', name: 'School Choir', type: 'studio', studentCount: 40, members: getRandomMembers(4) },
  { id: 'orchestra', name: 'Orchestra', type: 'studio', studentCount: 30, members: getRandomMembers(4) },
  { id: 'dance-studio', name: 'Dance Studio', type: 'studio', studentCount: 25, members: getRandomMembers(4) },
  { id: 'yoga-wellness', name: 'Yoga & Wellness', type: 'flex', studentCount: 20, members: getRandomMembers(4) },
  { id: 'peer-tutoring', name: 'Peer Tutoring', type: 'anchor', studentCount: 24, members: getRandomMembers(4) },
  { id: 'mentorship', name: 'Mentorship Program', type: 'anchor', studentCount: 18, members: getRandomMembers(4) },
  { id: 'tech-support', name: 'Tech Support', type: 'other', studentCount: 10, members: getRandomMembers(4) },
  { id: 'av-club', name: 'AV Club', type: 'other', studentCount: 8, members: getRandomMembers(4) },
  { id: 'animation-studio', name: 'Animation Studio', type: 'studio', studentCount: 16, members: getRandomMembers(4) },
  { id: 'game-design', name: 'Game Design', type: 'studio', studentCount: 18, members: getRandomMembers(4) },
  { id: 'morning-anchor', name: 'Morning Anchor', type: 'anchor', studentCount: 15, members: getRandomMembers(4) },
  { id: 'afternoon-anchor', name: 'Afternoon Anchor', type: 'anchor', studentCount: 14, members: getRandomMembers(4) },
  { id: 'evening-flex', name: 'Evening Flex', type: 'flex', studentCount: 20, members: getRandomMembers(4) },
  { id: 'weekend-studio', name: 'Weekend Studio', type: 'studio', studentCount: 12, members: getRandomMembers(4) },
  { id: 'science-olympiad', name: 'Science Olympiad', type: 'anchor', studentCount: 16, members: getRandomMembers(4) },
  { id: 'bio-lab', name: 'Biology Lab', type: 'studio', studentCount: 22, members: getRandomMembers(4) },
  { id: 'chemistry-lab', name: 'Chemistry Lab', type: 'studio', studentCount: 20, members: getRandomMembers(4) },
  { id: 'physics-club', name: 'Physics Club', type: 'flex', studentCount: 14, members: getRandomMembers(4) },
  { id: 'astronomy', name: 'Astronomy Club', type: 'other', studentCount: 10, members: getRandomMembers(4) },
  { id: 'model-un', name: 'Model UN', type: 'anchor', studentCount: 25, members: getRandomMembers(4) },
  { id: 'mock-trial', name: 'Mock Trial', type: 'anchor', studentCount: 18, members: getRandomMembers(4) },
  { id: 'community-service', name: 'Community Service', type: 'other', studentCount: 30, members: getRandomMembers(4) },
  { id: 'volunteer-corp', name: 'Volunteer Corps', type: 'other', studentCount: 22, members: getRandomMembers(4) },
  { id: 'sustainability', name: 'Sustainability Team', type: 'flex', studentCount: 15, members: getRandomMembers(4) },
  { id: 'wellness-anchor', name: 'Wellness Anchor', type: 'anchor', studentCount: 12, members: getRandomMembers(4) },
  { id: 'leadership-studio', name: 'Leadership Studio', type: 'studio', studentCount: 16, members: getRandomMembers(4) },
];

export const groupTypeLabels: Record<string, string> = {
  all: 'All',
  studio: 'Studio',
  anchor: 'Anchor',
  flex: 'Flex',
  other: 'Other',
};
