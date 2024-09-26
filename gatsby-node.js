const path = require(`path`);

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async (gatsbyUtilities) => {
  // Query our posts from the GraphQL server
  const actions = await getActionsPosts(gatsbyUtilities);
  
  console.log(`creating ${actions.length} pages`);

  // If there are no posts in WordPress, don't do anything
  if (!actions.length) {
    return;
  }

  // If there are posts, create pages for them
  await createActionsPages({ posts: actions, gatsbyUtilities });
};

/**
 * This function creates all the individual blog pages in this site
 */
const createActionsPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: `/actions/${slugify(post.title)}`,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/actions.template.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  );

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getActionsPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(
        sort: { date: DESC }
        filter: {
          categories: { nodes: { elemMatch: { slug: { eq: "actions" } } } }
        }
      ) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            title
          }
          next {
            id
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    );
    return;
  }

  return graphqlResult.data.allWpPost.edges;
}

function slugify(toBeSlugified) {
  if (!toBeSlugified) {
    return;
  }
  const charactersToReplace =
    "àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;";
  const templateForReplacingCharacters =
    "aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------";
  const specialCharsRegex = new RegExp(
    charactersToReplace.split("").join("|"),
    "g"
  );
  return toBeSlugified
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(specialCharsRegex, (character) =>
      templateForReplacingCharacters.charAt(
        charactersToReplace.indexOf(character)
      )
    ) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with ‘and’
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
