import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery([
    "questions.get-by-id",
    {
      id,
    },
  ]);

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Question not found</div>;

  const { question, isOwner } = data;

  return (
    <div className="flex flex-col gap-2 p-6">
      {isOwner && (
        <div className="mb-8 rounded-md bg-indigo-600 p-3 text-2xl font-bold">
          You created it
        </div>
      )}

      <div className="text-2xl font-bold">{question?.question}</div>
      <div>
        {(question?.options as string[]).map((option, idx) => (
          <div key={idx}>{option}</div>
        ))}
      </div>
    </div>
  );
};

const QuestionPage: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") return <div>No id found</div>;

  return <QuestionPageContent id={id} />;
};

export default QuestionPage;
