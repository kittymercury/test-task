import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import './styles.scss'
import api  from '../../api'

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: null,
      articles: []
    }
  }

  componentDidMount = () => {
    this.getArticles()
  }

  getArticles = async () => {
    const { data = [] } = await api.get('/articles')

    this.setState({ articles: data })
  }

  handleClickCreateNewArticle = async () => {
    const response = await api.post('/article')

    if (response.data.article) {
      window.location.assign(`http://${process.env.REACT_APP_HOSTNAME}:3000/article/${response.data.article.id}?edit=true`);
    }

    console.log(response.data.article)
  }
  
  renderList = () => {
    const sortedArticles = this.state.articles.sort((a, b) => b.id - a.id)

    return (
      <ul>
        {sortedArticles.map((a) => {
          const date = new Date(a.created_at)
          const convertedDate = moment(date).format('LL')
          const convertedTime = moment(date).format('LT')

          return (
            <li key={a.id}>
              <Link to={`/article/${a.id}`}>
                <div className="box item">
                  <div className="date">
                    <span>{convertedDate}</span>
                    <span>{convertedTime}</span>
                  </div>
                  <div className="title is-5">{a.heading}</div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <div className="navbar-item title is-4">Home</div>
        </div>
        <div className="container list">
          <button className="button add" onClick={this.handleClickCreateNewArticle}>Create new article</button>
          {this.renderList()}
        </div>
      </div>
    )
  }
}
