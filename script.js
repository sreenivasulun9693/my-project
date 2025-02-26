// Theme Toggle
function initTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-toggle i');
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// Add theme toggle button to header
document.addEventListener('DOMContentLoaded', function() {
  const headerControls = document.querySelector('.controls-container');
  if (headerControls) {
    const themeButton = document.createElement('button');
    themeButton.className = 'theme-toggle';
    themeButton.innerHTML = '<i class="fas fa-sun"></i>';
    themeButton.setAttribute('aria-label', 'Toggle theme');
    themeButton.addEventListener('click', toggleTheme);
    headerControls.appendChild(themeButton);
  }

  // Initialize theme
  initTheme();
});

// Menu Toggle
const menuButton = document.getElementById('menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const menuOverlay = document.querySelector('.menu-overlay');

function toggleMenu() {
  mobileNav.classList.toggle('show');
  menuOverlay.classList.toggle('show');
  document.body.classList.toggle('menu-open');

  const menuIcon = menuButton.querySelector('i');
  if (mobileNav.classList.contains('show')) {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  } else {
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  }
}

if (menuButton) {
  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
}

if (menuOverlay) {
  menuOverlay.addEventListener('click', () => {
    toggleMenu();
  });
}

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    toggleMenu();
  });
});

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  skillBars.forEach((bar) => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  observer.observe(skillsSection);
}

// Video Player
document.addEventListener('DOMContentLoaded', function() {
  const videoContainer = document.querySelector('.video-container');
  const video = document.querySelector('.video-container video');
  const playButton = document.querySelector('.play-button');
  
  if (videoContainer && video && playButton) {
    playButton.addEventListener('click', function() {
      videoContainer.classList.add('playing');
      video.play();
    });
    
    video.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        videoContainer.classList.add('playing');
      } else {
        video.pause();
        videoContainer.classList.remove('playing');
      }
    });
    
    video.addEventListener('ended', function() {
      videoContainer.classList.remove('playing');
    });
  }
});

// Project Filtering
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Initialize all projects to be visible
  projectCards.forEach(card => {
    card.style.display = 'block';
  });
  
  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          const categories = card.getAttribute('data-category').split(' ');
          if (categories.includes(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });
  
  // Project Modal
  const modal = document.querySelector('.project-modal');
  const modalBody = document.querySelector('.modal-body');
  const closeModal = document.querySelector('.close-modal');
  const detailButtons = document.querySelectorAll('.details-btn');
  
  // Project details data
  const projectDetails = {
    sms: {
      title: "Student Management System",
      description: "A comprehensive Java application with JDBC for managing student records, courses, and grades in an educational institution.",
      features: [
        "Student registration and profile management",
        "Course enrollment and scheduling",
        "Grade tracking and GPA calculation",
        "Attendance management",
        "Report generation for students and administrators",
        "User authentication and role-based access control"
      ],
      techStack: ["Java", "JDBC", "MySQL", "Object-Oriented Programming", "MVC Architecture"],
      challenges: "Implementing a robust database schema that could handle complex relationships between students, courses, and grades while maintaining data integrity and performance.",
      solution: "Utilized normalized database design with appropriate foreign key constraints and indexes. Implemented transaction management to ensure data consistency across related operations.",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      github: "https://github.com/yourusername/student-management"
    },
    atm: {
      title: "ATM Interface",
      description: "A Java application simulating ATM operations with user authentication and transaction management.",
      features: [
        "User authentication with PIN verification",
        "Balance inquiry",
        "Cash withdrawal with validation",
        "Deposit functionality",
        "Fund transfers between accounts",
        "Transaction history"
      ],
      techStack: ["Java", "Object-Oriented Programming", "File Handling"],
      challenges: "Ensuring secure user authentication and maintaining transaction integrity while providing a user-friendly interface.",
      solution: "Implemented a layered architecture with separate components for authentication, transaction processing, and user interface to maintain code organization and security.",
      image: "d:\\html and css\\myPortfolio\\images\\java20.jpg",
      github: "https://github.com/sreenivasulu2429/NewCoding/tree/main/AtmInterface"
    },
    numguess: {
      title: "Number Guessing Game",
      description: "An interactive Java game where players guess a randomly generated number with hints.",
      features: [
        "Random number generation",
        "Difficulty levels",
        "Score tracking",
        "Hint system",
        "Multiple rounds"
      ],
      techStack: ["Java", "Random Number Generation", "User Input Handling"],
      challenges: "Creating an engaging user experience with appropriate difficulty scaling and meaningful feedback.",
      solution: "Designed an adaptive difficulty system that adjusts based on player performance and provides helpful hints without making the game too easy.",
      image: "d:\\html and css\\myPortfolio\\images\\java17-fotor-20240905213635.jpg",
      github: "https://github.com/sreenivasulu2429/NewCoding/tree/main/Number_guessing"
    },
    voting: {
      title: "Voting System",
      description: "A Java-based electronic voting system with candidate management and vote counting.",
      features: [
        "Voter registration and verification",
        "Candidate management",
        "Secure voting process",
        "Real-time vote counting",
        "Result analysis and reporting"
      ],
      techStack: ["Java", "Collections Framework", "File I/O"],
      challenges: "Ensuring vote integrity and preventing duplicate voting while maintaining voter anonymity.",
      solution: "Implemented a token-based voting system with cryptographic verification to ensure each voter can only vote once while keeping individual votes private.",
      image: "d:\\html and css\\myPortfolio\\images\\java 19.png",
      github: "https://github.com/sreenivasulu2429/NewCoding/tree/main/Voting"
    }
  };
  
  // Open modal with project details
  detailButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.getAttribute('data-project');
      const project = projectDetails[projectId];
      
      if (project) {
        modalBody.innerHTML = `
          <h2>${project.title}</h2>
          <img src="${project.image}" alt="${project.title}" class="project-screenshot">
          <p>${project.description}</p>
          
          <h3>Features</h3>
          <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
          
          <h3>Technology Stack</h3>
          <div class="tech-stack">
            ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
          </div>
          
          <h3>Challenges</h3>
          <p>${project.challenges}</p>
          
          <h3>Solution</h3>
          <p>${project.solution}</p>
          
          <div class="project-links">
            <a href="${project.github}" target="_blank" class="project-link">
              <i class="fab fa-github"></i> View on GitHub
            </a>
          </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close modal
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

// Initialize EmailJS
(function () {
  emailjs.init('ktWkzd0cydmrFuE4r'); // Replace with your actual public key
})();

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Show loading state
      const submitButton = this.querySelector('.btn');
      submitButton.classList.add('loading');

      // Get form data
      const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_name: 'Sreenivas', // Your name
      };

      // Send email
      emailjs
        .send(
          'service_c9z2t0u', // Replace with your EmailJS service ID
          'template_5ga0b1i', // Replace with your EmailJS template ID
          formData
        )
        .then(function (response) {
          showToast('Message sent successfully!', 'success');
          document.getElementById('contact-form').reset();
        })
        .catch(function (error) {
          console.error('EmailJS error:', error);
          showToast('Failed to send message. Please try again.', 'error');
        })
        .finally(function () {
          submitButton.classList.remove('loading');
        });
    });
  }
});

// Toast notification function
function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Footer animation
document.addEventListener('DOMContentLoaded', function() {
  const footerSections = document.querySelectorAll('.footer-section');
  
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          footerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  footerSections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease';
    footerObserver.observe(section);
  });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });
});
