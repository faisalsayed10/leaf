import React from "react";
import Layout from "../components/Layout";
import Main from "@components/Main";

type Props = {};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
        <Main />
    </Layout>
  );
};

export default Blog;
