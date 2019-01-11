/**
 * 修改Antd 的默认加载图标，改为按需加载，减小打包体积 使用Antd默认图标之前需要在此文件引用
 * webpack alias 添加:
 * {@ant-design/icons/lib/dist$': path.join(client, 'utils/antdIcon.js')}
 */
export { default as UserOutline } from '@ant-design/icons/lib/outline/UserOutline'
export { default as PhoneOutline } from '@ant-design/icons/lib/outline/PhoneOutline'
export { default as LikeOutline } from '@ant-design/icons/lib/outline/LikeOutline'
export { default as ThunderboltOutline } from '@ant-design/icons/lib/outline/ThunderboltOutline'
export { default as DoubleRightOutline } from '@ant-design/icons/lib/outline/DoubleRightOutline'
export { default as GithubOutline } from '@ant-design/icons/lib/outline/GithubOutline'
export { default as ZhihuOutline } from '@ant-design/icons/lib/outline/ZhihuOutline'
export { default as FileTextOutline } from '@ant-design/icons/lib/outline/FileTextOutline'
export { default as MailOutline } from '@ant-design/icons/lib/outline/MailOutline'
