'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fixVar = fixVar;
exports.fixPayload = fixPayload;
exports.fixString = fixString;
exports.fixObject = fixObject;
exports.fixNumber = fixNumber;
exports.fixUsername = fixUsername;
exports.fixPassword = fixPassword;

var _config = require('../config');

// FixVar'ı kaldır, fixString, fixPassword şeklinde yap

/**
 * Değişken düzeltmesi
 * @param {string} str Kontrol edilecek değişken verisinin tipi
 * @param {string | number | boolean} variable Kontrol edilecek değişken
 * @return {string | number | boolean} Verinin kendisi veya false
 */
function fixVar(str, variable) {
    return typeof _fixers.fixTypes[str] !== 'undefined' ? _fixers.fixTypes[str](variable) : false;
}

/**
 * Yükleri düzeltme
 * @param {string} contentType İçerik tipi (json, html, css..) 
 * @param {object} payload Yük objesi
 * @return {string} Yük dizgisi
 */
function fixPayload(contentType, payload) {
    // İçerik türüne göre yük (bilgisayar) verisi işleme
    return typeof _fixers.payloadFixTypes[contentType] !== 'undefined' ? _fixers.payloadFixTypes[contentType](payload) : _fixers.payloadFixTypes['default'](payload);
}

/**
 * Dizgiyi zorlama olmaksızın düzeltme
 * @param {string} str Dizgi
 * @param {boolean} force Dizgi olmaya zorlanmalı mı (varsayılan false)
 * @return {string | boolean} Dizgi düzgün ise kendisi, değilse false veya boş dizgi
 */
function fixString(str, force = false) {
    return typeof str == 'string' && str.trim().length > 0 ? str.trim() : force ? '' : false;
}

/**
 * Objeyii zorlama olmaksızın düzeltme
 * @param {string} obj Dizgi
 * @param {boolean} force Obje olmaya zorlanmalı mı (varsayılan false)
 * @return {string | boolean} Obje düzgün ise kendisi, değilse false veya boş obje
 */
function fixObject(obj, force = false) {
    return typeof obj == 'object' && obj != null ? obj : force ? {} : false;
}

/**
 * Sayı düzeltme
 * @param {number} num Sayı
 * @return {number | boolean} Sayı düzgün ise kendisi, değilse false
 */
function fixNumber(num) {
    return typeof num == "number" && num > 0 ? num : false;
}

// Düzeltmeler modülü
const _fixers = {};

function fixUsername(username) {
    // const possibleChars = "abcdefghijklmnopqrstuvwxyz0123456789_-";
    return typeof username == 'string' && username.trim().length < 15 ? username.trim() : false;
}

function fixPassword(password) {
    return typeof password == 'string' && password.trim().length > 0 ? password.trim() : false;
}

_fixers.fixString = str => {
    return typeof str == 'string' && str.trim().length > 0 ? str.trim() : false;
};

_fixers.fixPath = path => {
    return typeof path == 'string' ? path : '/';
};

_fixers.fixMethod = method => {
    return typeof method == 'string' && ['POST', 'GET', 'PUT', 'DELETE'].includes(method.toUpperCase()) ? method : 'GET';
};

_fixers.fixTemplateStr = templateString => {
    return typeof templateString == 'string' && templateString.length > 0 ? templateString : '';
};

_fixers.fixStatusCode = statusCode => {
    return typeof statusCode == 'number' ? statusCode : 200;
};

_fixers.fixContentType = contentType => {
    return typeof contentType == 'string' ? contentType : 'json';
};

_fixers.fixPhone = phone => {
    return typeof phone == 'string' && phone.trim().length == 10 ? phone.trim() : false;
};

_fixers.fixBoolean = boolean => {
    return typeof boolean == 'boolean' ? boolean : false;
};

_fixers.fixEmail = email => {
    return typeof email == 'string' && email.indexOf('@') > -1 ? email : false;
};

_fixers.fixNumber = number => {
    return typeof number == "number" && number > 0 ? number : false;
};

_fixers.fixId = id => {
    return typeof id == "string" && id.trim().length == _config.idLength ? id.trim() : false;
};

_fixers.fixObject = obj => {
    return typeof obj == 'object' && obj != null ? obj : {};
};

_fixers.fixFunction = func => {
    return typeof func == 'function' ? func : false;
};

_fixers.fixPayloadForJSON = payload => {
    payload = typeof payload == 'object' ? payload : {};

    return JSON.stringify(payload);
};

_fixers.fixPayloadForHTML = payload => {
    return typeof payload == 'string' ? payload : '';
};

_fixers.fixPayloadForDefault = payload => {
    return typeof payload !== 'undefined' ? payload : '';
};

// EĞer bunlardan birini içeriyorsa -> FixString,
// EĞer bunları içiyorsa -> fixboolean
// Bu yapı olabilir
_fixers.fixTypes = {
    username: fixUsername,
    fullName: _fixers.fixString,
    email: _fixers.fixEmail,
    phone: _fixers.fixPhone,
    password: _fixers.fixString,
    tosAgreement: _fixers.fixBoolean,
    statusCode: _fixers.fixStatusCode,
    contentType: _fixers.fixContentType,
    number: _fixers.fixNumber,
    id: _fixers.fixId,
    extend: _fixers.fixBoolean,
    string: _fixers.fixString,
    boolean: _fixers.fixBoolean,
    templateString: _fixers.fixTemplateStr,
    object: _fixers.fixObject,
    method: _fixers.fixMethod,
    headers: _fixers.fixObject,
    path: _fixers.fixPath,
    queryStringPbject: _fixers.fixObject,
    payload: _fixers.fixObject,
    callback: _fixers.fixFunction,
    templateName: _fixers.string
};

_fixers.payloadFixTypes = {
    json: _fixers.fixPayloadForJSON,
    html: _fixers.fixPayloadForHTML,
    default: _fixers.fixPayloadForDefault
};

_fixers.publicContTypes = {
    json: 'application',
    js: 'application',
    html: 'text',
    css: 'text',
    plain: 'text',
    favicon: 'image',
    png: 'image',
    jpg: 'image'
};
//# sourceMappingURL=fixers.js.map