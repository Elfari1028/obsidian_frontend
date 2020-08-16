import CryptoJS from "crypto-js";

export function encryption(sourceForm, resultForm) {
    let key = generateKey()
    for(let formKey in sourceForm)
    {
        resultForm[formKey] = encrypt(sourceForm[formKey], key)
    }
    resultForm.key = key
}

function generateKey() {
    let sString = "";
    let strings = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 16; i++) {
        let ind = Math.floor(Math.random() * strings.length);
        sString += strings.charAt(ind);
    }
    return sString
}

function encrypt(data, key) {
    let iv = CryptoJS.MD5(key).toString().substring(0, 16);
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    return CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString()
}
