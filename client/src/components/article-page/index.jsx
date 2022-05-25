import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { Link } from 'react-router-dom'
import moment from 'moment'

import api from '../../api'

import './styles.scss'

export default class ArticlePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      article: {},
      heading: '',
      content: '',
      isEditMode: false,
      popupVisible: false
    }
  }

  componentDidMount = () => {
    this.getArticle()
    this.getMode()
  }

  getArticle = async () => {
    const id = +window.location.pathname.split('/')[2].split('?')[0]
    const { data = {} } = await api.get(`/article/${id}`)

    this.setState({ article: data, heading: data.heading, content: data.content })
  }

  getMode = () => {
    const search = window.location.search

    if (search === '?edit=true') {
      this.setState({ isEditMode: true })
    }
  }

  handleChange = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  handleClickClosePopup = () => {
    this.setState({ popupVisible: false })
  }

  handleClickDelete = () => {
    this.setState({ popupVisible: true })
  }

  handleClickEdit = () => {
    this.setState({ isEditMode: true })
  }

  handleConfirmDelete = async (id) => {
    const response = await api.delete(`/article/${id}`)

    if (response.deleted) {
      this.setState({ popupVisible: false })
    }
  }

  handleClickRejectChanges = async (article) => {
    if (!article.created_at) {
      this.setState({ popupVisible: true })

      return
    }

    this.setState({ isEditMode: false })
  }

  handleClickApplyChanges = async (article) => {
    const payload = {
      heading: this.state.heading,
      content: this.state.content
    }

    if (!payload.heading.trim()) return

    const response = await api.put(`/article/${article.id}`, payload)
    console.log({response})

    this.setState({ isEditMode: false, article: response.data })
  }

  renderArticleReadMode = (article) => {
    const createdAt = new Date(article.created_at)
    const updatedAt = new Date(article.updated_at)
    const convertedCreatedAt = moment(createdAt).format('LLL')
    const convertedUpdatedAt = moment(updatedAt).format('LLL')

    return (
      <div className="container read-mode">
        <div className="section">
          <div className="title is-4">{article.heading}</div>
        </div>
        <div className="box">
          {article.content ? article.content : 'No content'}
        </div>
        <div className="footer">
          <div>Created: {convertedCreatedAt}</div>
          <div>{article.updated_at ? 'Edited: ' + convertedUpdatedAt : ''}</div>
        </div>
      </div>
    )
  }

  renderArticleEditMode = (article) => {
    return (
      <div className="container edit-mode">
        <div className="box">
          <label htmlFor="heading">Article heading</label>
          <TextareaAutosize
            defaultValue={article.heading}
            autoFocus
            id="heading"
            name="heading"
            onChange={(e) => this.handleChange('heading', e)}
          />
        </div>
        <div className="box">
          <label htmlFor="content">Article content</label>
          <TextareaAutosize
            defaultValue={article.content}
            id="content"
            name="content"
            onChange={(e) => this.handleChange('content', e)}
          />
        </div>
      </div>
    )
  }

  renderButtons = (article) => {
    if (window.location.search) {
      return (
        <div className="navbar">
          <div className="navbar-item cancel" onClick={() => this.handleClickRejectChanges(article)}>
            {article.created_at && (
              <Link to={`/article/${article.id}`}>
                Cancel
              </Link>
            )}
            {!article.created_at && <div>Cancel</div>}
          </div>
          <div className="navbar-item save" onClick={() => this.handleClickApplyChanges(article)}>
            {this.state.heading.trim() && (
              <Link to={`/article/${article.id}`}>
                Save
              </Link>
            )}
            {!this.state.heading.trim() && <div>Save</div>}
          </div>
        </div>
      )
    } else {
      return (
        <div className="navbar">
          <div className="navbar-item back">
            <Link to="/articles">Back</Link>
          </div>
          <div className="navbar-item edit-delete">
            <div className="edit" onClick={this.handleClickEdit}>
              <Link to={`/article/${article.id}?edit=true`}>
                Edit
              </Link>
            </div>
            <div className="del" onClick={this.handleClickDelete}>
              Delete
            </div>
          </div>
        </div>
      )
    }
  } 

  renderPopup = (article) => {
    return (
      <div className="popup">
        <div className="box">
          <div className="title is-5">
            If you delete this article it will be impossible to restore it. Are you sure? 
          </div>
          <div className="buttons">
            <div className="button is-primary" onClick={() => this.handleConfirmDelete(article.id)}>
              <Link to="/articles">Yes</Link>
            </div>
            <div className="button is-danger" onClick={this.handleClickClosePopup}>Cancel</div>
          </div>
        </div>
      </div>
    )
  }


  render() {
    const { article, popupVisible, isEditMode } = this.state
    console.log(article)
    
    return (
      <div>
        {this.renderButtons(article)}
        {popupVisible && this.renderPopup(article)}
        {isEditMode ? this.renderArticleEditMode(article) : this.renderArticleReadMode(article)}
      </div>
    )
  }
}
