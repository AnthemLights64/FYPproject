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

    uploadImageCallBack = (file) => {
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/management/member/image/upload');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              const url = response.data.url; // Get the url of the image
              resolve({data: {link: url}});
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            });
          }
        );
      }

    render() {
        const { editorState } = this.state;
        return (
        
            <Editor
            editorState={editorState}
            editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: 10}}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
                image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
            }}
            />

        );
    }
}