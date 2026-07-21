export interface Video {
  id: string;
  title: string;
  duration: string;
  locked: boolean;
  thumbnail: string; // placeholder color
}

export interface Topic {
  id: string;
  title: string;
  videos: Video[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  price: string;
  topics: Topic[];
}

export const COURSE: Course = {
  id: "aesthetic-mastery",
  title: "Aesthetic Mastery",
  subtitle: "Transform your look, build confidence & master your physical peak.",
  thumbnail: "/facial-symmetry.png",
  price: "₹1,999",
  topics: [
    {
      id: "t1",
      title: "Foundation — Understanding Your Body",
      videos: [
        { id: "v1", title: "Welcome & What to Expect", duration: "5:22", locked: false, thumbnail: "#1a1a2e" },
        { id: "v2", title: "Body Composition Basics", duration: "12:10", locked: true, thumbnail: "#16213e" },
        { id: "v3", title: "Setting Your Baseline", duration: "8:45", locked: true, thumbnail: "#0f3460" },
      ],
    },
    {
      id: "t2",
      title: "Facial Symmetry & Aesthetics",
      videos: [
        { id: "v4", title: "Facial Structure 101", duration: "14:30", locked: true, thumbnail: "#1b1b2f" },
        { id: "v5", title: "Jawline & Mewing Techniques", duration: "18:00", locked: true, thumbnail: "#192a56" },
        { id: "v6", title: "Skincare Routine for Men", duration: "10:15", locked: true, thumbnail: "#2c2c54" },
        { id: "v7", title: "Hair & Grooming Masterclass", duration: "22:40", locked: true, thumbnail: "#1a1a2e" },
      ],
    },
    {
      id: "t3",
      title: "Workout & Physique Building",
      videos: [
        { id: "v8", title: "Training Split Overview", duration: "9:50", locked: true, thumbnail: "#16213e" },
        { id: "v9", title: "Upper Body Aesthetics", duration: "25:00", locked: true, thumbnail: "#0f3460" },
        { id: "v10", title: "Core & V-Taper Program", duration: "20:30", locked: true, thumbnail: "#1b1b2f" },
        { id: "v11", title: "Legs — The Foundation", duration: "17:20", locked: true, thumbnail: "#192a56" },
      ],
    },
    {
      id: "t4",
      title: "Nutrition & Supplementation",
      videos: [
        { id: "v12", title: "Caloric Strategy for Aesthetics", duration: "13:00", locked: true, thumbnail: "#2c2c54" },
        { id: "v13", title: "Meal Prep Mastery", duration: "16:45", locked: true, thumbnail: "#1a1a2e" },
        { id: "v14", title: "Supplements — What Actually Works", duration: "11:30", locked: true, thumbnail: "#16213e" },
      ],
    },
    {
      id: "t5",
      title: "Mindset & Confidence",
      videos: [
        { id: "v15", title: "The Psychology of Attraction", duration: "19:00", locked: true, thumbnail: "#0f3460" },
        { id: "v16", title: "Building Unshakeable Confidence", duration: "21:15", locked: true, thumbnail: "#1b1b2f" },
        { id: "v17", title: "Daily Routine of Top 1%", duration: "14:00", locked: true, thumbnail: "#192a56" },
      ],
    },
  ],
};
