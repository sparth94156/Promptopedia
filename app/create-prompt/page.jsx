"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false); // check if user is submitting
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const session = useSession();
  const router = useRouter();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Making the post fetch call for create prompt
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id, // to check for the session and store it (sessionId)
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="">
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default CreatePrompt;
