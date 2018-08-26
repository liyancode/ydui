import { Modal,message} from 'antd';
const confirm = Modal.confirm;
export function tokenExpired() {
    confirm({
        title: '登录信息过期！',
        content: '你需要重新登录，现在操作吗？',
        onOk() {
            localStorage.removeItem('user');
            window.location.replace('/#/login')
        },
        onCancel() {
            message.error("登录信息过期，请重新登录！");
        },
    });

}