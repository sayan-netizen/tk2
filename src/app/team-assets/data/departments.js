export const CONVENERS = [
  { symbol: '統', name: 'Dr. A. K. Sharma', role: 'Convener', seed: 100, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
];

export const FACULTY_COORDINATORS = [
  { symbol: '教', name: 'Dr. Rajesh Kumar', role: 'Faculty Coordinator', seed: 150, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '導', name: 'Dr. Meenakshi Sundaram', role: 'Faculty Coordinator', seed: 151, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '学', name: 'Dr. Vikramaditya Singh', role: 'Faculty Coordinator', seed: 152, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
];

export const LEADS_SUMMARY = [
  { symbol: '伝', name: 'Kaze Whisperer', role: 'Social Media Lead', seed: 0, dept: 'Social Media' },
  { symbol: '声', name: 'Hana Commander', role: 'PR Director', seed: 3, dept: 'Public Relations' },
  { symbol: '築', name: 'Kai Genki', role: 'Lead Web Architect', seed: 5, dept: 'Web Dev' },
  { symbol: '斬', name: 'Void Kira', role: 'Video Lead', seed: 8, dept: 'Video Editing' },
  { symbol: '墨', name: 'Ink Kuro', role: 'Graphics Lead', seed: 10, dept: 'Graphics Chamber' }
];

export const COORDINATORS = [
  { symbol: '協', name: 'Rohan Verma', role: 'Head Coordinator', seed: 200, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '統', name: 'Ananya Roy', role: 'Event Coordinator', seed: 201, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '運', name: 'Vikram Sethi', role: 'Logistics Lead Coordinator', seed: 202, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '技', name: 'Devika Sharma', role: 'Technical Coordinator', seed: 203, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '広', name: 'Arjun Mehta', role: 'PR & Media Coordinator', seed: 204, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '創', name: 'Ishita Gupta', role: 'Creative & Stage Coordinator', seed: 205, category: 'Coordinator', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
];

export const VOLUNTEERS = [
  { symbol: '奉', name: 'Priya Das', role: 'Senior Student Volunteer', seed: 210, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '力', name: 'Amit Kumar', role: 'Technical Support Volunteer', seed: 211, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '和', name: 'Sneha Kapoor', role: 'Operations & Crowd Volunteer', seed: 212, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '心', name: 'Kabir Malhotra', role: 'Hospitality Volunteer', seed: 213, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '光', name: 'Riya Nair', role: 'Media & Design Volunteer', seed: 214, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { symbol: '疾', name: 'Siddharth Rao', role: 'Ground Logistics Volunteer', seed: 215, category: 'Volunteer', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
];

export const COORDINATORS_VOLUNTEERS = [
  ...COORDINATORS,
  ...VOLUNTEERS
];

export const DEPTS = [
  {
    name: 'Social Media',
    kana: '第一の間 — I',
    title: 'Social<br><span>Media</span>',
    desc: 'Elite content creators weaving shadows into digital signals. Masters of narrative and reach.',
    members: [
      { symbol: '伝', name: 'Kaze Whisperer', role: 'Lead Strategist', seed: 0, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
      { symbol: '影', name: 'Shadow Scribe',  role: 'Content Specialist', seed: 1, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
      { symbol: '響', name: 'Echo Phantom',   role: 'Community Ranger', seed: 2, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  },
  {
    name: 'Public Relations',
    kana: '第二の間 — II',
    title: 'Public<br><span>Relations</span>',
    desc: 'Voices that carry across the void. Ambassadors of the shadow realm\'s story.',
    members: [
      { symbol: '声', name: 'Hana Commander',  role: 'PR Director',    seed: 3, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
      { symbol: '書', name: 'Scroll Messenger', role: 'Liaison Agent',  seed: 4, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  },
  {
    name: 'Web Dev',
    kana: '第三の間 — III',
    title: 'Web<br><span>Dev</span>',
    desc: 'Architects of the digital fortress. Code forged in the fire of the dojo.',
    members: [
      { symbol: '築', name: 'Kai Genki',  role: 'Lead Architect',    seed: 5, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
      { symbol: '術', name: 'Ashi Zora',  role: 'Frontend Shinobi',  seed: 6, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
      { symbol: '霊', name: 'Yoru Bane',  role: 'Database Phantom',  seed: 7, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  },
  {
    name: 'Video Editing',
    kana: '第四の間 — IV',
    title: 'Video<br><span>Editing</span>',
    desc: 'Frame cutters who sculpt time. Phantom editors hiding in every cut.',
    members: [
      { symbol: '斬', name: 'Void Kira',  role: 'Frame Cutter', seed: 8, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
      { symbol: '幻', name: 'Shiro Haze', role: 'VFX Shadow',   seed: 9, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  },
  {
    name: 'Graphics Chamber',
    kana: '第五の間 — V',
    title: 'Graphics<br><span>Chamber</span>',
    desc: 'Ink and pixel, bound by fire. Artists whose work becomes war paint.',
    members: [
      { symbol: '墨', name: 'Ink Kuro',  role: 'Brush Master',    seed: 10, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
      { symbol: '画', name: 'Fuji Nori', role: 'Pixel Assassin',  seed: 11, instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
    ]
  }
];
