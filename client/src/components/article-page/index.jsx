import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import './styles.scss'

export default class ArticlePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      heading: '',
      content: '',
      isEditMode: false
    }
  }

  componentDidMount = () => {
    console.log(window.location.pathname)
  }

  handleChange = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  renderHeading = (article) => {
    if (this.props.isEditMode) {
      return (
        <div className="box">
          <label htmlFor="heading">Heading</label>
          <TextareaAutosize
            defaultValue={article.heading}
            autoFocus
            id="heading"
            name="heading"
            onChange={(e) => this.handleChange('heading', e)}
          />
        </div>
      )
    } else {
      return (
        <div className="section">
          <div className="title">{article.heading}</div>
        </div>
      )
    }
  }

  renderContent = (article) => {
    if (this.props.isEditMode) {
      return (
        <div className="box">
          <label htmlFor="content">Content</label>
          <TextareaAutosize
            defaultValue={article.content}
            id="content"
            name="content"
            onChange={(e) => this.handleChange('content', e)}
          />
        </div>
      )
    } else {
      return (
        <div className="box">
          {article.content}
        </div>
      )
    }
  }

  renderFooter = (article) => {
    if (!this.props.editMode) {
      return (
        <div className="footer">
          <div>Created {article.created_at}</div>
          <div>{article.updated_at ? 'Edited' + article.updated_at : ''}</div>
        </div>
      )
    } else {
      return ''
    }
  }


  render() {
    const { articles, id } = this.props
    const article = articles.find((a) => a.id === id)
    
    return (
      <div className="container">
        {this.renderHeading(article)}
        {this.renderContent(article)}
        {this.renderFooter(article)}
      </div>
    )
  }
}
