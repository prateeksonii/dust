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

  return <div>{data?.question}</div>;
};

const QuestionPage: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") return <div>No id found</div>;

  return <QuestionPageContent id={id} />;
};

export default QuestionPage;
