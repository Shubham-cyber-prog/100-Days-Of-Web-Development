import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Lightbulb, Brain, CheckCircle, XCircle } from "lucide-react";
import { planetsData, quizQuestions } from "../data/planetsData";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface EducationalModeProps {
  onBack: () => void;
}

export function EducationalMode({ onBack }: EducationalModeProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const allFunFacts = planetsData.flatMap((planet) =>
    planet.funFacts.map((fact) => ({ planet: planet.name, fact }))
  );

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F1A] via-[#141B2E] to-[#1A1F35] py-8 px-4">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-4 border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            <h1 className="text-3xl md:text-4xl text-white">Educational Mode</h1>
          </div>
          <p className="text-center text-gray-400">
            Learn fascinating facts about our solar system
          </p>
        </div>

        {!showQuiz ? (
          <>
            {/* Fun Facts Grid */}
            <motion.div
              className="grid md:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {allFunFacts.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Lightbulb className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm text-purple-400 mb-1">
                          {item.planet}
                        </h3>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          {item.fact}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Quiz button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={() => setShowQuiz(true)}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 shadow-[0_0_30px_rgba(168,85,247,0.5)]"
              >
                <Brain className="mr-2 h-5 w-5" />
                Take the Quiz
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            {!quizCompleted ? (
              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                    <span>Score: {score}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          ((currentQuestion + 1) / quizQuestions.length) * 100
                        }%`,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h2 className="text-2xl text-white mb-6">
                  {quizQuestions[currentQuestion].question}
                </h2>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selectedAnswer === option
                          ? "border-purple-500 bg-purple-500/20 text-white"
                          : "border-white/20 bg-white/5 text-gray-300 hover:border-purple-500/50 hover:bg-white/10"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                {/* Next button */}
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion < quizQuestions.length - 1
                    ? "Next Question"
                    : "Finish Quiz"}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {/* Results */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {score >= quizQuestions.length * 0.7 ? (
                    <CheckCircle className="h-24 w-24 text-green-400 mx-auto mb-4" />
                  ) : (
                    <XCircle className="h-24 w-24 text-orange-400 mx-auto mb-4" />
                  )}
                </motion.div>

                <h2 className="text-3xl text-white mb-4">Quiz Completed!</h2>
                <p className="text-xl text-gray-300 mb-2">
                  Your Score: {score} / {quizQuestions.length}
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  {score >= quizQuestions.length * 0.7
                    ? "Excellent work! You're a solar system expert! 🌟"
                    : "Good effort! Keep learning about our amazing solar system! 🚀"}
                </p>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={onBack}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Back to Home
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
