import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const withSession = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        const { data } = useSession();

        if (!data) {
          router.push("/Register"); // Redirect to login if session is invalid
        }
      };

      checkSession();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withSession;
