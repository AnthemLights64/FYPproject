import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';


export default class RichTextEditor extends Component {

  static propTypes = {
      details: PropTypes.string
  }

  state = {
    editorState: EditorState.createEmpty(), // Create a non-content editing object
  }

  constructor(props) {
    super(props);
    const html = this.props.details;
    if (html) { // If it has a value, create a corresponding edit object based on an html format string
        const contentBlock = htmlToDraft(html);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editorState,
        };
    } else {
        this.state = {
            editorState: EditorState.createEmpty(), // Create a non-content editing object
        }
    }
  }

  // Real-time callbacks during input
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  getDetails = () => {
      return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
  }

    /* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
    /> */

  render() {
    const { editorState } = this.state;
    return (
      
        <Editor
          editorState={editorState}
          editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: 10}}
          onEditorStateChange={this.onEditorStateChange}
        />

    );
  }
}