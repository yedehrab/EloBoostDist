'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Ortam değişkenlerini oluşturma.
 * * Örnek: *'set NODE_ENV=prodcut node index.js' yazılırsa,
 *  5000 portundan çalışır.*
 */
const environment = {};

/**
 * Platform ayarlama
 * * Not: *Platform varsa hasPlatform = true yapılmalı ve özellikleri platform objesine yazılmalıdır.*
 */
const hasPlatform = true;

/**
 * Platform'a özel ayarları içerir
 * * Not: *hasPlatform = true değilse aktif olmaz. Localhost özellikleri çalışır
 * * Kendime Not: process.env.PLATFORM ile de yapabilirim
 */
const platform = hasPlatform ? {
    httpPort: process.env.PORT,
    baseUrl: "https://yemreboost.herokuapp.com/"
} : {};

// Varsayılan ortam değişkeni
environment.stagging = {
    httpPort: platform.httpPort || 3000,
    idLength: 25,
    sessionTimeoutMs: 1000 * 60 * 60,
    'templateGlobals': {
        appName: 'Yemreak',
        companyName: 'Yemreak, Inc',
        releaseDate: '2019',
        baseUrl: platform.baseUrl || "http://localhost:3000/"
    }
};

environment.pruduct = {
    httpPort: platform.httpPort || 5000,
    idLength: 25,
    sessionTimeoutMs: 1000 * 60 * 60,
    'templateGlobals': {
        appName: 'EloBoost',
        companyName: 'Yemreak, Inc',
        releaseDate: '2019',
        baseUrl: platform.baseUrl || "http://localhost:5000/"
    }
};

/**
 * Hangi ortamın, command-line argumanı olacağına karar veriyoruz.
 * * Not: *'NODE_ENV' olan bir değişken ismidir, değiştirilemez ! (Türkçeleştirilemez)*
 */
const currentEnv = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

/**
 * Şu anki ortamı kontrol ediyoruz, eğer yukarıdakilerden biri değile
 * varsayılanı tanımlıyoruz.
 */
const envToExport = typeof environment[currentEnv] == 'object' ? environment[currentEnv] : environment['stagging'];

// Değişkenlerin aktarılması
const httpPort = envToExport.httpPort,
      idLength = envToExport.idLength,
      sessionTimeoutMs = envToExport.sessionTimeoutMs,
      templateGlobals = envToExport.templateGlobals;

// Varsayılan aktarma

exports.httpPort = httpPort;
exports.idLength = idLength;
exports.sessionTimeoutMs = sessionTimeoutMs;
exports.templateGlobals = templateGlobals;
exports.default = envToExport;
//# sourceMappingURL=config.js.map