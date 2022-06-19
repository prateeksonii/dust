import type { NextPage } from "next";
import { useRef } from "react";
import { trpc } from "../utils/trpc";

const CreateQuestionPage: NextPage = () => {
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
    <div className="mx-auto w-3/5 py-8">
      <h1 className="mb-4 text-4xl font-bold">Create a question</h1>
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
    </div>
  );
};

export default CreateQuestionPage;
