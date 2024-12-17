"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete}) => {

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) {
      return router.push('/profile');
    }

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between
      itens-start gap-5">
        <div className="flex-1 flex justify-start 
        items-center gap-3 cursor-pointer"
        onClick={handleProfileClick}
        >
          <Image 
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold
            text-gray-100">
              {post.creator.username}</h3>
            <p className="font-inter text-sm
            text-gray-400">
              {post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt
             ? "/assets/icons/tick.svg" 
             : "/assets/icons/copy.svg"
             }
             width={12}
             height={12}
             alt="copy_icon"
          />
        </div>
      </div>
      
      <p className="my-4 font-satoshi text-sm
      text-gray-200">{post.prompt}</p>
      <p className="font-inter text-sm orange_gradient 
      cursor-pointer"
      onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id &&
        pathName === '/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
            className="border border-gray-300 rounded-md p-2 hover:text-blue-500 hover:border-blue-500 transition-all duration-200 text-white"
        aria-label="Edit"
            onClick={handleEdit}
            >
              {/* Edit */}
              <PencilSquareIcon className="h-5 w-5" />
            </p>
            <p
            className="border border-gray-300 rounded-md p-2 hover:text-red-500 hover:border-red-500 transition-all duration-200 text-white"
        aria-label="Delete"
            onClick={handleDelete}
            >
              <TrashIcon className="h-5 w-5" />
            </p>
          </div>
        )}
    </div>
  )
}

export default PromptCard
