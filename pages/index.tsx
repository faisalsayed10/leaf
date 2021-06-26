import React from "react";
import Layout from "../components/Layout";
import Home from "@components/Home";

type Props = {};

const HomePage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;
