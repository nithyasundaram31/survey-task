import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import responseServices from "../../services/responseServices";
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ResultBarchartPage() {
  const { id } = useParams();
  const [resultBarchart, setResultBarchart] = useState(null);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await responseServices.getSurveyResult(id);
        setResultBarchart(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchResponse();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="mx-auto w-full md:w-[70%] mt-20 p-6 shadow-md">
        {resultBarchart &&
          Object.values(resultBarchart).map((q, index) => {
            // 🔥 Convert answers to chart format
            const chartData = q.options.map(option => ({
              name: option,
              count: q.answers[option] || 0
            }));

            return (
              <div key={index} className="mb-12">
                <h2 className="font-bold text-lg mb-1">
                  {index + 1}. {q.questionText}
                </h2>

                <p className="text-blue-600 mb-4">
                  Total Responses: {q.totalResponses}
                </p>

                {/* GRAPH */}
                <ResponsiveContainer className='flex justify-center items-center ' width="50%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ResultBarchartPage;
