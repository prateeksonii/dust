import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
  const { mutate } = trpc.useMutation("questions.create");

  return (
    <input
      type="text"
      onSubmit={(event) => {
        console.log(event.currentTarget.value);
      }}
    />
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col p-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Questions:</h1>
      <div>{data[0]?.question}</div>
      <QuestionCreator />
    </div>
  );
};

export default Home;
