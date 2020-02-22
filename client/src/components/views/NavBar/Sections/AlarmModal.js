import React, { useEffect, useState } from 'react'
import { Modal, List, Avatar, Spin } from 'antd';
import { BACK_SERVER_URL, TokenAndTokenExp } from '../../../Config';
import axios from 'axios';

function AlarmModal(props) {

    const [Notifications, setNotifications] = useState([])
    const [Loading, setLoading] = useState(true)

    useEffect(() => {

        axios.get(`${BACK_SERVER_URL}/api/notification/getNotifications?${TokenAndTokenExp}`)
            .then(response => {
                if (response.data.success) {
                    setNotifications(response.data.notifications)
                } else {
                    alert('알림 갯수 정보를 가져오지 못했습니다.')
                }
                setLoading(false);
            })

    }, [])

    const handleOk = () => { props.updateAlramModalStatus('close') }

    const handleCancel = () => { props.updateAlramModalStatus('close') }

    const notificationClickHandler = (targetNotificationId) => {

        let variable = { notificationId: targetNotificationId }

        axios.post(`${BACK_SERVER_URL}/api/notification/changeViewIntoTrue?${TokenAndTokenExp}`, variable)
            .then(response => {
                if (response.data.success) {

                } else {
                    alert('알림 상세로 가는데 실패했습니다.')
                }
            })
    }

    return (
        <Modal
            title="Notifications"
            visible={props.alarmModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            bodyStyle={{ padding: '12px 24px 12px 24px', maxHeight: '500px', overflowY: 'auto' }}
        >
            {Loading ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                    <Spin size="large" />
                </div>
                :
                Notifications.length !== 0 ? Notifications.map((notification, index) => (
                    <List.Item key={index}>
                        <List.Item.Meta
                            style={{ backgroundColor: `${notification.viewed === true ? 'none' : '#d3d3d361' }` }}
                            avatar={<Avatar src={notification.userFrom.image} />}
                            title={<a href={notification.link} onClick={() => notificationClickHandler(notification._id)}>{notification.message}</a>}
                            description={notification.createdAt}
                        />
                    </List.Item>
                )) :
                    <div>
                        No Notifications Yet
                    </div>
            }

        </Modal>
    )
}

export default AlarmModal

