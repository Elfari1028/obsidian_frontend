export default class Config {
    static baseUrl = 'http://39.97.104.62/'
    static infoUrl = this.baseUrl + 'account/my_status/'
    static wsUrl = 'http://39.97.104.62/'
    static axiosHeaders = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    static avatarUploadUrl = 'http://39.97.104.62/account/upload_avatar/'
}
