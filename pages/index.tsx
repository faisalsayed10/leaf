import React from "react";
import Layout from "../components/Layout";
import Main from "@components/Main";

type Props = {};

const Home: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Main />
    </Layout>
  );
};

export default Home;
