import QRCode from 'qrcode';
import fs from 'fs';

export default class QRCode2 {
    async createQR(text, filename) {
        const outputPath = `../qrcode_raw/${filename}.png`;

        QRCode.toFile(outputPath, text, {
            color: {
                dark: '#00718F',  // QR code color
                light: '#FFFFFF'  // Background color
            },
            width: 300
        }, function (err) {
            if (err) throw err;
            console.log('QR code saved to', outputPath);
        });
    }
}

// // Example usage
// const text = `
// BEGIN:VCARD
// VERSION:3.0
// N:Iman;Isro Syaeful 2222
// FN:Isro Syaeful 2222 Iman
// ORG:CAD-IT Consultants (Asia) Pte Ltd
// TITLE:IoT Application Engineer
// ADR:;;Jl. Bulevar Magna Commercial No. 25 & 27 Summarecon, Rancabolang, Gedebage, Kota Bandung;Bandung;;40295;Indonesia 
// TEL;WORK;VOICE:‎+62 22 7534756
// TEL;CELL:+62 8157035334
// TEL;FAX:
// EMAIL;WORK;INTERNET:isro.iman@caditglobal.com
// URL:www.caditglobal.com
// END:VCARD`;

// const QR = new QRCode();
// QR.createQR(text, 'qrcode2');
