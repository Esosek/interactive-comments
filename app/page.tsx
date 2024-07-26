"use client";
import CommentList from "@/components/comments/CommentList";
import styles from "./page.module.css";
import { useUserStore } from "@/stores/userStore";

export default function Home() {
  const loggedUser = useUserStore((state) => state.loggedUser);
  return (
    <main>
      <CommentList />
    </main>
  );
}
