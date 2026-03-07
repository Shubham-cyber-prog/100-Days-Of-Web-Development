/**
 * Resource Recommendation Engine
 * Provides personalized learning resources based on user progress and preferences
 */

import { progressServiceAPI } from './progressService.js';

class RecommendationEngine {
  constructor() {
    this.resources = {
      html: {
        beginner: [
          {
            title: 'MDN Web Docs - HTML Basics',
            type: 'documentation',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
            description: 'Comprehensive guide to HTML fundamentals from MDN',
            difficulty: 'beginner',
            estimatedTime: '2 hours',
            topics: ['html', 'structure', 'elements']
          },
          {
            title: 'W3Schools HTML Tutorial',
            type: 'tutorial',
            url: 'https://www.w3schools.com/html/',
            description: 'Interactive HTML tutorial with examples',
            difficulty: 'beginner',
            estimatedTime: '3 hours',
            topics: ['html', 'forms', 'tables']
          },
          {
            title: 'HTML5 Semantic Elements Guide',
            type: 'article',
            url: 'https://css-tricks.com/semantic-html-meaning/',
            description: 'Understanding semantic HTML elements',
            difficulty: 'beginner',
            estimatedTime: '30 minutes',
            topics: ['html5', 'semantic', 'accessibility']
          }
        ],
        intermediate: [
          {
            title: 'Advanced HTML Forms',
            type: 'tutorial',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms',
            description: 'Deep dive into HTML form validation and accessibility',
            difficulty: 'intermediate',
            estimatedTime: '2 hours',
            topics: ['forms', 'validation', 'accessibility']
          },
          {
            title: 'HTML Media Elements',
            type: 'article',
            url: 'https://developer.mozilla.org/en-US/docs/Web/Media',
            description: 'Working with audio, video, and other media',
            difficulty: 'intermediate',
            estimatedTime: '1 hour',
            topics: ['media', 'video', 'audio']
          }
        ],
        advanced: [
          {
            title: 'HTML Accessibility Best Practices',
            type: 'documentation',
            url: 'https://www.w3.org/WAI/tutorials/html/',
            description: 'Creating accessible HTML content',
            difficulty: 'advanced',
            estimatedTime: '3 hours',
            topics: ['accessibility', 'a11y', 'wcag']
          }
        ]
      },
      css: {
        beginner: [
          {
            title: 'CSS Basics - MDN',
            type: 'documentation',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS',
            description: 'Introduction to CSS styling',
            difficulty: 'beginner',
            estimatedTime: '2 hours',
            topics: ['css', 'selectors', 'properties']
          },
          {
            title: 'Flexbox Guide',
            type: 'tutorial',
            url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
            description: 'Complete guide to CSS Flexbox',
            difficulty: 'beginner',
            estimatedTime: '1 hour',
            topics: ['flexbox', 'layout', 'responsive']
          }
        ],
        intermediate: [
          {
            title: 'CSS Grid Layout',
            type: 'tutorial',
            url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
            description: 'Master CSS Grid for complex layouts',
            difficulty: 'intermediate',
            estimatedTime: '2 hours',
            topics: ['grid', 'layout', 'responsive']
          },
          {
            title: 'CSS Animations',
            type: 'tutorial',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations',
            description: 'Creating smooth CSS animations',
            difficulty: 'intermediate',
            estimatedTime: '1.5 hours',
            topics: ['animation', 'transitions', 'keyframes']
          }
        ],
        advanced: [
          {
            title: 'CSS Custom Properties',
            type: 'article',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties',
            description: 'Advanced CSS variables and theming',
            difficulty: 'advanced',
            estimatedTime: '1 hour',
            topics: ['variables', 'theming', 'advanced']
          }
        ]
      },
      javascript: {
        beginner: [
          {
            title: 'JavaScript Basics - MDN',
            type: 'documentation',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript',
            description: 'Fundamental JavaScript concepts',
            difficulty: 'beginner',
            estimatedTime: '3 hours',
            topics: ['javascript', 'basics', 'syntax']
          },
          {
            title: 'JavaScript.info Tutorial',
            type: 'tutorial',
            url: 'https://javascript.info/',
            description: 'Comprehensive JavaScript tutorial with exercises',
            difficulty: 'beginner',
            estimatedTime: '10 hours',
            topics: ['javascript', 'tutorial', 'exercises']
          }
        ],
        intermediate: [
          {
            title: 'ES6+ Features',
            type: 'article',
            url: 'https://es6-features.org/',
            description: 'Modern JavaScript features (ES6+)',
            difficulty: 'intermediate',
            estimatedTime: '2 hours',
            topics: ['es6', 'modern', 'features']
          },
          {
            title: 'Async JavaScript',
            type: 'tutorial',
            url: 'https://javascript.info/async',
            description: 'Promises, async/await, and callbacks',
            difficulty: 'intermediate',
            estimatedTime: '3 hours',
            topics: ['async', 'promises', 'await']
          }
        ],
        advanced: [
          {
            title: 'JavaScript Design Patterns',
            type: 'article',
            url: 'https://www.patterns.dev/posts/javascript-patterns/',
            description: 'Common design patterns in JavaScript',
            difficulty: 'advanced',
            estimatedTime: '4 hours',
            topics: ['patterns', 'architecture', 'advanced']
          }
        ]
      },
      frameworks: {
        beginner: [
          {
            title: 'React Official Tutorial',
            type: 'tutorial',
            url: 'https://react.dev/learn',
            description: 'Official React getting started guide',
            difficulty: 'beginner',
            estimatedTime: '3 hours',
            topics: ['react', 'components', 'hooks']
          }
        ],
        intermediate: [
          {
            title: 'Next.js Documentation',
            type: 'documentation',
            url: 'https://nextjs.org/docs',
            description: 'Full-stack React framework guide',
            difficulty: 'intermediate',
            estimatedTime: '4 hours',
            topics: ['nextjs', 'ssr', 'routing']
          }
        ],
        advanced: [
          {
            title: 'State Management',
            type: 'article',
            url: 'https://www.patterns.dev/posts/react-state-management-patterns/',
            description: 'Advanced state management patterns',
            difficulty: 'advanced',
            estimatedTime: '3 hours',
            topics: ['state', 'redux', 'context']
          }
        ]
      },
      projects: {
        beginner: [
          {
            title: 'Build a Personal Portfolio',
            type: 'project',
            url: '#',
            description: 'Create your first portfolio website with HTML and CSS',
            difficulty: 'beginner',
            estimatedTime: '4 hours',
            topics: ['html', 'css', 'layout']
          },
          {
            title: 'Todo List App',
            type: 'project',
            url: '#',
            description: 'Build a functional todo list with JavaScript',
            difficulty: 'beginner',
            estimatedTime: '3 hours',
            topics: ['javascript', 'dom', 'events']
          }
        ],
        intermediate: [
          {
            title: 'Weather App',
            type: 'project',
            url: '#',
            description: 'Fetch real weather data from an API',
            difficulty: 'intermediate',
            estimatedTime: '5 hours',
            topics: ['api', 'fetch', 'json']
          },
          {
            title: 'E-commerce Product Card',
            type: 'project',
            url: '#',
            description: 'Create beautiful product cards with CSS',
            difficulty: 'intermediate',
            estimatedTime: '3 hours',
            topics: ['css', 'flexbox', 'design']
          }
        ],
        advanced: [
          {
            title: 'Full-stack Blog',
            type: 'project',
            url: '#',
            description: 'Build a complete blog with backend',
            difficulty: 'advanced',
            estimatedTime: '15 hours',
            topics: ['fullstack', 'database', 'api']
          }
        ]
      }
    };

    this.learningPaths = [
      {
        name: 'Frontend Developer',
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30],
        description: 'Learn HTML, CSS, and JavaScript fundamentals',
        resources: ['html', 'css', 'javascript']
      },
      {
        name: 'React Developer',
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 40, 41, 42, 43, 44],
        description: 'Master React and modern JavaScript',
        resources: ['javascript', 'frameworks']
      },
      {
        name: 'Full Stack Developer',
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 40, 41, 42, 60, 61, 62],
        description: 'Build complete web applications',
        resources: ['html', 'css', 'javascript', 'frameworks']
      }
    ];
  }

  /**
   * Get recommendations based on user progress
   * @returns {Promise<Object>} Personalized recommendations
   */
  async getRecommendations() {
    const progressData = progressServiceAPI.getProgressData();
    const completedDays = progressData.completedDays || [];
    const completionPercentage = progressData.completionPercentage || 0;

    const recommendations = {
      basedOnProgress: this.getProgressBasedRecommendations(completedDays, completionPercentage),
      similarTopics: this.getSimilarTopicRecommendations(completedDays),
      externalResources: this.getExternalResources(),
      learningPaths: this.getLearningPathRecommendations(completedDays),
      nextSteps: this.getNextStepsRecommendations(completedDays, completionPercentage)
    };

    return recommendations;
  }

  /**
   * Get recommendations based on current progress
   */
  getProgressBasedRecommendations(completedDays, completionPercentage) {
    let recommendations = [];

    if (completionPercentage < 10) {
      recommendations = [
        ...this.resources.html.beginner.slice(0, 2),
        ...this.resources.css.beginner.slice(0, 1)
      ];
    } else if (completionPercentage < 30) {
      recommendations = [
        ...this.resources.html.intermediate.slice(0, 1),
        ...this.resources.css.beginner.slice(0, 2),
        ...this.resources.javascript.beginner.slice(0, 2)
      ];
    } else if (completionPercentage < 50) {
      recommendations = [
        ...this.resources.css.intermediate.slice(0, 2),
        ...this.resources.javascript.beginner.slice(0, 1),
        ...this.resources.javascript.intermediate.slice(0, 1),
        ...this.resources.projects.beginner.slice(0, 2)
      ];
    } else if (completionPercentage < 70) {
      recommendations = [
        ...this.resources.css.advanced.slice(0, 1),
        ...this.resources.javascript.intermediate.slice(0, 2),
        ...this.resources.projects.intermediate.slice(0, 2)
      ];
    } else {
      recommendations = [
        ...this.resources.javascript.advanced.slice(0, 2),
        ...this.resources.frameworks.beginner.slice(0, 1),
        ...this.resources.projects.intermediate.slice(0, 2),
        ...this.resources.projects.advanced.slice(0, 1)
      ];
    }

    return recommendations.map(r => ({
      ...r,
      reason: 'Based on your current progress'
    }));
  }

  /**
   * Get recommendations based on similar topics
   */
  getSimilarTopicRecommendations(completedDays) {
    const recommendations = [];

    if (completedDays.some(day => day >= 1 && day <= 10)) {
      recommendations.push(...this.resources.html.intermediate.slice(0, 2));
    }

    if (completedDays.some(day => day >= 11 && day <= 20)) {
      recommendations.push(...this.resources.css.intermediate.slice(0, 2));
    }

    if (completedDays.some(day => day >= 21 && day <= 30)) {
      recommendations.push(...this.resources.javascript.beginner.slice(0, 2));
    }

    if (completedDays.some(day => day >= 40 && day <= 50)) {
      recommendations.push(...this.resources.frameworks.beginner.slice(0, 1));
    }

    return recommendations.map(r => ({
      ...r,
      reason: 'Similar to topics you\'ve completed'
    }));
  }

  /**
   * Get external resource recommendations
   */
  getExternalResources() {
    return [
      {
        title: 'freeCodeCamp',
        type: 'platform',
        url: 'https://www.freecodecamp.org/',
        description: 'Free coding bootcamp with certifications',
        difficulty: 'all',
        estimatedTime: '300 hours',
        topics: ['all', 'certification', 'free']
      },
      {
        title: 'Codecademy',
        type: 'platform',
        url: 'https://www.codecademy.com/',
        description: 'Interactive coding lessons',
        difficulty: 'all',
        estimatedTime: '200 hours',
        topics: ['all', 'interactive', 'beginner-friendly']
      },
      {
        title: 'Frontend Masters',
        type: 'platform',
        url: 'https://frontendmasters.com/',
        description: 'Advanced web development courses',
        difficulty: 'advanced',
        estimatedTime: '150 hours',
        topics: ['advanced', 'professional', 'courses']
      },
      {
        title: 'YouTube - Web Dev Simplified',
        type: 'video',
        url: 'https://www.youtube.com/c/WebDevSimplified',
        description: 'Web development tutorials and tips',
        difficulty: 'all',
        estimatedTime: '100 hours',
        topics: ['video', 'tutorials', 'tips']
      },
      {
        title: 'CSS Tricks',
        type: 'blog',
        url: 'https://css-tricks.com/',
        description: 'Daily articles about web development',
        difficulty: 'all',
        estimatedTime: '50 hours',
        topics: ['css', 'articles', 'tips']
      }
    ];
  }

  /**
   * Get learning path recommendations
   */
  getLearningPathRecommendations(completedDays) {
    return this.learningPaths.map(path => {
      const pathProgress = this.calculatePathProgress(completedDays, path.days);
      return {
        ...path,
        progress: pathProgress,
        recommended: pathProgress < 50
      };
    });
  }

  /**
   * Calculate progress for a learning path
   */
  calculatePathProgress(completedDays, pathDays) {
    const completed = pathDays.filter(day => completedDays.includes(day)).length;
    return Math.round((completed / pathDays.length) * 100);
  }

  /**
   * Get next steps recommendations
   */
  getNextStepsRecommendations(completedDays, completionPercentage) {
    const nextSteps = [];

    if (completionPercentage < 10) {
      nextSteps.push({
        title: 'Complete Day 1-10',
        description: 'Master HTML fundamentals',
        action: 'Continue with Day 1',
        priority: 'high'
      });
    } else if (completionPercentage < 30) {
      nextSteps.push({
        title: 'Learn CSS Fundamentals',
        description: 'Start Day 11-20 to master CSS styling',
        action: 'Start Day 11',
        priority: 'high'
      });
    } else if (completionPercentage < 50) {
      nextSteps.push({
        title: 'JavaScript Essentials',
        description: 'Learn JavaScript with Day 21-30',
        action: 'Start Day 21',
        priority: 'high'
      });
    } else if (completionPercentage < 70) {
      nextSteps.push({
        title: 'Build Projects',
        description: 'Apply your skills with project challenges',
        action: 'View Projects',
        priority: 'medium'
      });
    } else {
      nextSteps.push({
        title: 'Learn React',
        description: 'Master modern frontend frameworks',
        action: 'Start React Tutorial',
        priority: 'high'
      });
    }

    return nextSteps;
  }

  /**
   * Search resources by topic or keyword
   */
  searchResources(query) {
    const results = [];
    const searchTerms = query.toLowerCase().split(' ');

    Object.keys(this.resources).forEach(category => {
      Object.keys(this.resources[category]).forEach(level => {
        this.resources[category][level].forEach(resource => {
          const relevance = this.calculateRelevance(resource, searchTerms);
          if (relevance > 0) {
            results.push({
              ...resource,
              category: category,
              level: level,
              relevance: relevance
            });
          }
        });
      });
    });

    return results.sort((a, b) => b.relevance - a.relevance);
  }

  /**
   * Calculate relevance of a resource to search terms
   */
  calculateRelevance(resource, searchTerms) {
    let relevance = 0;
    const searchText = `${resource.title} ${resource.description} ${resource.topics.join(' ')}`.toLowerCase();

    searchTerms.forEach(term => {
      if (searchText.includes(term)) {
        relevance += 1;
        if (resource.title.toLowerCase().includes(term)) {
          relevance += 2;
        }
      }
    });

    return relevance;
  }
}

export default new RecommendationEngine();
