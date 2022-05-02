const BlogDetails = ({blog, disp}) => (
	<div style={disp}>
		<p>{blog.url}</p>
		<p>{blog.likes} likes <button>like</button></p>
		<p>Added by {blog.user.name}</p>
	</div>
)

export default BlogDetails