import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";

type Props = {};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>My Blog</h1>
      </div>
    </Layout>
  );
};

export default Blog;
