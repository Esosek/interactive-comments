"use client";
import styles from "./page.module.css";
import { useUserStore } from "@/stores/userStore";

export default function Home() {
  const loggedUser = useUserStore((state) => state.loggedUser);
  return (
    <main>
      <h1>Hello World!</h1>
      <p>{loggedUser?.username}</p>
    </main>
  );
}
