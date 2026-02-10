        // Interactive Documentary Application
        const docApp = {
            // Current state
            currentSection: 'home',
            quizQuestions: [
                {
                    question: "What year was the World Wide Web invented?",
                    options: [
                        { text: "1975", correct: false },
                        { text: "1982", correct: false },
                        { text: "1989", correct: true },
                        { text: "1995", correct: false }
                    ],
                    explanation: "The World Wide Web was invented by Tim Berners-Lee in 1989 while working at CERN. He created the first web browser and server in 1990."
                },
                {
                    question: "Which company created the first microprocessor?",
                    options: [
                        { text: "IBM", correct: false },
                        { text: "Intel", correct: true },
                        { text: "Apple", correct: false },
                        { text: "Microsoft", correct: false }
                    ],
                    explanation: "Intel introduced the 4004 microprocessor in 1971. It was the first commercially available microprocessor and contained 2,300 transistors."
                },
                {
                    question: "What was the name of the first commercially available mobile phone?",
                    options: [
                        { text: "Nokia 1011", correct: false },
                        { text: "Motorola DynaTAC", correct: true },
                        { text: "IBM Simon", correct: false },
                        { text: "Ericsson GH337", correct: false }
                    ],
                    explanation: "The Motorola DynaTAC 8000X was released in 1983 and was the first commercially available handheld cellular phone."
                },
                {
                    question: "Which of these is NOT a cloud computing service provider?",
                    options: [
                        { text: "Amazon Web Services", correct: false },
                        { text: "Google Cloud Platform", correct: false },
                        { text: "Microsoft Azure", correct: false },
                        { text: "Apple iServe", correct: true }
                    ],
                    explanation: "Apple does not offer a general cloud computing service like AWS, Google Cloud, or Azure. Apple's cloud services are primarily for consumer storage and sync."
                }
            ],
            currentQuizQuestion: 0,
            
            // Initialize the application
            init: function() {
                this.setupEventListeners();
                this.setupScrollAnimations();
                this.setupNavigationProgress();
                this.animateDataVisualizations();
                this.setupQuiz();
                
                // Start with first chapter visible
                setTimeout(() => {
                    document.querySelector('#chapter1').classList.add('visible');
                }, 500);
            },
            
            // Set up event listeners
            setupEventListeners: function() {
                // Navigation links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = link.getAttribute('href').substring(1);
                        this.scrollToSection(targetId);
                        
                        // Update active nav link
                        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    });
                });
                
                // Hero buttons
                document.getElementById('startJourneyBtn').addEventListener('click', () => {
                    this.scrollToSection('chapter1');
                });
                
                document.getElementById('exploreBtn').addEventListener('click', () => {
                    // Show chapter selection
                    alert("Use the navigation menu or scroll to explore different chapters of the documentary.");
                });
                
                // Timeline dots
                document.querySelectorAll('.timeline-dot').forEach(dot => {
                    dot.addEventListener('click', function() {
                        // Toggle active state
                        document.querySelectorAll('.timeline-dot').forEach(d => d.classList.remove('active'));
                        this.classList.add('active');
                        
                        // Get the content for this dot
                        const content = this.nextElementSibling || this.previousElementSibling;
                        if (content) {
                            // Highlight the content
                            content.style.transform = 'translateY(-10px)';
                            content.style.boxShadow = '0 15px 30px rgba(100, 149, 237, 0.3)';
                            
                            // Reset after a moment
                            setTimeout(() => {
                                content.style.transform = '';
                                content.style.boxShadow = '';
                            }, 1000);
                        }
                    });
                });
                
                // Gallery items
                document.querySelectorAll('.gallery-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const modalId = item.getAttribute('data-modal');
                        this.showModal(modalId);
                    });
                });
                
                // Modal close buttons
                document.querySelectorAll('.modal-close').forEach(button => {
                    button.addEventListener('click', () => {
                        document.querySelectorAll('.modal').forEach(modal => {
                            modal.classList.remove('show');
                        });
                    });
                });
                
                // Close modal when clicking outside
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            modal.classList.remove('show');
                        }
                    });
                });
            },
            
            // Scroll to section
            scrollToSection: function(sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    window.scrollTo({
                        top: sectionId === 'home' ? 0 : section.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    this.currentSection = sectionId;
                }
            },
            
            // Set up scroll animations
            setupScrollAnimations: function() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                };
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            
                            // Update navigation progress
                            this.updateNavigationProgress();
                            
                            // Update active nav link
                            const sectionId = entry.target.id;
                            if (sectionId) {
                                document.querySelectorAll('.nav-link').forEach(link => {
                                    if (link.getAttribute('href').substring(1) === sectionId) {
                                        link.classList.add('active');
                                    } else {
                                        link.classList.remove('active');
                                    }
                                });
                            }
                        }
                    });
                }, observerOptions);
                
                // Observe all chapters and timeline items
                document.querySelectorAll('.chapter, .timeline-item').forEach(el => {
                    observer.observe(el);
                });
            },
            
            // Set up navigation progress bar
            setupNavigationProgress: function() {
                window.addEventListener('scroll', () => {
                    this.updateNavigationProgress();
                });
            },
            
            // Update navigation progress
            updateNavigationProgress: function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercentage = (scrollTop / scrollHeight) * 100;
                
                document.getElementById('navProgress').style.width = `${scrollPercentage}%`;
            },
            
            // Animate data visualizations
            animateDataVisualizations: function() {
                // Animate bars when they come into view
                const barObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Animate the bars with appropriate widths
                            document.getElementById('bar1990').style.width = '0.5%';
                            document.getElementById('bar2000').style.width = '6.5%';
                            document.getElementById('bar2010').style.width = '28.7%';
                            document.getElementById('bar2023').style.width = '64.4%';
                            
                            // Stop observing after animation
                            barObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                // Observe the visualization container
                const vizContainer = document.querySelector('.viz-container');
                if (vizContainer) {
                    barObserver.observe(vizContainer);
                }
            },
            
            // Set up interactive quiz
            setupQuiz: function() {
                const quizOptions = document.querySelectorAll('.quiz-option');
                const nextBtn = document.getElementById('nextQuizBtn');
                const restartBtn = document.getElementById('restartQuizBtn');
                const quizResult = document.getElementById('quizResult');
                const resultTitle = document.getElementById('resultTitle');
                const resultDescription = document.getElementById('resultDescription');
                const quizQuestion = document.getElementById('quizQuestion');
                
                // Load first question
                this.loadQuizQuestion(0);
                
                // Quiz option click handler
                quizOptions.forEach(option => {
                    option.addEventListener('click', () => {
                        if (option.classList.contains('selected')) return;
                        
                        // Remove selected class from all options
                        quizOptions.forEach(opt => opt.classList.remove('selected'));
                        
                        // Add selected class to clicked option
                        option.classList.add('selected');
                        
                        // Check if answer is correct
                        const isCorrect = option.getAttribute('data-correct') === 'true';
                        
                        // Show correct/incorrect styling
                        quizOptions.forEach(opt => {
                            if (opt.getAttribute('data-correct') === 'true') {
                                opt.classList.add('correct');
                            }
                            if (opt !== option && opt.getAttribute('data-correct') === 'false') {
                                opt.classList.add('incorrect');
                            }
                        });
                        
                        // Show result
                        resultTitle.textContent = isCorrect ? 'Correct!' : 'Incorrect';
                        resultDescription.textContent = this.quizQuestions[this.currentQuizQuestion].explanation;
                        quizResult.classList.add('show');
                    });
                });
                
                // Next question button
                nextBtn.addEventListener('click', () => {
                    this.currentQuizQuestion = (this.currentQuizQuestion + 1) % this.quizQuestions.length;
                    this.loadQuizQuestion(this.currentQuizQuestion);
                    
                    // Hide result
                    quizResult.classList.remove('show');
                });
                
                // Restart quiz button
                restartBtn.addEventListener('click', () => {
                    this.currentQuizQuestion = 0;
                    this.loadQuizQuestion(this.currentQuizQuestion);
                    
                    // Hide result
                    quizResult.classList.remove('show');
                });
            },
            
            // Load quiz question
            loadQuizQuestion: function(index) {
                const question = this.quizQuestions[index];
                const quizQuestion = document.getElementById('quizQuestion');
                const quizOptions = document.querySelectorAll('.quiz-option');
                
                // Update question text
                quizQuestion.textContent = question.question;
                
                // Update options
                quizOptions.forEach((option, i) => {
                    // Reset classes
                    option.className = 'quiz-option';
                    option.classList.remove('selected', 'correct', 'incorrect');
                    
                    // Update text
                    const optionText = option.querySelector('.option-text');
                    optionText.textContent = question.options[i].text;
                    
                    // Update data attribute
                    option.setAttribute('data-correct', question.options[i].correct.toString());
                });
            },
            
            // Show modal
            showModal: function(modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            },
            
            // Close modal
            closeModal: function() {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.remove('show');
                });
                document.body.style.overflow = 'auto';
            }
        };
        
        // Initialize the application when page loads
        window.addEventListener('load', () => {
            docApp.init();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape to close modals
            if (e.key === 'Escape') {
                docApp.closeModal();
            }
            
            // Space to scroll down
            if (e.key === ' ' && !e.target.matches('input, textarea, button')) {
                e.preventDefault();
                window.scrollBy(0, window.innerHeight * 0.8);
            }
        });