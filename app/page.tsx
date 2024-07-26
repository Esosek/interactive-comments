"use client";
import { useStore } from "@/stores/useStore";
import styles from "./page.module.css";

export default function Home() {
  const loggedUser = useStore((state) => state.loggedUser);
  return (
    <main>
      <h1>Hello World!</h1>
      <p>{loggedUser?.username}</p>
    </main>
  );
}
