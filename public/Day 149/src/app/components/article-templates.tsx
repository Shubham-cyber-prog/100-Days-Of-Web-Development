import React, { useState } from 'react';
import { FileText, Code, Book, Lightbulb, Bug, Rocket, X } from 'lucide-react';
import { Button } from './ui/button';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: typeof FileText;
  category: string;
  content: string;
}

interface ArticleTemplatesProps {
  onSelect: (content: string) => void;
  onClose: () => void;
}

export function ArticleTemplates({ onSelect, onClose }: ArticleTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: Template[] = [
    {
      id: 'how-to',
      name: 'How-To Guide',
      description: 'Step-by-step instructions for completing a task',
      icon: Book,
      category: 'Tutorial',
      content: `# How to [Task Name]

## Overview
Brief introduction explaining what this guide covers and why it's useful.

## Prerequisites
- Requirement 1
- Requirement 2
- Requirement 3

## Step 1: [First Step]
Detailed instructions for the first step.

## Step 2: [Second Step]
Detailed instructions for the second step.

## Step 3: [Third Step]
Detailed instructions for the third step.

## Troubleshooting
Common issues and their solutions:
- **Issue 1**: Solution
- **Issue 2**: Solution

## Next Steps
What to do after completing this guide.

## Related Articles
- [Related Article 1]
- [Related Article 2]`
    },
    {
      id: 'api-docs',
      name: 'API Documentation',
      description: 'Document API endpoints and usage',
      icon: Code,
      category: 'Technical',
      content: `# [API Name] API Documentation

## Overview
Brief description of the API and its purpose.

## Authentication
Explain authentication requirements and how to obtain credentials.

## Base URL
\`\`\`
https://api.example.com/v1
\`\`\`

## Endpoints

### GET /endpoint
Description of what this endpoint does.

**Parameters:**
- \`param1\` (string, required): Description
- \`param2\` (integer, optional): Description

**Example Request:**
\`\`\`bash
curl -X GET "https://api.example.com/v1/endpoint?param1=value"
\`\`\`

**Example Response:**
\`\`\`json
{
  "data": {},
  "status": "success"
}
\`\`\`

### POST /endpoint
Description of what this endpoint does.

**Request Body:**
\`\`\`json
{
  "field1": "value",
  "field2": "value"
}
\`\`\`

## Error Codes
- \`400\`: Bad Request
- \`401\`: Unauthorized
- \`404\`: Not Found
- \`500\`: Internal Server Error`
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting Guide',
      description: 'Help users solve common problems',
      icon: Bug,
      category: 'Support',
      content: `# Troubleshooting [Feature/Product Name]

## Common Issues

### Issue 1: [Problem Description]

**Symptoms:**
- Symptom A
- Symptom B

**Possible Causes:**
- Cause 1
- Cause 2

**Solution:**
1. Step 1
2. Step 2
3. Step 3

### Issue 2: [Problem Description]

**Symptoms:**
- Symptom A
- Symptom B

**Possible Causes:**
- Cause 1
- Cause 2

**Solution:**
1. Step 1
2. Step 2
3. Step 3

## Advanced Troubleshooting

### Diagnostic Steps
1. Check logs
2. Verify configuration
3. Test connectivity

## Still Need Help?
If none of these solutions work, please contact support with:
- Error messages
- Steps to reproduce
- System information`
    },
    {
      id: 'feature-announcement',
      name: 'Feature Announcement',
      description: 'Announce new features or updates',
      icon: Rocket,
      category: 'Announcement',
      content: `# Introducing [Feature Name]

## What's New
Brief overview of the new feature and its benefits.

## Key Features
- **Feature 1**: Description
- **Feature 2**: Description
- **Feature 3**: Description

## How to Use
Step-by-step guide on how to use the new feature:

1. Navigate to [location]
2. Click on [button/option]
3. Configure settings
4. Start using the feature

## Benefits
- Benefit 1
- Benefit 2
- Benefit 3

## Migration Guide
If applicable, explain how to migrate from old to new:
- What's changed
- What to update
- Backward compatibility

## Feedback
We'd love to hear your thoughts! Please share feedback at [contact/link].

## Learn More
- [Documentation Link]
- [Video Tutorial]
- [FAQ]`
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      description: 'Document recommended approaches and guidelines',
      icon: Lightbulb,
      category: 'Guidelines',
      content: `# Best Practices for [Topic]

## Overview
Introduction to the best practices and their importance.

## Key Principles
1. **Principle 1**: Explanation
2. **Principle 2**: Explanation
3. **Principle 3**: Explanation

## Do's and Don'ts

### ✅ Do:
- Recommendation 1
- Recommendation 2
- Recommendation 3

### ❌ Don't:
- Anti-pattern 1
- Anti-pattern 2
- Anti-pattern 3

## Examples

### Good Example
\`\`\`
Code or process example showing the right way
\`\`\`

### Bad Example
\`\`\`
Code or process example showing what to avoid
\`\`\`

## Common Pitfalls
- Pitfall 1 and how to avoid it
- Pitfall 2 and how to avoid it

## Additional Resources
- [Resource 1]
- [Resource 2]
- [Resource 3]`
    },
    {
      id: 'onboarding',
      name: 'Onboarding Guide',
      description: 'Welcome and onboard new users or team members',
      icon: FileText,
      category: 'Tutorial',
      content: `# Welcome to [Product/Team Name]

## Getting Started
Welcome! This guide will help you get up and running quickly.

## What You'll Need
- Item 1
- Item 2
- Item 3

## Setup Steps

### 1. Account Setup
Instructions for setting up your account.

### 2. Install Required Tools
- Tool 1
- Tool 2
- Tool 3

### 3. Configuration
How to configure your environment.

### 4. First Tasks
Recommended tasks to familiarize yourself:
- Task 1
- Task 2
- Task 3

## Important Resources
- [Documentation]
- [Team Directory]
- [Support Channel]

## Tips for Success
- Tip 1
- Tip 2
- Tip 3

## Questions?
Reach out to [contact] if you need help!`
    }
  ];

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const handleUseTemplate = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (template) {
      onSelect(template.content);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <FileText className="size-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Article Templates
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Start with a pre-built template
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Template List */}
          <div className="w-96 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4">
              {categories.map((category) => (
                <div key={category} className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {templates.filter(t => t.category === category).map((template) => {
                      const Icon = template.icon;
                      return (
                        <div
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          className={`p-4 rounded-lg border transition-all cursor-pointer ${
                            selectedTemplate === template.id
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              selectedTemplate === template.id
                                ? 'bg-indigo-100 dark:bg-indigo-900/40'
                                : 'bg-gray-100 dark:bg-gray-700'
                            }`}>
                              <Icon className={`size-5 ${
                                selectedTemplate === template.id
                                  ? 'text-indigo-600 dark:text-indigo-400'
                                  : 'text-gray-600 dark:text-gray-400'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                {template.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {template.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Preview */}
          <div className="flex-1 overflow-y-auto">
            {selectedTemplate ? (
              <div className="p-6">
                <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  {templates.find(t => t.id === selectedTemplate) && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {templates.find(t => t.id === selectedTemplate)?.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {templates.find(t => t.id === selectedTemplate)?.description}
                      </p>
                    </>
                  )}
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
                    {templates.find(t => t.id === selectedTemplate)?.content}
                  </pre>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleUseTemplate} className="gap-2">
                    <FileText className="size-4" />
                    Use This Template
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                <div className="text-center">
                  <FileText className="size-12 mx-auto mb-3 opacity-50" />
                  <p>Select a template to preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
