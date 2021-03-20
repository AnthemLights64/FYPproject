import {
    HomeOutlined,
    ScheduleOutlined,
    TeamOutlined,
    BarsOutlined
  } from '@ant-design/icons';

const menuList = [
    {
        title: 'Homepage: Team',
        key: 'homepage',
        icon: <HomeOutlined />,
        route: '/home',
        isPublic: true
    },
    {
        title: 'Calendar',
        key: 'calendar',
        icon: <ScheduleOutlined />,
        route: '/calendar'
    },
    {
        title: 'Members',
        key: 'member',
        icon: <TeamOutlined />,
        route: '/member'
    },
    {
        title: 'Management',
        key: 'management',
        icon: <BarsOutlined />,
        route: '/management',
        children: [
            {
                title: 'Members Management',
                key: 'member management',
                route: '/management/member'
            },
            {
                title: 'User Management',
                key: 'user management',
                route: '/management/user'
            },
            {
                title: 'Role Management',
                key: 'role management',
                route: '/management/role'
            }
        ]
    }
];

export default menuList;