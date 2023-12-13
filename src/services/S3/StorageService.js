const AWS = require('aws-sdk');
const AmazonS3URI = require('amazon-s3-uri');

class StorageService {
  constructor() {
    this._S3 = new AWS.S3();
  }

  writeFile(file, meta) {
    const parameter = {
      Bucket: process.env.AWS_BUCKET_NAME, // Nama S3 Bucket yang digunakan
      Key: +new Date() + meta.filename, // Nama berkas yang akan disimpan
      Body: file._data, // Berkas (dalam bentuk Buffer) yang akan disimpan
      ContentType: meta.headers['content-type'], // MIME Type berkas yang akan disimpan
    };

    return new Promise((resolve, reject) => {
      this._S3.upload(parameter, (error, data) => {
        if (error) {
          return reject(error);
        }
        console.log('resolve', data.Location);
        return resolve(data.Location);
      });
    });
  }

  deleteFile(uri) {
    const { bucket, key } = AmazonS3URI(uri);
    const parameter = { Bucket: bucket, Key: key };
    return new Promise((resolve, reject) => {
      this._S3.deleteObject(parameter, (error, data) => {
        if (error) return reject(error);
        console.log('resolve', data);
        return resolve();
      });
    });
  }
}

module.exports = StorageService;
