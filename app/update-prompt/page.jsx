"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false); // check if user is submitting
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  //   const router = useRouter();
  const searchParams = useSearchParams();

  const promptId = searchParams.get("id");

  // Here we want to get previous prompt to be able to change the current prompt
  useEffect(() => {
    // the useEffect depends on promptId which is id params of the update-prompt route
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      // updating the post
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    // Only call this function if promptId exists
    if (promptId) getPromptDetails();
  }, [promptId]);

  

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Checking if the promptId exists
    if(!promptId) alert("Prompt ID not found");

    // Making the post fetch call for create prompt
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default EditPrompt;
