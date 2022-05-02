import { useState } from "react"
import BlogDetails from "./BlogDetails"

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detailsStyle = { display: showDetails ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      <BlogDetails blog={blog} disp={detailsStyle}/>
    </div>  
  )
}

export default Blog