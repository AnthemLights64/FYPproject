import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tree } from 'antd';
import menuList from '../../config/menuConfig';

const {Item} = Form;
const {TreeNode} = Tree;

export default class Auth extends Component {

    formRef = React.createRef();

    static propTypes = {
        role: PropTypes.object
    }

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            );
            return pre;
        }, []);
    }

    UNSAFE_componentWillMount () {
        this.treeNodes = this.getTreeNodes(menuList);
    }

    render() {

        const {role} = this.props;

        const formItemLayout = {
        labelCol: { span: 4 },  
        wrapperCol: { span: 15 }, 
        }

        return (
            <Form>
                <Item label='Role Name' {...formItemLayout}>
                    <Input value={role.name} disabled />
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                >
                    <TreeNode title='System Permissions' key='0-0'>
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}