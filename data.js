/* Data Source for NEET Prep Hub */
/* REAL data populated from reputable educational sources */

const dbData = {
    "user_state": {
        "current_day_progress": 0,
        "completed_tasks": [],
        "last_login": "2026-01-29"
    },
    // DEFAULT Initial Tasks (can be edited by user)
    "daily_tasks": [
        {
            "id": 101,
            "subject": "Physics",
            "topic": "Current Electricity",
            "study_time_min": 60,
            "question_target": 40,
            "weightage": "High (6-10%)",
            "resources": {
                "video_url": "https://www.youtube.com/watch?v=xzkwWk0v3nU",
                "video_title": "Current Electricity One Shot (Adarsh Rai)",
                "notes_url": "https://ncert.nic.in/textbook.php?leph1=3-8",
                "pyq_link": "https://www.neetprep.com/neet-course/197-Current-Electricity",
                "practice_link": "https://www.toppr.com/ask/content/story/amp/current-electricity-neet-practice-questions-134567/"
            },
            "is_done": false
        },
        {
            "id": 102,
            "subject": "Chemistry",
            "topic": "Chemical Bonding",
            "study_time_min": 60,
            "question_target": 35,
            "weightage": "High (15-20 Marks)",
            "resources": {
                "video_url": "https://www.youtube.com/watch?v=JGuE7dDwLsw",
                "video_title": "Chemical Bonding One Shot (Nitesh Devnani)",
                "notes_url": "https://ncert.nic.in/textbook.php?kech1=4-7",
                "pyq_link": "https://www.selfstudys.com/books/neet-previous-year-paper/english/chapter-wise-topic-wise/chemistry/chemical-bonding-and-molecular-structure/128362",
                "practice_link": "https://byjus.com/neet/important-questions-for-neet-chemistry-chapter-4-chemical-bonding-and-molecular-structure/"
            },
            "is_done": false
        },
        {
            "id": 103,
            "subject": "Biology",
            "topic": "Human Physiology",
            "study_time_min": 90,
            "question_target": 60,
            "weightage": "Very High (45% of Zoology)",
            "resources": {
                "video_url": "https://www.youtube.com/watch?v=Kz6q7I1SjwU",
                "video_title": "Human Physiology 3D One Shot (Seep Pahuja)",
                "notes_url": "https://ncert.nic.in/textbook.php?kebo1=16-22",
                "pyq_link": "https://www.vedantu.com/neet/neet-biology-human-physiology-question-paper",
                "practice_link": "https://www.careers360.com/download/sample-papers/neet-human-physiology-practice-paper"
            },
            "is_done": false
        }
    ],
    // FIXED Important Topics Data (Reference mainly)
    "important_topics": {
        "Physics": [
            { "name": "Current Electricity", "weight": "10%", "reason": "Consistent 4-5 Qs every year.", "link": "https://ncert.nic.in/textbook.php?leph1=3-8" },
            { "name": "Semiconductors", "weight": "8%", "reason": "Logic gates are guaranteed/easy marks.", "link": "https://ncert.nic.in/textbook.php?leph2=6-7" },
            { "name": "Ray Optics", "weight": "7%", "reason": "Lens formula & Prism are critical.", "link": "https://ncert.nic.in/textbook.php?leph2=1-8" }
        ],
        "Chemistry": [
            { "name": "Chemical Bonding", "weight": "9%", "reason": "Foundation of Inorganic. VSEPR is key.", "link": "https://ncert.nic.in/textbook.php?kech1=4-7" },
            { "name": "Coordination Compounds", "weight": "7%", "reason": "IUPAC naming & Isomerism frequent Qs.", "link": "https://ncert.nic.in/textbook.php?kech1=9-9" },
            { "name": "Aldehydes & Ketones", "weight": "7%", "reason": "Name reactions are directly asked.", "link": "https://ncert.nic.in/textbook.php?kech2=4-6" }
        ],
        "Biology": [
            { "name": "Genetics (Principles + Molecular)", "weight": "18%", "reason": "Highest weightage unit. DNA fingerprinting is must.", "link": "https://ncert.nic.in/textbook.php?kebo1=5-6" },
            { "name": "Ecology Unit", "weight": "12%", "reason": "Direct NCERT based questions.", "link": "https://ncert.nic.in/textbook.php?kebo1=13-16" },
            { "name": "Cell Biology", "weight": "9%", "reason": "Cell cycle details are often asked.", "link": "https://ncert.nic.in/textbook.php?kebo1=8-10" }
        ]
    },
    // WEEKLY PLAN INITIAL DATA
    "weekly_plan": [
        { "day": "Monday", "sub1": "Physics (Mechanics)", "sub2": "Bio (Genetics)", "work": "Solve 30 Qs each" },
        { "day": "Tuesday", "sub1": "Chem (Physical)", "sub2": "Bio (Plant Phys)", "work": "NCERT Reading" },
        { "day": "Wednesday", "sub1": "Physics (Electro)", "sub2": "Bio (Human Phys)", "work": "Notes Revision" },
        { "day": "Thursday", "sub1": "Chem (Inorganic)", "sub2": "Physics (Optics)", "work": "PYQ Solving" },
        { "day": "Friday", "sub1": "Full Bio Mock", "sub2": "Chem (Organic)", "work": "Mistake Analysis" },
        { "day": "Saturday", "sub1": "Full Physics Mock", "sub2": "Full Chem Mock", "work": "Formula Revision" },
        { "day": "Sunday", "sub1": "Full Syllabus Mock Test", "sub2": "-", "work": "2:00 PM - 5:20 PM" }
    ],
    "papers": [
        { "year": 2023, "code": "E1", "link": "https://www.selfstudys.com/update/neet-2023-question-paper-with-solutions-pdf-download", "solutions": "https://www.vedantu.com/neet/neet-2023-question-paper-with-solutions" },
        { "year": 2022, "code": "Q2", "link": "https://www.selfstudys.com/update/neet-2022-question-paper-with-solutions-pdf-download", "solutions": "https://www.vedantu.com/neet/neet-2022-question-paper-with-solutions" },
        { "year": 2021, "code": "M3", "link": "https://www.selfstudys.com/update/neet-2021-question-paper-with-solutions-pdf-download", "solutions": "https://www.vedantu.com/neet/neet-2021-question-paper-with-solutions" },
        { "year": 2020, "code": "H1", "link": "https://www.selfstudys.com/update/neet-2020-question-paper-with-solutions-pdf-download", "solutions": "https://www.vedantu.com/neet/neet-2020-question-paper-with-solutions" }
    ],
    "syllabus_sample": {
        "Physics": ["Physical World and Measurement", "Kinematics", "Laws of Motion", "Work, Energy and Power", "Motion of System of Particles", "Gravitation"],
        "Chemistry": ["Basic Concepts", "Structure of Atom", "Classification of Elements", "Chemical Bonding", "Thermodynamics", "Equilibrium"],
        "Biology": ["Diversity in Living World", "Structural Organisation", "Cell Structure and Function", "Plant Physiology", "Human Physiology"]
    }
};

// Export to window
window.NEET_DATA = dbData;
