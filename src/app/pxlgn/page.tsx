'use client';
import { Header } from "@/Components/Header";
import { Btn } from "@/Components/Layout/btn";
import { Section } from "@/Components/Layout/section";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

const AdminPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      
      <>
        <Header bg="/images/headers/projects-header.webp" title="Admin panel"/>
         <main>
            <Section isPrim>
               <p>Welcome, {session.user?.name}</p>
               <Btn onClick={() => signOut({callbackUrl: "/", redirect: true})}>Sign out</Btn>
            </Section>
         </main>
      </>
    );
  }

  return null;
};

export default AdminPage;