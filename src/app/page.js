import Image from "next/image";
import styles from "./page.module.css";
import AuthGuard from "./authGuard/AuthGuard";
import HomeComponent from "./home/Home";

export default function Home() {

  return (
    <>
      <AuthGuard>
        <div>
          <HomeComponent />
        </div>
      </AuthGuard>
    </>
  );
}
