 import React, { Component } from 'react';
 import { connect } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { fetchNote } from '../actions';
 import Tag from './Tag';
 import '../styles/ViewNote.css';

 const URL = 'https://killer-notes.herokuapp.com/note/';

 class ViewNote extends Component {

    // parses url path for note id then fetches note from server
     componentDidMount() {
        let id = window.location.pathname.split('/');
        id = id[2];
        this.props.fetchNote(URL, id);
     }

    render() {
        return (
            <div className='single-note-container'>
            <React.Fragment>
                {/* does not display edit or delete button if note no longer exists */}
                {this.props.singleNote.errorMessage ? null : (
                    <div className='options'>
                        <Link className='option-edit' to={`/edit/${this.props.singleNote._id}`}>edit</Link>
                        <Link className='option-delete' to={`/note/${this.props.singleNote._id}/delete`}>delete</Link>
                    </div>
                )}
                <React.Fragment>
                    {/* waits for notes to fetch then displays notes */}
                    {this.props.fetchingNotes ? (
                        <h1>... fetching note ...</h1>
                    ) : (
                    <React.Fragment>
                    {/* displays error if no note find by the id */}
                    {this.props.singleNote.errorMessage ? (
                    <h1>{this.props.singleNote.errorMessage}</h1>
                    ) : (
                    <div className='single-note'>
                        <p className='single-title'>{this.props.singleNote.title}</p>
                        <p className='single-body'>{this.props.singleNote.textBody}</p>
                        <React.Fragment>
                            {this.props.singleNote.tags ? (
                                <div className='tags'>
                                <p className='tagger'>Tags: </p>
                                {this.props.singleNote.tags.map(tag => {
                                    return <Tag key={tag} tag={tag} />
                                })}
                                </div>
                            ) : null}
                        </React.Fragment>
                    </div>
                    ) }
                    </React.Fragment>
                    )}
                    {/* displays error if error response from sever */}
                    {this.props.error ? <h1>{this.props.error}</h1> : null}
                </React.Fragment>
            </React.Fragment>
            </div>
        )
     }
 }

 const mapStateToProps = state => {
     return {
         singleNote: state.singleNote,
         fetchingNotes: state.fetchingNotes,
         error: state.error,
     }
 }

 export default connect(mapStateToProps, { fetchNote })(ViewNote);