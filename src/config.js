export default class Config {
    static baseUrl = 'http://127.0.0.1:8000/'
    static infoUrl = this.baseUrl + 'account/my_status/'
    static wsUrl = 'ws://127.0.0.1:8000/ws/deploy/task'
    static axiosHeaders = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
}
