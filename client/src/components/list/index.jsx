import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import './styles.scss'

export default class List extends React.Component {
  renderList = () => {
    const { articles } = this.props
    const sortedArticles = articles.sort((a, b) => b.id - a.id)

    return (
      <div className="container">
        <ul>
          {sortedArticles.map((a) => {
            const date = new Date(a.created_at)
            const convertedDate = moment(date).format('LL')
            const convertedTime = moment(date).format('LT')

            return (
              <li key={a.id} onClick={() => this.props.onArticle(a.id)}>
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
      </div>
    )
  }

  render() {    
    return this.renderList()
  }
}
