import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Plus, Trash2, Edit, GripVertical, Clock, Award } from 'lucide-react';

export function QuizBuilder() {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  
  const questions = [
    { id: 1, type: 'Multiple Choice', question: 'What is a React Hook?', points: 10, options: 4 },
    { id: 2, type: 'True/False', question: 'React is a JavaScript framework', points: 5, options: 2 },
    { id: 3, type: 'Short Answer', question: 'Explain the virtual DOM', points: 15, options: 0 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Quiz Builder</h1>
          <p className="text-gray-600">Create and manage course assessments</p>
        </div>
        <Button variant="primary" onClick={() => setShowAddQuestion(true)}>
          <Plus className="w-5 h-5" />
          Add Question
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3>Advanced React Quiz</h3>
                <p className="text-sm text-gray-600 mt-1">12 questions • 100 points • 45 min</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">Preview</Button>
                <Button variant="primary" size="sm">Publish</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questions.map((q, index) => (
                <div key={q.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                  <div className="flex items-start gap-3">
                    <GripVertical className="w-5 h-5 text-gray-400 mt-1 cursor-move" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-600">Q{index + 1}</span>
                            <Badge variant="info">{q.type}</Badge>
                            <Badge variant="default">{q.points} pts</Badge>
                          </div>
                          <p className="text-sm">{q.question}</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-gray-200 rounded-lg">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded-lg">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      {q.options > 0 && (
                        <p className="text-xs text-gray-500">{q.options} answer options</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3>Quiz Settings</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input label="Quiz Title" defaultValue="Advanced React Quiz" />
                <Input label="Time Limit (minutes)" type="number" defaultValue="45" />
                <Input label="Passing Score (%)" type="number" defaultValue="70" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Randomize Questions</span>
                  <input type="checkbox" className="w-4 h-4 rounded" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Show Results Immediately</span>
                  <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3>Statistics</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Attempts</span>
                  <span className="text-sm">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Score</span>
                  <span className="text-sm">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pass Rate</span>
                  <span className="text-sm text-green-600">85%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Modal
        isOpen={showAddQuestion}
        onClose={() => setShowAddQuestion(false)}
        title="Add New Question"
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowAddQuestion(false)}>Cancel</Button>
            <Button variant="primary">Add Question</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Question Type</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none">
              <option>Multiple Choice</option>
              <option>True/False</option>
              <option>Short Answer</option>
              <option>Essay</option>
            </select>
          </div>
          <TextArea label="Question" placeholder="Enter your question..." rows={3} />
          <Input label="Points" type="number" defaultValue="10" />
        </div>
      </Modal>
    </div>
  );
}
