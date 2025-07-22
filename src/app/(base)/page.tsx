import { Posts } from "@/components/organisms/home/Posts";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries/homeQueries";

export default async function Home() {
  const {data:posts} = await sanityFetch({
    query:POSTS_QUERY
  })

  return (
     <Posts posts={posts} />
  );
}
