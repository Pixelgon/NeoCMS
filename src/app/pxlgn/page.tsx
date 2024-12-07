'use client';
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
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome, {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
        {/* Add your admin components here */}
      </div>
    );
  }

  return null;
};

export default AdminPage;