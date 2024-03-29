import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Article from "../../components/article/Article";

export default function Press() {
  const {
    allWpPost: { edges: posts },
  } = useStaticQuery(graphql`
    query PressPostQuery {
      allWpPost(
        filter: {
          categories: {
            nodes: { elemMatch: { slug: { eq: "espace-presse" } } }
          }
        }
      ) {
        edges {
          node {
            id
            title
            content
            featuredImage {
              node {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      quality: 100
                      placeholder: DOMINANT_COLOR
                      layout: FULL_WIDTH
                    )
                  }
                }
              }
            }
            date(formatString: "DD/MM/YYYY")
          }
        }
      }
    }
  `);

  return (
    <div className="container">
      <h1 className="title is-2 mt-4 has-text-centered">Espace presse</h1>
      <hr className="divider" />
      {posts.map((presse, index) => (
        <div key={presse.node.id}>
          <Article
            title={presse.node.title}
            content={presse.node.content}
          ></Article>
          <div className="divider is-info" />
        </div>
      ))}
    </div>
  );
}
