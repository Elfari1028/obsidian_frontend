import CryptoJS from "crypto-js";

export function encryptForm(sourceForm, resultForm) {
    let key = generateKey()
    for (let formKey in sourceForm) {
        resultForm[formKey] = encrypt(sourceForm[formKey], key)
    }
    resultForm.key = key
}

export function decryptForm(sourceForm, resultForm) {
    let key = sourceForm.key
    for (let formKey in sourceForm && formKey !== 'key') {
        resultForm[formKey] = decrypt(sourceForm[formKey], key)
    }
}

export function encryptData(sourceData) {
    let key = generateKey()
    console.log('key=' + key)
    return key.concat(encrypt(sourceData, key))
}

export function decryptData(sourceData) {
    let key = sourceData.substring(0, 16)
    console.log('key=' + key)
    return decrypt(sourceData.substring(16, sourceData.length), key)
}

export function generateKey() {
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

function decrypt(data, key) {
    let iv = CryptoJS.MD5(key).toString().substring(0, 16);
    key = CryptoJS.enc.Utf8.parse(key)
    iv = CryptoJS.enc.Utf8.parse(iv)
    return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }))
}
