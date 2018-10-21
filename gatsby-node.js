const path = require('path');

exports.createPages = ({ graphql, actions }) => {
	const {createPage} = actions;

	return new Promise((resolve, reject) => {
		const blogPostTemplate = path.resolve('src/templates/BlogPost.js');
		resolve(
			graphql(`
				{
				  allContentfulBlogPost (limit: 100) {
				    edges {
				      node {
								id
				        title
				        slug
				        subtitle
				        published
				        heroImage {
				          file {
				            url
				            fileName
				            contentType
				          }
				        }
				        author {
				          firstName
				          lastName
				          birthday
				        }
				      }
				    }
				  }
				}
      `).then((result) => {
				if (result.errors) {
					reject(result.errors);
				}
				result.data.allContentfulBlogPost.edges.forEach((edge) => {
					createPage ({
						path: `blog/${edge.node.slug}`,
						component: blogPostTemplate,
						context: {
							slug: edge.node.slug
						}
					});
				});

				return;
			})
		);
	});
};
