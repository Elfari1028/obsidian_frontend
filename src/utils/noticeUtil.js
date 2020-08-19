import axios from 'axios'

export default class NoticeRequest {
    static timer
    messageQueue = []
    newMessageList = []
    static messageMaxLength = 12
    static messageBot = new NoticeRequest()
    messageUnreadLength

    static getInstance() {
        return NoticeRequest.messageBot
    }

    async noticeInit() {
        if (NoticeRequest.timer != null) {
            return
        }
        await axios.get('message/get/').then(res => {
            if (res.data.success) {
                let temp = []
                console.log(res.data)
                const list = res.data.list
                this.messageUnreadLength = res.data.unread_num
                for (let i = 0; i < list.length; i++) {
                    this.queuePush(temp, {
                        message_id: list[i].message_id,
                        sender: list[i].sender,
                        type: list[i].type,
                        content: list[i].content,
                        time: list[i].create_time,
                        is_read: list[i].is_read,
                        doc_id: list[i].doc_id,
                        team_id: list[i].team_id
                    })
                }
                this.sortMessages(temp)
                this.messageQueue = temp
                NoticeRequest.timer = setTimeout(() => {
                    NoticeRequest.timer = null
                    this.axiosPolling()
                }, 5000)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    async axiosPolling() {
        if (NoticeRequest.timer != null) {
            return
        }
        await axios.get('message/get/').then(res => {
            if (res.data.success) {
                let temp = []
                const list = res.data.list
                this.messageUnreadLength = res.data.unread_num
                for (let i = 0; i < list.length; i++) {
                    this.queuePush(temp, {
                        message_id: list[i].message_id,
                        sender: list[i].sender,
                        type: list[i].type,
                        content: list[i].content,
                        time: list[i].create_time,
                        is_read: list[i].is_read,
                        doc_id: list[i].doc_id,
                        team_id: list[i].team_id
                    })
                }
                this.sortMessages(temp)
                let newTemp = []
                for (let i = 0; i < temp.length; i++) {
                    if (typeof (this.messageQueue.find(function (curVal) {
                        return curVal.message_id === temp[i].message_id
                    })) == "undefined") {
                        this.queuePush(newTemp, temp[i])
                    }
                }
                this.newMessageList = newTemp
                this.messageQueue = temp

                NoticeRequest.timer = setTimeout(() => {
                    NoticeRequest.timer = null
                    this.axiosPolling()
                }, 5000)
            } else {
                if (NoticeRequest.timer != null) {
                    clearTimeout(NoticeRequest.timer)
                }
                NoticeRequest.timer = null
            }
        }).catch(err => {
            console.log(err)
        })
    }

    sortMessages(queue) {
        queue.sort((a, b) => {
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

    queuePush(queue, Object) {
        queue.unshift(Object)
        if (queue.length > NoticeRequest.messageMaxLength && this.messageUnreadLength < NoticeRequest.messageMaxLength) {
            this.queuePop(queue)
        }
    }

    queuePop(queue) {
        return queue.pop()
    }

    axiosStop() {
        clearTimeout(NoticeRequest.timer)
    }

    getList() {
        return this.messageQueue.slice()
    }

    static readDoc() {
        NoticeRequest.getInstance().messageUnreadLength -= 1
    }
}