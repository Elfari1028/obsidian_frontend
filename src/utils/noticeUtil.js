import axios from 'axios'

export default class NoticeRequest {
    static timer
    messageQueue = []
    static messageMaxLength = 10
    static messageBot = new NoticeRequest()
    messageUnreadLength

    static getInstance() {
        return NoticeRequest.messageBot
    }

    async axiosPolling() {
        if (NoticeRequest.timer != null) {
            return
        }
        await axios.get('message/get/').then(res => {
            if (res.data.success) {
                this.messageQueue = []
                console.log(res.data)
                const list = res.data.list
                this.messageUnreadLength = res.data.unread_num
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
                console.log(res.data)
                if (NoticeRequest.timer != null) {
                    clearTimeout(NoticeRequest.timer)
                }
                NoticeRequest.timer = null
            }
        }).catch(err => {
            console.log(err)
        })
    }

    sortMessages() {
        this.messageQueue.sort((a, b) => {
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
        this.messageQueue.unshift(Object)
        if (this.messageQueue.length > NoticeRequest.messageMaxLength) {
            this.queuePop()
        }
    }

    queuePop() {
        return this.messageQueue.pop()
    }

    axiosStop() {
        clearTimeout(NoticeRequest.timer)
    }

    getList() {
        return this.messageQueue
    }

    getUnreadLength() {
        return this.messageUnreadLength
    }
}