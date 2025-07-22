import React from "react";
import { POSTS_QUERYResult } from "../../../../sanity.types";
import Link from "next/link";

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <div className="grid grid-cols-2">
      {posts.map((post) => (
        <Link href={"/post/" + post.slug?.current} key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.slug?.current}</p>
        </Link>
      ))}
    </div>
  );
}
