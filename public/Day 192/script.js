        // DOM Elements
        const currentNode = document.getElementById('currentNode');
        const nodeTitle = document.getElementById('nodeTitle');
        const nodeDescription = document.getElementById('nodeDescription');
        const choicesContainer = document.getElementById('choicesContainer');
        const visualPath = document.getElementById('visualPath');
        const pathSteps = document.getElementById('pathSteps');
        const resultContainer = document.getElementById('resultContainer');
        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const resultDescription = document.getElementById('resultDescription');
        const tryAnotherBtn = document.getElementById('tryAnotherBtn');
        const resetTreeBtn = document.getElementById('resetTreeBtn');
        const decisionsCount = document.getElementById('decisionsCount');
        const pathsExplored = document.getElementById('pathsExplored');
        const currentTree = document.getElementById('currentTree');
        const treeVisual = document.getElementById('treeVisual');
        
        // Decision Tree Database
        const decisionTrees = {
            1: { // Career Path Explorer
                name: "Career Path Explorer",
                color: "#ffd6d6",
                startNode: "career_start",
                nodes: {
                    "career_start": {
                        title: "Career Path Explorer",
                        description: "Let's explore potential career paths based on your skills and interests. What type of work environment do you prefer?",
                        choices: [
                            { text: "Corporate office setting", next: "corporate_path", color: 1 },
                            { text: "Remote/flexible work", next: "remote_path", color: 2 },
                            { text: "Creative/artistic environment", next: "creative_path", color: 3 },
                            { text: "Outdoor/active work", next: "outdoor_path", color: 4 }
                        ]
                    },
                    "corporate_path": {
                        title: "Corporate Environment",
                        description: "Great choice! Now, what type of corporate role interests you most?",
                        choices: [
                            { text: "Management/Leadership", next: "management_result", color: 1 },
                            { text: "Technical/Specialist", next: "technical_result", color: 2 },
                            { text: "Client-facing/Sales", next: "sales_result", color: 3 }
                        ]
                    },
                    "remote_path": {
                        title: "Remote Work Preference",
                        description: "Remote work offers flexibility! What skills do you want to leverage?",
                        choices: [
                            { text: "Digital/Technical skills", next: "digital_nomad_result", color: 1 },
                            { text: "Writing/Content creation", next: "content_creator_result", color: 2 },
                            { text: "Teaching/Tutoring", next: "online_teacher_result", color: 3 }
                        ]
                    },
                    "creative_path": {
                        title: "Creative Environment",
                        description: "Creative work can be very fulfilling! What's your primary creative interest?",
                        choices: [
                            { text: "Visual arts/Design", next: "designer_result", color: 1 },
                            { text: "Writing/Storytelling", next: "writer_result", color: 2 },
                            { text: "Music/Performing arts", next: "performer_result", color: 3 }
                        ]
                    },
                    "outdoor_path": {
                        title: "Outdoor/Active Work",
                        description: "Active work keeps you moving! What type of outdoor work appeals to you?",
                        choices: [
                            { text: "Environmental/Conservation", next: "environmental_result", color: 1 },
                            { text: "Fitness/Wellness", next: "fitness_result", color: 2 },
                            { text: "Adventure/Travel", next: "adventure_result", color: 3 }
                        ]
                    },
                    "management_result": {
                        title: "Management Career Path",
                        description: "You're suited for leadership roles! Consider pursuing an MBA or leadership training program. Look for team lead positions to start building experience.",
                        isResult: true,
                        icon: "fas fa-briefcase",
                        color: 1
                    },
                    "technical_result": {
                        title: "Technical Specialist Path",
                        description: "Your analytical mind is perfect for technical roles! Consider certifications in your field of interest. Tech companies often have great career progression for specialists.",
                        isResult: true,
                        icon: "fas fa-laptop-code",
                        color: 2
                    },
                    "sales_result": {
                        title: "Sales & Business Development",
                        description: "Your people skills will shine in sales! Start in an entry-level sales role and work your way up. Consider industries that genuinely interest you for better success.",
                        isResult: true,
                        icon: "fas fa-chart-line",
                        color: 3
                    },
                    "digital_nomad_result": {
                        title: "Digital Nomad Lifestyle",
                        description: "Perfect for tech-savvy remote workers! Build a portfolio of remote work skills like web development, digital marketing, or data analysis. Consider freelancing platforms to start.",
                        isResult: true,
                        icon: "fas fa-globe-americas",
                        color: 1
                    },
                    "content_creator_result": {
                        title: "Content Creator/Writer",
                        description: "Your writing skills can build a career! Start a blog, contribute to publications, or offer freelance writing services. Build a portfolio and network with editors.",
                        isResult: true,
                        icon: "fas fa-pen-fancy",
                        color: 2
                    },
                    "online_teacher_result": {
                        title: "Online Educator",
                        description: "Share your knowledge with the world! Create online courses, offer tutoring services, or teach English online. Platforms like Udemy or Coursera can help you get started.",
                        isResult: true,
                        icon: "fas fa-chalkboard-teacher",
                        color: 3
                    },
                    "designer_result": {
                        title: "Visual Designer",
                        description: "Your eye for design can create beautiful careers! Build a strong portfolio with diverse projects. Consider specializing in UI/UX, graphic design, or illustration.",
                        isResult: true,
                        icon: "fas fa-palette",
                        color: 1
                    },
                    "writer_result": {
                        title: "Professional Writer",
                        description: "Your storytelling ability is your strength! Consider copywriting, journalism, or creative writing. Start submitting work to publications and build your author platform.",
                        isResult: true,
                        icon: "fas fa-book-open",
                        color: 2
                    },
                    "performer_result": {
                        title: "Performing Artist",
                        description: "Your creative expression can become a career! Build a strong online presence, network in your industry, and consider formal training to hone your craft.",
                        isResult: true,
                        icon: "fas fa-theater-masks",
                        color: 3
                    },
                    "environmental_result": {
                        title: "Environmental Specialist",
                        description: "Combine your love for outdoors with purpose! Consider degrees in environmental science, conservation work, or sustainability consulting. Many NGOs and government agencies need these skills.",
                        isResult: true,
                        icon: "fas fa-leaf",
                        color: 1
                    },
                    "fitness_result": {
                        title: "Fitness & Wellness Professional",
                        description: "Help others achieve their health goals! Get certified as a personal trainer, yoga instructor, or nutritionist. Consider building a client base at gyms or starting your own practice.",
                        isResult: true,
                        icon: "fas fa-running",
                        color: 2
                    },
                    "adventure_result": {
                        title: "Adventure Guide",
                        description: "Turn adventure into a career! Consider certifications in outdoor leadership, wilderness first aid, or specific activities like rock climbing or scuba diving. Tour companies often hire experienced guides.",
                        isResult: true,
                        icon: "fas fa-mountain",
                        color: 3
                    }
                }
            },
            2: { // Travel Destination Chooser
                name: "Travel Destination Chooser",
                color: "#c9e4ff",
                startNode: "travel_start",
                nodes: {
                    "travel_start": {
                        title: "Travel Destination Chooser",
                        description: "Let's find your perfect vacation! What type of experience are you looking for?",
                        choices: [
                            { text: "Relaxation & Beaches", next: "beach_path", color: 1 },
                            { text: "Adventure & Exploration", next: "adventure_path", color: 2 },
                            { text: "Cultural Immersion", next: "culture_path", color: 3 },
                            { text: "City Life & Entertainment", next: "city_path", color: 4 }
                        ]
                    },
                    // Additional nodes for tree 2...
                }
            },
            3: { // Learning Path Advisor
                name: "Learning Path Advisor",
                color: "#d6f5d6",
                startNode: "learning_start",
                nodes: {
                    "learning_start": {
                        title: "Learning Path Advisor",
                        description: "Let's find the best learning path for your goals! What do you want to achieve?",
                        choices: [
                            { text: "Career Advancement", next: "career_learning", color: 1 },
                            { text: "Personal Enrichment", next: "personal_learning", color: 2 },
                            { text: "Skill Development", next: "skill_learning", color: 3 }
                        ]
                    },
                    // Additional nodes for tree 3...
                }
            },
            4: { // Weekend Activity Planner
                name: "Weekend Activity Planner",
                color: "#fff3cd",
                startNode: "weekend_start",
                nodes: {
                    "weekend_start": {
                        title: "Weekend Activity Planner",
                        description: "Plan your perfect weekend! What's the weather like and how are you feeling?",
                        choices: [
                            { text: "Sunny & Energetic", next: "sunny_path", color: 1 },
                            { text: "Rainy & Cozy", next: "rainy_path", color: 2 },
                            { text: "Just Right & Balanced", next: "balanced_path", color: 3 }
                        ]
                    },
                    // Additional nodes for tree 4...
                }
            },
            5: { // Personal Growth Guide
                name: "Personal Growth Guide",
                color: "#f0d9ff",
                startNode: "growth_start",
                nodes: {
                    "growth_start": {
                        title: "Personal Growth Guide",
                        description: "Explore paths for personal development! What area would you like to focus on?",
                        choices: [
                            { text: "Mindfulness & Mental Wellbeing", next: "mindfulness_path", color: 1 },
                            { text: "Physical Health & Fitness", next: "fitness_path", color: 2 },
                            { text: "Relationships & Social Skills", next: "relationships_path", color: 3 },
                            { text: "Productivity & Goals", next: "productivity_path", color: 4 }
                        ]
                    },
                    // Additional nodes for tree 5...
                }
            }
        };

        // State variables
        let currentTreeId = 1;
        let currentNodeId = "career_start";
        let decisionHistory = [];
        let decisionsMade = 0;
        let pathsCompleted = 0;
        let currentTheme = 1;

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Load initial tree
            loadTree(currentTreeId);
            
            // Set up tree selection
            document.querySelectorAll('.tree-option').forEach(option => {
                option.addEventListener('click', function() {
                    const treeId = parseInt(this.dataset.tree);
                    if (treeId !== currentTreeId) {
                        selectTree(treeId);
                    }
                });
            });
            
            // Set up result buttons
            tryAnotherBtn.addEventListener('click', tryAnotherPath);
            resetTreeBtn.addEventListener('click', resetCurrentTree);
            
            // Update stats
            updateStats();
            
            // Initialize tree visualization
            updateTreeVisualization();
        });

        // Load a decision tree
        function loadTree(treeId) {
            currentTreeId = treeId;
            currentNodeId = decisionTrees[treeId].startNode;
            decisionHistory = [];
            
            // Update active tree in UI
            document.querySelectorAll('.tree-option').forEach(option => {
                option.classList.remove('active');
                if (parseInt(option.dataset.tree) === treeId) {
                    option.classList.add('active');
                }
            });
            
            // Update current node
            updateCurrentNode();
            
            // Hide result container
            resultContainer.classList.remove('show');
            
            // Update path display
            updatePathDisplay();
            
            // Update stats
            currentTree.textContent = treeId;
        }

        // Update current node display
        function updateCurrentNode() {
            const tree = decisionTrees[currentTreeId];
            const node = tree.nodes[currentNodeId];
            
            if (!node) return;
            
            // Update node content
            nodeTitle.textContent = node.title;
            nodeDescription.textContent = node.description;
            
            // Update choices
            choicesContainer.innerHTML = '';
            
            if (node.choices) {
                node.choices.forEach((choice, index) => {
                    const choiceBtn = document.createElement('button');
                    choiceBtn.className = `choice-btn choice-${choice.color}`;
                    choiceBtn.textContent = choice.text;
                    choiceBtn.dataset.next = choice.next;
                    
                    choiceBtn.addEventListener('click', function() {
                        makeDecision(choice.next, choice.text);
                    });
                    
                    choicesContainer.appendChild(choiceBtn);
                });
            }
            
            // If this is a result node
            if (node.isResult) {
                showResult(node);
            }
            
            // Add current node to history if not already there
            if (!decisionHistory.some(step => step.nodeId === currentNodeId)) {
                decisionHistory.push({
                    nodeId: currentNodeId,
                    title: node.title,
                    choice: null
                });
            }
            
            // Update path display
            updatePathDisplay();
            
            // Update tree visualization
            updateTreeVisualization();
        }

        // Make a decision and move to next node
        function makeDecision(nextNodeId, choiceText) {
            // Record the choice in history
            const currentIndex = decisionHistory.findIndex(step => step.nodeId === currentNodeId);
            if (currentIndex !== -1) {
                decisionHistory[currentIndex].choice = choiceText;
            }
            
            // Move to next node
            currentNodeId = nextNodeId;
            
            // Update decision count
            decisionsMade++;
            
            // Update current node display
            updateCurrentNode();
            
            // Update stats
            updateStats();
        }

        // Show result
        function showResult(node) {
            // Hide choices
            choicesContainer.innerHTML = '';
            
            // Update result display
            resultIcon.innerHTML = `<i class="${node.icon || 'fas fa-flag-checkered'}"></i>`;
            resultTitle.textContent = node.title;
            resultDescription.textContent = node.description;
            
            // Show result container
            resultContainer.classList.add('show');
            
            // Update paths completed
            pathsCompleted++;
            updateStats();
        }

        // Update path display
        function updatePathDisplay() {
            // Update path steps
            pathSteps.innerHTML = '';
            
            decisionHistory.forEach(step => {
                const stepElement = document.createElement('div');
                stepElement.className = 'path-step';
                stepElement.textContent = step.title.substring(0, 20) + (step.title.length > 20 ? '...' : '');
                pathSteps.appendChild(stepElement);
            });
            
            // Update visual path
            visualPath.innerHTML = '';
            
            decisionHistory.forEach((step, index) => {
                const pathNode = document.createElement('div');
                pathNode.className = 'path-node';
                pathNode.textContent = index + 1;
                pathNode.style.backgroundColor = getColorByIndex(index);
                visualPath.appendChild(pathNode);
            });
            
            // Add current node if it's not in history yet
            if (!decisionHistory.some(step => step.nodeId === currentNodeId)) {
                const tree = decisionTrees[currentTreeId];
                const node = tree.nodes[currentNodeId];
                
                if (node) {
                    const pathNode = document.createElement('div');
                    pathNode.className = 'path-node';
                    pathNode.textContent = decisionHistory.length + 1;
                    pathNode.style.backgroundColor = getColorByIndex(decisionHistory.length);
                    visualPath.appendChild(pathNode);
                }
            }
        }

        // Update tree visualization
        function updateTreeVisualization() {
            treeVisual.innerHTML = '';
            
            // Create a simple visualization of the tree structure
            const tree = decisionTrees[currentTreeId];
            
            // Only show a few levels for visualization
            const maxLevels = 3;
            let currentLevel = 0;
            
            function createLevel(nodeId, level, parentX = 50) {
                if (level >= maxLevels) return;
                
                const node = tree.nodes[nodeId];
                if (!node) return;
                
                // Create node element
                const nodeElement = document.createElement('div');
                nodeElement.className = `branch-node ${nodeId === currentNodeId ? 'active' : ''}`;
                nodeElement.textContent = level + 1;
                nodeElement.style.backgroundColor = getColorByIndex(level);
                nodeElement.style.position = 'absolute';
                nodeElement.style.left = `${parentX}%`;
                nodeElement.style.top = `${level * 80}px`;
                
                nodeElement.addEventListener('click', () => {
                    // For visualization only - in a full implementation, 
                    // this would navigate to that node
                    alert(`This node represents: ${node.title}`);
                });
                
                treeVisual.appendChild(nodeElement);
                
                // If node has choices, create branches
                if (node.choices && level < maxLevels - 1) {
                    const choiceCount = node.choices.length;
                    
                    node.choices.forEach((choice, index) => {
                        // Calculate position for child nodes
                        const spread = 30;
                        const childX = parentX + ((index - (choiceCount - 1) / 2) * spread);
                        
                        // Create line to child
                        const line = document.createElement('div');
                        line.style.position = 'absolute';
                        line.style.left = `${parentX}%`;
                        line.style.top = `${level * 80 + 40}px`;
                        line.style.width = '2px';
                        line.style.height = '40px';
                        line.style.backgroundColor = '#ccc';
                        line.style.transform = `translate(${(childX - parentX) / 2}%, 0)`;
                        line.style.transformOrigin = 'top center';
                        
                        treeVisual.appendChild(line);
                        
                        // Recursively create child nodes
                        createLevel(choice.next, level + 1, childX);
                    });
                }
            }
            
            // Start visualization from start node
            createLevel(tree.startNode, 0);
            
            // Set tree visual height based on levels
            treeVisual.style.minHeight = `${maxLevels * 100}px`;
        }

        // Try another path in current tree
        function tryAnotherPath() {
            // Go back to start but keep stats
            currentNodeId = decisionTrees[currentTreeId].startNode;
            decisionHistory = [];
            updateCurrentNode();
            resultContainer.classList.remove('show');
        }

        // Reset current tree
        function resetCurrentTree() {
            loadTree(currentTreeId);
            decisionsMade = 0;
            updateStats();
        }

        // Select a different tree
        function selectTree(treeId) {
            if (confirm("Switch to a different decision tree? Your current progress will be lost.")) {
                loadTree(treeId);
                decisionsMade = 0;
                updateStats();
            }
        }

        // Update statistics
        function updateStats() {
            decisionsCount.textContent = decisionsMade;
            pathsExplored.textContent = pathsCompleted;
        }

        // Change color theme
        function changeColorTheme(theme) {
            currentTheme = theme;
            
            // Update header background based on theme
            const header = document.querySelector('header');
            const pastelColors = ['#ffd6d6', '#c9e4ff', '#d6f5d6', '#fff3cd', '#f0d9ff'];
            const darkColors = ['#ff6b8b', '#5a8fc2', '#5a9e5a', '#b38f00', '#8a66aa'];
            
            header.style.backgroundColor = pastelColors[theme - 1];
            header.style.borderColor = darkColors[theme - 1];
            
            // Update section titles
            document.querySelectorAll('.section-title').forEach(title => {
                title.style.color = darkColors[theme - 1];
            });
            
            // Update current node
            const currentNode = document.getElementById('currentNode');
            currentNode.style.backgroundColor = pastelColors[theme - 1];
            currentNode.style.borderColor = darkColors[theme - 1];
            
            // Update node title
            nodeTitle.style.color = darkColors[theme - 1];
        }

        // Get color by index
        function getColorByIndex(index) {
            const pastelColors = ['#ffd6d6', '#c9e4ff', '#d6f5d6', '#fff3cd', '#f0d9ff'];
            return pastelColors[index % pastelColors.length];
        }

        // Initialize with tree 1
        loadTree(1);