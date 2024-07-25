"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false); // check if user is in submitting state
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const session = useSession(); // to check if user is login or not
  const router = useRouter();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true); // while submitting the form we set the submitting to true

    try {
      // Making the post fetch call for create prompt
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
      // When submitting is done finally reset the submitting state to false
      setSubmitting(false);
    }
  };
  return (
    <div className="">
      {/* Form component displays the front end */}
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
