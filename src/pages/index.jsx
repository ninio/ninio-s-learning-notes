import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Script from 'react-load-script';

export default class IndexPage extends React.Component {
	handleScriptLoad() {
		if (window.netlifyIdentity) {
			window.netlifyIdentity.on('init', user => {
				if (!user) {
					window.netlifyIdentity.on('login', () => {
						document.location.href = '/admin/';
					});
				}
			});
		}
		window.netlifyIdentity.init();
	}

	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;
		return (
			<section className="section">
				<Script
					url="https://identity.netlify.com/v1/netlify-identity-widget.js"
					onLoad={this.handleScriptLoad.bind(this)}
				/>
				<div className="container">
					<div className="content">
						<h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
					</div>
					{posts.filter(post => post.node.frontmatter.templateKey === 'blog-post').map(({ node: post }) => {


						let image = post.frontmatter.image;
						let featuredImageComponent;

						if( image ) {
							featuredImageComponent = (<img className="featured-image" src={ image } alt={post.frontmatter.title} />)
						}

						return (
							<div className="content" style={{ border: '1px solid #eaecee', padding: '2em 4em' }} key={post.id}>
								<p>
									<Link className="has-text-primary" to={post.frontmatter.path}>
										{post.frontmatter.title}
									</Link>
									<span> &bull; </span>
									<small>{post.frontmatter.date}</small>
								</p>
								{ featuredImageComponent }
								<p>
									<span dangerouslySetInnerHTML={{ __html: post.excerpt }} ></span>
									<br />
									<br />
									<Link className="button is-small is-pulled-right" to={post.frontmatter.path}>
										Keep Reading →
									</Link>
									<span className="is-clearfix"></span>
								</p>
							</div>
						);
					})}
				</div>
			</section>
		);
	}
}

export const pageQuery = graphql`
	query IndexQuery {
		allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
			edges {
				node {
					excerpt(pruneLength: 400)
					id
					frontmatter {
						title
						image
						templateKey
						date(formatString: "MMMM DD, YYYY")
						path
					}
				}
			}
		}
	}
`;
