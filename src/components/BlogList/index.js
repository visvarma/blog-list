// Write your JS code here
import './index.css'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {Component} from 'react'
import BlogItem from '../BlogItem'

class BlogList extends Component {
  state = {
    loading: true,
    blogList: [],
  }

  componentDidMount() {
    this.getBlogDetails()
  }

  getBlogDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const dataFromApi = await response.json()
    const formattedData = dataFromApi.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))

    this.setState({blogList: formattedData, loading: false})
  }

  render() {
    const {loading, blogList} = this.state
    return (
      <div className="blogs-list-container">
        {loading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="blog-list-div">
            {blogList.map(eachBlog => (
              <BlogItem key={eachBlog.id} blogDetails={eachBlog} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogList
