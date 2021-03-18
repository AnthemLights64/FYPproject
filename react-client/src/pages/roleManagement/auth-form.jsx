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

    // Generate the initial state according to the role passed in
    constructor (props) {
        super(props);
        const {menus} = this.props.role;
        this.state = {
            checkedKeys: menus
        }
    }

    // Provide a function for parent component to get the latest [menus]
    getMenus = () => this.state.checkedKeys;

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.route}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            );
            return pre;
        }, []);
    }

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({checkedKeys});
    }

    UNSAFE_componentWillMount () {
        this.treeNodes = this.getTreeNodes(menuList);
    }

    render() {

        const {role} = this.props;
        const {checkedKeys} = this.state;

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
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title='System Permissions' key='0-0'>
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}