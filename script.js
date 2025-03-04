
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
  
  // Add transition class to body for smooth theme change
  document.body.classList.add('theme-transition');
  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 1000);
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
  
  // Add back to top button
  const backToTopButton = document.createElement('div');
  backToTopButton.className = 'back-to-top';
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopButton);
  
  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  // Scroll to top when button is clicked
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add animation classes to elements when they come into view
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('text-section')) {
          entry.target.style.animation = entry.target.closest('.container2') ? 
            'fadeInLeft 1s ease-out forwards' : 'fadeInRight 1s ease-out forwards';
        } else if (entry.target.id === 'profile-img') {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        } else {
          entry.target.classList.add('fade-in');
        }
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Elements to animate
  document.querySelectorAll('.text-section, #profile-img, .section, .project-card, .video-container, .forem').forEach(el => {
    if (el.id === 'profile-img') {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px) scale(0.9)';
      el.style.transition = 'all 0.8s ease';
    }
    animateOnScroll.observe(el);
  });
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

// Project Filtering with Animation
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Initialize all projects to be visible with staggered animation
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
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
      
      // Filter projects with staggered animation
      let visibleIndex = 0;
      
      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, visibleIndex * 100);
          visibleIndex++;
        } else {
          const categories = card.getAttribute('data-category').split(' ');
          if (categories.includes(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, visibleIndex * 100);
            visibleIndex++;
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
  
  // Project Modal with Enhanced Animation
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
      github: "https://github.com/sreenivasulun9693/my-works/tree/main/StudentManagementSystem"
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
      image: "images/java20.jpg",
      github: "https://github.com/sreenivasulun9693/my-works/tree/main/AtmProject"
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
      image: "images/java17-fotor-20240905213635.jpg",
      github: "https://github.com/sreenivasulun9693/my-works/tree/main/NumberGuessingProject"
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
      image: "images/java 19.png",
      github: "https://github.com/sreenivasulun9693/my-works/tree/main/VotingSystem"

    },
    ew: {
      title: "E-commerce Website",
      description: "A Web based application using fundementals of web development like HTML and CSS.",
      features: [
        "Voter registration and verification",
        "Candidate management",
        "Secure voting process",
        "Real-time vote counting",
        "Result analysis and reporting"
      ],
      techStack: ["HTML", "CSS"],
      challenges: "Ensuring vote integrity and preventing duplicate voting while maintaining voter anonymity.",
      solution: "Implemented a token-based voting system with cryptographic verification to ensure each voter can only vote once while keeping individual votes private.",
      image: "images/store1.jpg",
      github: "https://github.com/sreenivasulun9693/my-works/tree/main/E-Commerce",
     
    }
  };
  
  // Open modal with project details and enhanced animation
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
        
        // Animate modal elements
        setTimeout(() => {
          const elements = modalBody.querySelectorAll('h2, img, p, h3, ul, .tech-stack, .project-links');
          elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
          });
        }, 300);
      }
    });
  });
  
  // Close modal with animation
  closeModal.addEventListener('click', () => {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
      modal.style.opacity = '1';
      document.body.style.overflow = 'auto';
    }, 300);
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.display = 'none';
        modal.style.opacity = '1';
        document.body.style.overflow = 'auto';
      }, 300);
    }
  });
});

// Initialize EmailJS
(function () {
  emailjs.init('ktWkzd0cydmrFuE4r'); // Replace with your actual public key
})();

// Contact Form Handling with Enhanced Animation
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Add focus animation to form inputs
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (this.value === '') {
          this.parentElement.classList.remove('focused');
        }
      });
    });
    
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

// Enhanced Toast notification function
function showToast(message, type) {
  // Remove any existing toasts
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => toast.remove());
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Add icon based on type
  const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
  toast.innerHTML = `
    <i class="fas fa-${icon}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Footer animation with enhanced effects
document.addEventListener('DOMContentLoaded', function() {
  const footerSections = document.querySelectorAll('.footer-section');
  
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 150);
          footerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  footerSections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.7s ease';
    footerObserver.observe(section);
  });
  
  // Animate footer icons
  const footerIcons = document.querySelectorAll('.footer-icons a');
  const footerIconsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        footerIcons.forEach((icon, index) => {
          setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
          }, index * 150);
        });
        footerIconsObserver.unobserve(entries[0].target);
      }
    },
    { threshold: 0.5 }
  );
  
  if (footerIcons.length > 0) {
    footerIcons.forEach(icon => {
      icon.style.opacity = '0';
      icon.style.transform = 'translateY(20px)';
      icon.style.transition = 'all 0.5s ease';
    });
    
    footerIconsObserver.observe(document.querySelector('.footer-icons'));
  }
});

// Enhanced Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Highlight the section being scrolled to
        targetElement.classList.add('highlight-section');
        setTimeout(() => {
          targetElement.classList.remove('highlight-section');
        }, 2000);
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add typing animation to the role text
document.addEventListener('DOMContentLoaded', function() {
  const roleElement = document.getElementById('word');
  if (roleElement) {
    const roles = ['A passionate', 'A creative', 'An innovative', 'A dedicated'];
    let currentRoleIndex = 0;
    
    setInterval(() => {
      roleElement.style.opacity = '0';
      setTimeout(() => {
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        roleElement.textContent = roles[currentRoleIndex];
        roleElement.style.opacity = '1';
      }, 500);
    }, 3000);
  }
});
