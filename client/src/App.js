import React from 'react'
// import { Navigate, useParams } from 'react-router-dom'

import Navbar from './components/navbar'
import ArticlePage from './components/article-page'
import List from './components/list'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: null,
      isEditMode: null,
      articles: [
        {
          id: 1,
          heading: 'Article 1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          created_at: '2022-05-18T18:00:30.483Z',
          updated_at: ''
        },
        {
          id: 2,
          heading: 'Article 2',
          content: 'Content 2',
          created_at: '2022-05-19T10:03:17.141Z',
          updated_at: ''
        },
        {
          id: 3,
          heading: 'Article 3',
          content: 'Content 3',
          created_at: '2022-05-19T10:03:21.798Z',
          updated_at: ''
        }
      ]
    }
  }

  // componentDidMount = () => {
  //   let id = useParams()
  //   console.log(id)
  // }

  // componentDidUpdate = () => {
  //   if (!this.state.articleId) {
  //     <Navigate to="/articles" remove />
  //   }
  // }

  handleClickArticle = (id) => {
    this.setState({ articleId: id })
  }

  handleClickBack = () => {
    this.setState({ articleId: null })
  }

  renderContent = () => {
    if (this.state.articleId) {
      return (
        <ArticlePage
          id={this.state.articleId}
          isEditMode={this.state.isEditMode}
          articles={this.state.articles}
        />
      )
    }
      return (
        <List
          articles={this.state.articles}
          onArticle={this.handleClickArticle}
        />
      )
  }

  render() {
    return (
      <div className="test-task">
        <Navbar
          articleId={this.state.articleId}
          isEditMode={this.state.isEditMode}
          onClickBack={this.handleClickBack}
        />
        {this.renderContent()}
      </div>
    )
  }
}
