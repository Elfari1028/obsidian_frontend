import axios from 'axios'

export default class NoticeRequest {
    static timer
    static messageQueue = []
    static messageMaxLength = 10

    axiosPolling() {
        if (NoticeRequest.timer != null) {
            return
        }
        axios.get('message/get/').then(res => {
            if (res.data.success) {
                const list = res.data.list
                for (let i = 0; i < list.length; i++) {
                    this.queuePush({
                        message_id: list[i].message_id,
                        sender: list[i].sender,
                        type: list[i].type,
                        content: list[i].content,
                        time: list[i].create_time,
                        is_read: list[i].is_read
                    })
                }
                this.sortMessages()
                NoticeRequest.timer = setTimeout(() => {
                    NoticeRequest.timer = null
                    this.axiosPolling()
                }, 5000)
            } else {
                console.log(res.data.exc)
                if (NoticeRequest.timer != null) {
                    clearTimeout(NoticeRequest.timer)
                }
                NoticeRequest.timer = null
            }
        }).catch(err => {
            console.log(err)
            for (let i = 0; i < 9; i++) {
                this.queuePush({
                    message_id: i,
                    sender: 'DEBUG_SENDER' + i,
                    type: 'DEBUG_TYPE' + i,
                    content: 'DEBUG_CONTENT' + i * i,
                    time: '2020/8/18 11:25:' + i,
                    is_read: i % 2 === 0
                })
            }
        })
    }

    sortMessages() {
        NoticeRequest.messageQueue.sort((a, b) => {
            let x = a.is_read ? -1 : 1
            let y = b.is_read ? -1 : 1
            if (x > y)
                return -1
            if (x < y)
                return 1
            x = a.time
            y = b.time
            if (x > y)
                return -1
            else
                return 1
        })
    }

    queuePush(Object) {
        NoticeRequest.messageQueue.unshift(Object)
        if (NoticeRequest.messageQueue.length > NoticeRequest.messageMaxLength) {
            this.queuePop()
        }
    }

    queuePop() {
        return NoticeRequest.messageQueue.pop()
    }

    axiosStop() {
        clearTimeout(NoticeRequest.timer)
    }
}