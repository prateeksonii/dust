import type { NextPage } from "next";
import Link from "next/link";
import { useRef } from "react";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
  const client = trpc.useContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      client.invalidateQueries("questions.get-all-by-owner");
      if (!inputRef.current) {
        return;
      }
      inputRef.current.value = "";
    },
  });

  return (
    <input
      className="my-2 w-full rounded bg-zinc-600 p-2 text-2xl"
      ref={inputRef}
      type="text"
      disabled={isLoading}
      placeholder="Add a question"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({ question: event.currentTarget.value });
        }
      }}
    />
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-by-owner"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Questions:</h1>
        <QuestionCreator />
        <h2 className="mt-8 text-3xl font-bold tracking-tight">History</h2>
        {data.map((question) => {
          return (
            <Link key={question.id} href={`/question/${question.id}`} passHref>
              <a className="mt-2 text-xl">{question.question}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
