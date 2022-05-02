const BlogDetails = ({blog, disp, handleLike}) => {
	return (
		<div style={disp}>
			<p>{blog.url}</p>
			<p>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></p>
			<p>Added by {blog.user.name}</p>
		</div>
	)
}

export default BlogDetails