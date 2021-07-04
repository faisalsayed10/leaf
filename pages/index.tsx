import React from "react";
import Layout from "../components/ui/Layout";
import Home from "@components/Home";
import { useSession } from "next-auth/client";

type Props = {};

const HomePage: React.FC<Props> = (props) => {
  const [session, loading] = useSession();

  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;
