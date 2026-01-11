import { useState } from "react";
import Navbar from "../../components/Navbar";
import surveyServices from "../../services/surveyServices";
import { Link } from "react-router-dom";

function SurveyPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      questionType: "",
      options: [""],
    },
  ]);

  //  Qstn text change
  const handleQuestionText = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].questionText = value;
    setQuestions(updated);
  };

  //  Qstn type change
  const handleQuestionType = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].questionType = value;

    if (value === "mcq") {
      updated[qIndex].options = [""];
    } else {
      updated[qIndex].options = [];
    }

    setQuestions(updated);
  };

  // option
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };


  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);

  };

  // Add question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", questionType: "", options: [""] },
    ]);
  };


  const handleCreateSurvey = async (e) => {
    e.preventDefault();

    try {
      const response = await surveyServices.createSurvey({
        title,
        description,
        questions,
      });
      console.log("Survey created:", response.data);
    } catch (err) {
      console.log("survey created error:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mt-16 w-full md:w-[50%] mx-auto p-6 border">
        <h2 className="mb-4 text-lg font-bold">Create Survey</h2>

        <form onSubmit={handleCreateSurvey}>

          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mb-3" placeholder="Survey title" />

          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-4" placeholder="Description" />

          {/* Questions */}
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="border p-4 mb-4 rounded">
              <p className="font-medium mb-2">
                Question {qIndex + 1}
              </p>

              <input
                className="border p-2 w-full mb-2"
                placeholder="Enter question"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionText(qIndex, e.target.value)
                }
              />

              <select
                className="border p-2 w-full mb-2"
                value={q.questionType}
                onChange={(e) =>
                  handleQuestionType(qIndex, e.target.value)
                }
              >
                <option value="">Select type</option>
                <option value="mcq">Multiple Choice</option>
                <option value="text">Short Answer</option>
              </select>

              {/* Options */}
              {q.questionType === "mcq" &&
                q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    className="border p-2 w-full mb-2"
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(
                        qIndex,
                        optIndex,
                        e.target.value
                      )
                    }
                  />
                ))}

              {q.questionType === "mcq" && (
                <button type="button" onClick={() => addOption(qIndex)} className="text-blue-600 text-sm" >
                  + Add option
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addQuestion} className="bg-gray-200 p-2 rounded mb-4"  >
            + Add Question
          </button>

          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded" >Create Survey</button>
            <button type="button" className="bg-gray-200 p-2 rounded" ><Link to='/dashboard'> Cancel</Link> </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default SurveyPage;
