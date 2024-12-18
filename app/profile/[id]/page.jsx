// "use client";

// import { useState, useEffect, use } from 'react';
// import { useSearchParams } from 'next/navigation';

// import Profile from '@components/Profile';

//     const UserProfile = props => {
//         const params = use(props.params);
//         const searchParams = useSearchParams();
//         const userName = searchParams.get('name');

//         const [userPosts, setUserPosts] = useState([]);

//         useEffect(() => {
//             const fetchPosts = async () => {
//                 const response = await fetch(`/api/users/${params?.id}/posts`);
//                 const data = await response.json();

//                 setUserPosts(data);
//             };

//             if (params?.id) fetchPosts();
//         }, [params.id]);

//         return (
//           <Profile 
//               name={userName}
//               desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
//               data={userPosts}
//           />
//         );
//     };

// export default UserProfile;


"use client";

import React, { Suspense, useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

export const dynamic = "force-dynamic"; // Prevents static rendering

const UserProfileContent = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const { id } = use(params); // Unwrap the params Promise using React.use()

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };

    if (id) fetchPosts();
  }, [id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={userPosts}
    />
  );
};

export default function UserProfile(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfileContent params={props.params} />
    </Suspense>
  );
}

