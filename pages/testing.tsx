import React from "react";
import Layout from "../components/Layout";
import Main from "@components/Main";
import Sidebar from "@components/Sidebar";

type Props = {};

const Test: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Sidebar />
    </Layout>
  );
};

export default Test;
