
        // Course data
        const courses = [
            {
                id: 1,
                title: "Web Development Bootcamp",
                category: "Web Development",
                description: "Learn HTML, CSS, JavaScript, React, Node.js, and more to become a full-stack developer.",
                instructor: "Jane Smith",
                duration: "42 hours",
                students: 1250,
                progress: 75,
                enrolled: true
            },
            {
                id: 2,
                title: "Data Science Fundamentals",
                category: "Data Science",
                description: "Master the basics of data analysis, visualization, and machine learning with Python.",
                instructor: "John Davis",
                duration: "36 hours",
                students: 890,
                progress: 30,
                enrolled: true
            },
            {
                id: 3,
                title: "UI/UX Design Principles",
                category: "Design",
                description: "Learn user interface and user experience design to create engaging digital products.",
                instructor: "Alex Johnson",
                duration: "28 hours",
                students: 1540,
                progress: 0,
                enrolled: false
            },
            {
                id: 4,
                title: "Python for Beginners",
                category: "Programming",
                description: "Start your programming journey with Python, one of the most popular languages.",
                instructor: "Michael Brown",
                duration: "24 hours",
                students: 3200,
                progress: 0,
                enrolled: false
            },
            {
                id: 5,
                title: "Digital Marketing Strategy",
                category: "Marketing",
                description: "Learn how to build effective digital marketing campaigns across multiple channels.",
                instructor: "Sarah Wilson",
                duration: "30 hours",
                students: 980,
                progress: 0,
                enrolled: false
            },
            {
                id: 6,
                title: "Mobile App Development",
                category: "Mobile",
                description: "Build cross-platform mobile applications using React Native and Firebase.",
                instructor: "David Lee",
                duration: "40 hours",
                students: 740,
                progress: 0,
                enrolled: false
            }
        ];

        // Lesson data
        const modules = [
            {
                id: 1,
                title: "Web Development Fundamentals",
                lessons: [
                    { id: 1, title: "Introduction to HTML", duration: "30 min", completed: true },
                    { id: 2, title: "HTML Elements and Tags", duration: "45 min", completed: true },
                    { id: 3, title: "HTML Forms and Inputs", duration: "40 min", completed: true },
                    { id: 4, title: "Introduction to CSS", duration: "35 min", completed: false },
                    { id: 5, title: "CSS Selectors and Properties", duration: "50 min", completed: false },
                    { id: 6, title: "CSS Layouts with Flexbox", duration: "55 min", completed: false },
                    { id: 7, title: "Introduction to JavaScript", duration: "60 min", completed: false },
                    { id: 8, title: "JavaScript Functions and Events", duration: "50 min", completed: false }
                ]
            },
            {
                id: 2,
                title: "Data Science Fundamentals",
                lessons: [
                    { id: 9, title: "Introduction to Data Science", duration: "40 min", completed: true },
                    { id: 10, title: "Python for Data Analysis", duration: "55 min", completed: true },
                    { id: 11, title: "Data Visualization with Matplotlib", duration: "60 min", completed: false },
                    { id: 12, title: "Introduction to Pandas", duration: "65 min", completed: false }
                ]
            }
        ];

        // Quiz data
        const quizQuestions = [
            {
                id: 1,
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Tech Modern Language",
                    "Hyper Transfer Markup Language",
                    "Home Tool Markup Language"
                ],
                correct: 0
            },
            {
                id: 2,
                question: "Which tag is used to create a hyperlink in HTML?",
                options: [
                    "<link>",
                    "<a>",
                    "<href>",
                    "<hyperlink>"
                ],
                correct: 1
            },
            {
                id: 3,
                question: "Which CSS property is used to change the text color?",
                options: [
                    "text-color",
                    "font-color",
                    "color",
                    "text-style"
                ],
                correct: 2
            },
            {
                id: 4,
                question: "Which of the following is NOT a JavaScript data type?",
                options: [
                    "String",
                    "Boolean",
                    "Number",
                    "Float"
                ],
                correct: 3
            },
            {
                id: 5,
                question: "What does CSS stand for?",
                options: [
                    "Computer Style Sheets",
                    "Creative Style System",
                    "Cascading Style Sheets",
                    "Colorful Style Sheets"
                ],
                correct: 2
            }
        ];

        // State variables
        let currentPage = "home";
        let currentLessonModule = 0;
        let currentLessonIndex = 0;
        let currentQuizQuestion = 0;
        let quizScore = 0;
        let selectedQuizOption = null;
        let quizCompleted = false;

        // DOM elements
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        const popularCoursesContainer = document.getElementById('popular-courses');
        const continueLearningContainer = document.getElementById('continue-learning');
        const allCoursesContainer = document.getElementById('all-courses');
        const myCoursesContainer = document.getElementById('my-courses');
        const lessonListContainer = document.getElementById('lesson-list');
        const moduleTitleElement = document.getElementById('module-title');
        const currentLessonTitleElement = document.getElementById('current-lesson-title');
        const lessonTextElement = document.getElementById('lesson-text');
        const prevLessonButton = document.getElementById('prev-lesson');
        const nextLessonButton = document.getElementById('next-lesson');
        
        // Quiz elements
        const currentQuestionElement = document.getElementById('current-question');
        const totalQuestionsElement = document.getElementById('total-questions');
        const quizQuestionElement = document.getElementById('quiz-question');
        const quizOptionsContainer = document.getElementById('quiz-options');
        const nextQuestionButton = document.getElementById('next-question');
        const quitQuizButton = document.getElementById('quit-quiz');

        // Initialize the platform
        document.addEventListener('DOMContentLoaded', function() {
            initializePlatform();
            setupEventListeners();
        });

        function initializePlatform() {
            loadPopularCourses();
            loadContinueLearningCourses();
            loadAllCourses();
            loadMyCourses();
            loadLessonModule();
            updateDashboardStats();
            
            // Set quiz total questions
            totalQuestionsElement.textContent = quizQuestions.length;
        }

        function setupEventListeners() {
            // Navigation
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const page = this.getAttribute('data-page');
                    navigateToPage(page);
                    
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Lesson navigation
            prevLessonButton.addEventListener('click', showPreviousLesson);
            nextLessonButton.addEventListener('click', showNextLesson);
            
            // Quiz navigation
            nextQuestionButton.addEventListener('click', showNextQuizQuestion);
            quitQuizButton.addEventListener('click', () => navigateToPage('lesson'));
        }

        function navigateToPage(page) {
            // Hide all pages
            pages.forEach(p => p.classList.remove('active'));
            
            // Show the selected page
            document.getElementById(page).classList.add('active');
            currentPage = page;
            
            // Update page-specific content
            if (page === 'lesson') {
                loadLessonModule();
            } else if (page === 'dashboard') {
                updateDashboardStats();
                loadMyCourses();
            }
        }

        function loadPopularCourses() {
            // Show first 3 courses as popular
            const popularCourses = courses.slice(0, 3);
            renderCourses(popularCourses, popularCoursesContainer);
        }

        function loadContinueLearningCourses() {
            // Show courses with progress > 0
            const continueCourses = courses.filter(course => course.progress > 0);
            renderCourses(continueCourses, continueLearningContainer);
        }

        function loadAllCourses() {
            renderCourses(courses, allCoursesContainer);
        }

        function loadMyCourses() {
            // Show courses where user is enrolled
            const myCourses = courses.filter(course => course.enrolled);
            renderCourses(myCourses, myCoursesContainer);
        }

        function renderCourses(courseList, container) {
            container.innerHTML = '';
            
            courseList.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.className = 'course-card';
                courseCard.innerHTML = `
                    <div class="course-image" style="background-color: ${getCourseColor(course.category)};">
                        <i class="fas ${getCourseIcon(course.category)}"></i>
                    </div>
                    <div class="course-content">
                        <span class="course-category">${course.category}</span>
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-description">${course.description}</p>
                        <div class="course-meta">
                            <span><i class="fas fa-user"></i> ${course.instructor}</span>
                            <span><i class="fas fa-clock"></i> ${course.duration}</span>
                        </div>
                        ${course.enrolled ? `
                            <div class="course-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                                </div>
                                <div class="progress-text">
                                    <span>Progress</span>
                                    <span>${course.progress}%</span>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-small" style="width: 100%; margin-top: 10px;" data-course-id="${course.id}">
                                ${course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                            </button>
                        ` : `
                            <button class="btn btn-primary btn-small" style="width: 100%; margin-top: 10px;" data-course-id="${course.id}">
                                Enroll Now
                            </button>
                        `}
                    </div>
                `;
                
                // Add event listener to the button
                const button = courseCard.querySelector('button');
                button.addEventListener('click', function() {
                    const courseId = parseInt(this.getAttribute('data-course-id'));
                    handleCourseAction(courseId);
                });
                
                container.appendChild(courseCard);
            });
        }

        function getCourseColor(category) {
            const colors = {
                'Web Development': '#4361ee',
                'Data Science': '#3a0ca3',
                'Design': '#4cc9f0',
                'Programming': '#7209b7',
                'Marketing': '#f72585',
                'Mobile': '#4895ef'
            };
            return colors[category] || '#4361ee';
        }

        function getCourseIcon(category) {
            const icons = {
                'Web Development': 'fa-code',
                'Data Science': 'fa-chart-line',
                'Design': 'fa-palette',
                'Programming': 'fa-laptop-code',
                'Marketing': 'fa-bullhorn',
                'Mobile': 'fa-mobile-alt'
            };
            return icons[category] || 'fa-book';
        }

        function handleCourseAction(courseId) {
            const course = courses.find(c => c.id === courseId);
            
            if (!course.enrolled) {
                // Enroll in course
                course.enrolled = true;
                alert(`Successfully enrolled in "${course.title}"!`);
                
                // Reload relevant sections
                loadMyCourses();
                loadAllCourses();
                loadContinueLearningCourses();
                updateDashboardStats();
                
                // Navigate to lesson page if it's the web development course
                if (courseId === 1) {
                    navigateToPage('lesson');
                }
            } else {
                // Already enrolled - go to course
                if (courseId === 1) {
                    navigateToPage('lesson');
                } else if (courseId === 2) {
                    // For data science course, set the module
                    currentLessonModule = 1;
                    currentLessonIndex = 0;
                    navigateToPage('lesson');
                } else {
                    alert(`Navigating to "${course.title}"`);
                    // In a real app, you would load the specific course content
                }
            }
        }

        function loadLessonModule() {
            const module = modules[currentLessonModule];
            moduleTitleElement.textContent = module.title;
            
            // Load lesson list
            lessonListContainer.innerHTML = '';
            module.lessons.forEach((lesson, index) => {
                const lessonItem = document.createElement('div');
                lessonItem.className = `lesson-item ${lesson.completed ? 'completed' : ''} ${index === currentLessonIndex ? 'active' : ''}`;
                lessonItem.innerHTML = `
                    <i class="fas ${lesson.completed ? 'fa-check-circle' : 'fa-play-circle'}"></i>
                    <span>${lesson.title}</span>
                    <span style="margin-left: auto; font-size: 0.85rem;">${lesson.duration}</span>
                `;
                
                lessonItem.addEventListener('click', () => {
                    selectLesson(index);
                });
                
                lessonListContainer.appendChild(lessonItem);
            });
            
            // Load current lesson content
            selectLesson(currentLessonIndex);
        }

        function selectLesson(index) {
            const module = modules[currentLessonModule];
            const lesson = module.lessons[index];
            
            // Update active lesson in sidebar
            document.querySelectorAll('.lesson-item').forEach((item, i) => {
                item.classList.remove('active');
                if (i === index) {
                    item.classList.add('active');
                }
            });
            
            // Update lesson content
            currentLessonTitleElement.textContent = lesson.title;
            currentLessonIndex = index;
            
            // Show quiz button for the last lesson of the module
            if (index === module.lessons.length - 1) {
                nextLessonButton.innerHTML = 'Take Quiz <i class="fas fa-question-circle"></i>';
                nextLessonButton.onclick = startQuiz;
            } else {
                nextLessonButton.innerHTML = 'Next Lesson <i class="fas fa-arrow-right"></i>';
                nextLessonButton.onclick = showNextLesson;
            }
        }

        function showPreviousLesson() {
            if (currentLessonIndex > 0) {
                selectLesson(currentLessonIndex - 1);
            }
        }

        function showNextLesson() {
            const module = modules[currentLessonModule];
            if (currentLessonIndex < module.lessons.length - 1) {
                // Mark current lesson as completed
                module.lessons[currentLessonIndex].completed = true;
                selectLesson(currentLessonIndex + 1);
                
                // Update dashboard stats
                updateDashboardStats();
            }
        }

        function startQuiz() {
            currentQuizQuestion = 0;
            quizScore = 0;
            quizCompleted = false;
            loadQuizQuestion(currentQuizQuestion);
            navigateToPage('quiz');
        }

        function loadQuizQuestion(questionIndex) {
            const question = quizQuestions[questionIndex];
            currentQuestionElement.textContent = questionIndex + 1;
            quizQuestionElement.textContent = question.question;
            
            // Clear previous options
            quizOptionsContainer.innerHTML = '';
            selectedQuizOption = null;
            
            // Create new options
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'quiz-option';
                optionElement.innerHTML = `
                    <div class="option-label">${String.fromCharCode(65 + index)}</div>
                    <div class="option-text">${option}</div>
                `;
                
                optionElement.addEventListener('click', () => {
                    if (quizCompleted) return;
                    
                    // Remove selected class from all options
                    document.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked option
                    optionElement.classList.add('selected');
                    selectedQuizOption = index;
                    
                    // Check if answer is correct
                    if (index === question.correct) {
                        optionElement.classList.add('correct');
                    } else {
                        optionElement.classList.add('incorrect');
                        // Highlight correct answer
                        document.querySelectorAll('.quiz-option')[question.correct].classList.add('correct');
                    }
                });
                
                quizOptionsContainer.appendChild(optionElement);
            });
            
            // Update next button text for last question
            if (questionIndex === quizQuestions.length - 1) {
                nextQuestionButton.textContent = 'Finish Quiz';
            } else {
                nextQuestionButton.textContent = 'Next Question';
            }
        }

        function showNextQuizQuestion() {
            if (selectedQuizOption === null && !quizCompleted) {
                alert('Please select an answer before proceeding.');
                return;
            }
            
            // Update score if answer was correct
            if (selectedQuizOption === quizQuestions[currentQuizQuestion].correct) {
                quizScore++;
            }
            
            // Move to next question or show results
            if (currentQuizQuestion < quizQuestions.length - 1) {
                currentQuizQuestion++;
                loadQuizQuestion(currentQuizQuestion);
            } else {
                showQuizResults();
            }
        }

        function showQuizResults() {
            quizCompleted = true;
            
            const percentage = Math.round((quizScore / quizQuestions.length) * 100);
            
            quizQuestionElement.innerHTML = `
                <div class="quiz-results">
                    <h2 class="results-title">Quiz Completed!</h2>
                    <div class="results-score">${percentage}%</div>
                    <p class="results-message">You scored ${quizScore} out of ${quizQuestions.length} questions correctly.</p>
                    <button class="btn btn-primary" id="retake-quiz">Retake Quiz</button>
                    <button class="btn btn-outline" id="back-to-lessons">Back to Lessons</button>
                </div>
            `;
            
            quizOptionsContainer.innerHTML = '';
            
            // Update next button
            nextQuestionButton.style.display = 'none';
            
            // Add event listeners for result buttons
            document.getElementById('retake-quiz').addEventListener('click', () => {
                startQuiz();
            });
            
            document.getElementById('back-to-lessons').addEventListener('click', () => {
                navigateToPage('lesson');
            });
            
            // Mark module as completed if score is good
            if (percentage >= 70) {
                modules[currentLessonModule].lessons.forEach(lesson => {
                    lesson.completed = true;
                });
                updateDashboardStats();
            }
        }

        function updateDashboardStats() {
            // Calculate enrolled courses
            const enrolledCourses = courses.filter(course => course.enrolled).length;
            document.getElementById('enrolled-courses').textContent = enrolledCourses;
            
            // Calculate completed lessons
            let completedLessons = 0;
            modules.forEach(module => {
                module.lessons.forEach(lesson => {
                    if (lesson.completed) completedLessons++;
                });
            });
            document.getElementById('completed-lessons').textContent = completedLessons;
            
            // Calculate study hours (simplified)
            const studyHours = completedLessons * 0.5; // Assuming 30 min per lesson
            document.getElementById('study-hours').textContent = studyHours.toFixed(1);
            
            // Calculate achievements
            const achievements = Math.floor(completedLessons / 5);
            document.getElementById('achievements').textContent = achievements;
        }
    