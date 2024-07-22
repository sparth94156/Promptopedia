"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const Myprofile = () => {
  const { data: session } = useSession(); // We get the session using useSession hook
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    // We fetch the data only when the we have the session
    if (session?.user.id) fetchPost();
  }, []);
  const handleEdit = () => {
     
  };

  const handleDelete = () => {};
  return (
    <div>
      {/* We are making a seperate profile component bcz we want to know whose profile are we seeing */}
      <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Myprofile;
