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

  return (
    <div className="p-6 flex flex-col gap-2">
      <div className="text-2xl font-bold">{data.question}</div>
      <div>
        {(data.options as string[]).map((option, idx) => (
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
