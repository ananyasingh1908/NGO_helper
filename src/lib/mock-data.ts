// Mock/dummy data for Saarthi AI. Will be replaced by MySQL later.

export const SITE = {
  name: "Saarthi AI",
  tagline: "Smart Resource Allocation for a Better Tomorrow",
  description:
    "Saarthi AI connects citizens, NGOs, and volunteers to identify, prioritise, and resolve community issues using intelligent task allocation.",
  email: "hello@saarthi.ai",
  phone: "+91 (80) 4567 8910",
  address: "12, MG Road, Bengaluru, Karnataka 560001",
};

export const STATS = [
  { value: "12,480", label: "Issues Reported" },
  { value: "3,245", label: "Active Volunteers" },
  { value: "9,870", label: "Tasks Completed" },
  { value: "184", label: "Partner NGOs" },
];

export const CAUSES = [
  {
    id: "c1",
    title: "Clean Water for Rural Villages",
    description:
      "Installing community water purifiers across 40 villages in drought-affected districts.",
    image:
      "https://images.unsplash.com/photo-1559131397-f94da358f7ca?auto=format&fit=crop&w=1200&q=70",
    raised: 18200,
    goal: 25000,
    urgency: "High",
  },
  {
    id: "c2",
    title: "Education Kits for Children",
    description:
      "Distributing notebooks, uniforms and digital learning tablets to underserved students.",
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=70",
    raised: 9450,
    goal: 15000,
    urgency: "Medium",
  },
  {
    id: "c3",
    title: "Meals for the Homeless",
    description:
      "Daily nutritious meals served from community kitchens in 12 metro locations.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=70",
    raised: 21800,
    goal: 22000,
    urgency: "Critical",
  },
];

export const VOLUNTEERS = [
  {
    name: "Aanya Sharma",
    role: "Field Coordinator",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Rohan Mehta",
    role: "Logistics Lead",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Priya Iyer",
    role: "Education Mentor",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=70",
  },
  {
    name: "Arjun Verma",
    role: "Medical Volunteer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=70",
  },
];

export const EVENTS = [
  {
    date: "22 Apr",
    title: "Tree Plantation Drive — Lalbagh",
    desc: "Help us plant 500 native saplings to restore the urban canopy.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=70",
  },
  {
    date: "29 Apr",
    title: "Free Health Camp — Whitefield",
    desc: "Doctors and volunteers offering free check-ups for migrant workers.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=70",
  },
  {
    date: "06 May",
    title: "Digital Literacy Workshop",
    desc: "Teaching basic computer & internet skills to senior citizens.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=70",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Saarthi AI helped our NGO route volunteers in real-time during the floods. We doubled our reach with the same team.",
    name: "Meera Nair",
    role: "Director, Helping Hands Foundation",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=70",
  },
  {
    quote:
      "Reporting potholes used to feel pointless. With Saarthi I can see the issue assigned, fixed, and verified.",
    name: "Karthik Reddy",
    role: "Citizen, Bengaluru",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=70",
  },
  {
    quote:
      "The self-healing system reassigned a delayed task automatically — the family got food the same evening.",
    name: "Sara D'Souza",
    role: "Volunteer Lead",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=70",
  },
];

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1800&q=75";

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=70";

// Dashboard mock data
export const ADMIN_STATS = [
  { label: "Total Issues", value: 1248, change: "+12%", tone: "primary" as const },
  { label: "Active Volunteers", value: 642, change: "+5%", tone: "accent" as const },
  { label: "Urgent Cases", value: 38, change: "-3%", tone: "destructive" as const },
  { label: "Tasks Completed", value: 987, change: "+18%", tone: "success" as const },
];

export const SELF_HEALING_TASKS = [
  {
    id: "T-2041",
    issue: "Water tanker delivery — Sector 12",
    volunteer: "Rohan Mehta",
    status: "failed" as const,
    timeExceeded: "2h 14m",
  },
  {
    id: "T-2039",
    issue: "Medical kit handover — Old Age Home",
    volunteer: "Priya Iyer",
    status: "delayed" as const,
    timeExceeded: "47m",
  },
  {
    id: "T-2037",
    issue: "Food distribution — Yelahanka shelter",
    volunteer: "Arjun Verma",
    status: "delayed" as const,
    timeExceeded: "1h 02m",
  },
  {
    id: "T-2030",
    issue: "School supplies pickup — HSR depot",
    volunteer: "Aanya Sharma",
    status: "resolved" as const,
    timeExceeded: "—",
  },
];

export const SELF_HEALING_METRICS = [
  { label: "Failed tasks (24h)", value: 14 },
  { label: "Recovery rate", value: "92%" },
  { label: "Auto-reassignments", value: 38 },
  { label: "Avg. recovery time", value: "11m" },
];

export const ACTIVITY_TIMELINE = [
  { time: "2 min ago", text: "Auto-reassigned T-2041 to nearest volunteer (Sneha K.)" },
  { time: "18 min ago", text: "Escalated T-2039 priority to Critical" },
  { time: "1 hr ago", text: "Recovered 4 delayed tasks in Whitefield zone" },
  { time: "3 hrs ago", text: "NGO 'Helping Hands' onboarded 12 new volunteers" },
  { time: "Yesterday", text: "Self-healing prevented SLA breach on 22 tasks" },
];

export const NGO_ISSUES = [
  { id: "I-501", title: "Pothole on 100ft Road", category: "Infrastructure", urgency: "High", status: "In Progress", assigned: "R. Mehta" },
  { id: "I-500", title: "Open garbage near park", category: "Sanitation", urgency: "Medium", status: "Open", assigned: "—" },
  { id: "I-498", title: "Streetlight outage", category: "Utilities", urgency: "Low", status: "Resolved", assigned: "A. Sharma" },
  { id: "I-495", title: "Water logging post-rain", category: "Drainage", urgency: "High", status: "In Progress", assigned: "P. Iyer" },
  { id: "I-490", title: "Stray animal feeding spot", category: "Welfare", urgency: "Low", status: "Open", assigned: "—" },
];

export const VOLUNTEER_TASKS = [
  { id: "T-101", title: "Distribute meal packets — Shanti Nagar", status: "In Progress", due: "Today, 6 PM" },
  { id: "T-102", title: "Verify pothole repair on 100ft Road", status: "Pending", due: "Tomorrow" },
  { id: "T-103", title: "Pick up donated books — Indiranagar", status: "Completed", due: "Yesterday" },
];

export const ANALYTICS_CATEGORIES = [
  { name: "Sanitation", value: 320 },
  { name: "Infra", value: 280 },
  { name: "Health", value: 210 },
  { name: "Education", value: 175 },
  { name: "Utilities", value: 140 },
  { name: "Welfare", value: 90 },
];

export const ANALYTICS_TREND = [
  { week: "W1", reported: 120, resolved: 95 },
  { week: "W2", reported: 140, resolved: 118 },
  { week: "W3", reported: 175, resolved: 150 },
  { week: "W4", reported: 160, resolved: 158 },
  { week: "W5", reported: 200, resolved: 178 },
  { week: "W6", reported: 220, resolved: 205 },
];

export const URGENCY_SPLIT = [
  { name: "Critical", value: 38 },
  { name: "High", value: 142 },
  { name: "Medium", value: 380 },
  { name: "Low", value: 688 },
];

export const NOTIFICATIONS = [
  { title: "New urgent issue assigned", time: "2m", unread: true },
  { title: "Volunteer Sneha completed task T-2041", time: "12m", unread: true },
  { title: "NGO 'CleanCity' submitted monthly report", time: "1h", unread: false },
  { title: "Self-healing recovered 4 tasks", time: "3h", unread: false },
];

export const MESSAGES = [
  { from: "ngo", name: "Helping Hands NGO", text: "Can you take the 6 PM meal route?", time: "10:21" },
  { from: "me", name: "You", text: "Yes, picking up packets in 15 min.", time: "10:23" },
  { from: "ngo", name: "Helping Hands NGO", text: "Great! 42 packets, Shanti Nagar shelter.", time: "10:24" },
  { from: "me", name: "You", text: "On the way 🚴", time: "10:40" },
];
