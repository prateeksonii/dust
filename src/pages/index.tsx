import type { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-by-owner"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="mx-auto w-3/5 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Your questions:
        </h1>
        <Link href="/create">
          <a className="mt-8 w-max rounded bg-indigo-800 py-2 px-4 text-xl">
            Create a question
          </a>
        </Link>

        <h2 className="mt-8 text-3xl font-bold tracking-tight">History</h2>
        <ul className="mt-4 list-disc">
          {data.map((question) => {
            return (
              <li key={question.id}>
                <Link href={`/question/${question.id}`} passHref>
                  <a className="mt-2 text-xl font-bold">{question.question}</a>
                </Link>
                <div>Created at {question.createdAt.toDateString()}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
