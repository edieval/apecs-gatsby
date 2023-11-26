import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import "./app.scss";
import NewsCard from "../components/news-card/News-card";
import slugify from "../utils/Slugify";
import { StaticImage } from "gatsby-plugin-image";
import parse from "html-react-parser";

const IndexPage = () => {
  const {
    posts: { nodes: posts },
    accueil,
  } = useStaticQuery(graphql`
    {
      posts: allWpPost(
        limit: 3
        sort: { date: DESC }
        filter: {
          categories: { nodes: { elemMatch: { slug: { eq: "actions" } } } }
        }
      ) {
        nodes {
          id
          title
          actions {
            sousTitre
          }
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 100
                    placeholder: BLURRED
                    width: 600
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
          date(formatString: "DD/MM/YYYY")
        }
      }
      accueil: wpPost(
        categories: { nodes: { elemMatch: { slug: { eq: "accueil" } } } }
      ) {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
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
      }
    }
  `);

  return (
    <div id="home">
      <section
        id="hero"
        className="hero is-large background-hero"
        style={{
          background:
            "url(" +
            accueil.featuredImage.node.localFile.childImageSharp.gatsbyImageData
              .images.fallback.src +
            ") center center no-repeat fixed",
        }}
      >
        <div className="hero-body">
          <div className="container has-text-left">
            <h1 className="title has-text-white">{parse(accueil.title)}</h1>
            <h2 className="subtitle has-text-white">
              {parse(accueil.content)}
            </h2>
            <Link
              className="button is-info block-transformation"
              to="/inform/elasmobranches/Elasmobranches"
            >
              <strong>En savoir plus</strong>
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="columns is-centered mt-6">
          <div className="column has-text-centered ">
            <h1 className="title">Agir</h1>
            <hr className="small-divider" />
            <div className="columns is-centered">
              <div className="column is-narrow is-one-third block-transformation">
                <Link
                  className="container has-text-centered title"
                  to="/support/adhesion/Adhesion"
                >
                  <div className="bd-notification is-primary has-text-centered">
                    <StaticImage
                      src="../images/shark_4590.png"
                      alt="Nous rejoindre"
                      width={128}
                      height={128}
                    />
                    <br />
                  </div>
                  <h3 className="title">Nous rejoindre</h3>
                </Link>
              </div>
              <div className="column is-narrow is-one-third block-transformation">
                <Link
                  className="container has-text-centered title"
                  to="/act/Observations"
                >
                  <div className="bd-notification is-primary has-text-centered">
                    <StaticImage
                      src="../images/psksh.png"
                      alt="Vos observations"
                      width={128}
                      height={128}
                    />
                    <br />
                  </div>
                  <h3 className="title">Vos observations</h3>
                </Link>
              </div>
              <div className="column is-narrow is-one-third block-transformation">
                <Link
                  className="container has-text-centered title"
                  to="/support/gift/Gift"
                >
                  <div className="bd-notification is-primary has-text-centered">
                    <StaticImage
                      src="../images/gift.png"
                      alt="Faire un don"
                      width={128}
                      height={128}
                    />
                    <br />
                  </div>
                  <h3 className="title">Faire un don</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="columns is-centered mt-6">
          <div className="column has-text-centered">
            <div className="container">
              <h1 className="title">NOS ACTIONS</h1>
              <hr className="small-divider" />
              <div className="columns is-centered">
                {posts.map((action) => (
                  <div
                    className="column is-narrow is-one-third"
                    key={action.id}
                  >
                    <Link to={`/actions/${slugify(action.title)}`}>
                      <NewsCard
                        title={action.title}
                        featuredImage={action.featuredImage}
                        sousTitre={action.actions.sousTitre}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
