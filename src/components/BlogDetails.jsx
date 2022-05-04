const BlogDetails = ({blog, disp, handleLike, handleDelete, currentUser}) => {
	const deleteButtonStyle = {
		display: currentUser.username === blog.user.username
			? ''
			: 'none'
	}
	return (
		<div style={disp}>
			<p>{blog.url}</p>
			<p>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></p>
			<p>Added by {blog.user.name}</p>
			<div style={deleteButtonStyle}>
				<button onClick={() => handleDelete(blog.id)}>Delete</button>
			</div>
		</div>
	)
}

export default BlogDetails