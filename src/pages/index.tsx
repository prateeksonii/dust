import type { NextPage } from "next";
import { useRef } from "react";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
  const client = trpc.useContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      client.invalidateQueries("questions.get-all");
      if (!inputRef.current) {
        return;
      }
      inputRef.current.value = "";
    },
  });

  return (
    <input
      ref={inputRef}
      type="text"
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({ question: event.currentTarget.value });
        }
      }}
    />
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex flex-col">
        <h1 className="text-4xl font-extrabold tracking-tight">Questions:</h1>
        {data.map((question) => {
          return <div key={question.id}>{question.question}</div>;
        })}
      </div>
      <QuestionCreator />
    </div>
  );
};

export default Home;
