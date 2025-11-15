import { useState, useEffect } from 'react';

export function WorkSection() {
  const projects = [
    {
      name: 'Assistive Gaze Communication (AAC)',
      type: 'Club Project',
      courseOrClub: 'NCSU Neurotech',
      period: 'Fall 2025 - Present',
      description: 'Developed a grid-based, switch-accessible Augmentative and Alternative Communication (AAC) application for non-verbal children with severe motor impairments, enabling communication through personalized visual widgets and scanning technology',
      techStack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy']
    },
    {
      name: 'Compressed File Archiver (Snark)',
      type: 'Academic Project',
      courseOrClub: 'C and Software Tools',
      period: 'Fall 2025', 
      description: 'Developed a C-based command-line program to create and extract files from a custom-format compressed archive',
      techStack: ['C', 'Makefiles', 'Valgrind']
    },
    {
      name: 'User Activity Log',
      type: 'Academic Project',
      courseOrClub: 'Data Structures & Algorithms',
      period: 'Fall 2024', 
      description: 'Developed a Java-based log management system with a partner, implementing a Map ADT and array-based list for efficient log storage using quicksort and bubblesort',
      techStack: ['Java', 'JUnit', 'Design Patterns']
    },
    {
      name: 'Code Black Website',
      type: 'Club Project',
      courseOrClub: 'Code Black',
      period: 'Fall 2024',
      description: 'Developed the official organization website using fundamental web technologies to establish an online presence',
      techStack: ['HTML', 'CSS']
    },
    {
      name: 'Wolf Scheduler',
      type: 'Academic Project',
      courseOrClub: 'Software Fundamentals',
      period: 'Spring 2024', 
      description: 'Built a fully functional, custom course scheduling tool in Java with JUnit regression tests',
      techStack: ['Java', 'JavaFX', 'JUnit']
    },
    {
      name: 'Backlog Manager',
      type: 'Academic Project',
      courseOrClub: 'Software Fundamentals',
      period: 'Spring 2024', 
      description: 'Created a Java-based backlog management system to track products with assigned tasks and owners using exception handling',
      techStack: ['Java', 'JUnit']
    },
    {
      name: 'Pack Scheduler',
      type: 'Academic Project',
      courseOrClub: 'Software Fundamentals Lab',
      period: 'Spring 2023', 
      description: 'Collaborated with a team of programmers to build a Java-based course registration system for students using JUnit integration  for regression testing',
      techStack: ['Java', 'JUnit', 'Git']
    }
  ];
  // -------------------------------

  const [showRedirect, setShowRedirect] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  // This creates the "typing" effect
  useEffect(() => {
    // Show redirect message after 1 second
    const redirectTimer = setTimeout(() => {
      setShowRedirect(true);
    }, 1000);

    // Show projects after 2 seconds
    const projectsTimer = setTimeout(() => {
      setShowProjects(true);
    }, 3000);

    // Clean up timers when the component unmounts
    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(projectsTimer);
    };
  }, []); // Empty array means this runs only once when the component mounts

  return (
    <div className="space-y-4 font-mono">
      {/* 1. The initial command from the tab */}
      <div className="text-[#00ff00]">
        <span className="text-[#0099ff]">$</span> cat work.log
      </div>

      {/* 2. The "Error" message (always shows) */}
      <div className="pl-4">
        <p className="text-[#ff6b6b]">
          <span className="font-bold">ERROR:</span> File not found: 'work.log'. (Permission: DENIED)
        </p>
      </div>

      {/* 3. The "Redirecting" message (shows after 1 second) */}
      {showRedirect && (
        <div className="pl-4">
          <p className="text-[#e0e0e0]">
            User '[gavin]' does not have work experience (even though he wants that file...). 
            <br />
            Redirecting to 'academicWork.log'...
          </p>
        </div>
      )}

      {/* 4. The Projects list (shows after 2 seconds) */}
      {showProjects && (
        <div className="space-y-4">
          {/* The new "prompt" */}
          <div className="text-[#00ff00]">
            <span className="text-[#0099ff]">$</span> cat academicWork.log
          </div>

          {/* The new content */}
          <div className="pl-4 space-y-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="border border-[#2a2a2a] rounded p-4 bg-[#1a1a1a]"
              >
                <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="text-[#00ff00]">{project.name}</h3>
                    <p className={
                      project.type === 'Club Project' 
                        ? 'text-[#a6e3a1]' // Light green for club
                        : 'text-[#89b4f8]' // Light blue for academic
                    }>
                      {project.courseOrClub}
                    </p>
                  </div>
                  <span className="text-[#0099ff]">{project.period}</span>
                </div>
                <p className="text-[#e0e0e0] mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.techStack.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="text-xs px-2 py-1 bg-[#2a2a2a] text-[#a6e3a1] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}