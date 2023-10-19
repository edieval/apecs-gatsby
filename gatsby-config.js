module.exports = {
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-layout",
    "gatsby-plugin-htaccess",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /.svg$/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
          process.env.WPGRAPHQL_URL ||
          `https://wp.asso-apecs.org/index.php?graphql`,
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Lato", "Oswald"],
        },
      },
    },
    "gatsby-plugin-react-leaflet",
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
  ],
};
