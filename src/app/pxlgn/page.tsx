'use client';
import { Metadata } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const metadata: Metadata = {
    title: 'Login | Pixelgon',
    robots: {
        index: false,
    },
};

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      const load = async () => {
        router.push("/");
      };
      load();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);
};

export default LoginPage;