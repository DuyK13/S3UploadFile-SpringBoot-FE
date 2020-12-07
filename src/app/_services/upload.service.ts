import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }
  fileUpload(file) {
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: environment.aws.awsAccessKey,
        secretAccessKey: environment.aws.awsSecretKey,
        region: environment.aws.awsRegion,

      }
    );
    const userID = "17093161"; // chèn userID vào đây
    const fileType = file.name.split(".")[1];
    var setType;

    switch (fileType) {
      case "bmp":
      case "dib":
      case "gif":
      case "ico":
      case "jfif":
      case "jpe":
      case "jpe":
      case "jpeg":
      case "jpg":
      case "png":
        setType = "img/*";
        break;
      case "doc":
        setType = "application/msword"
        break;
      case "docx":
        setType = "	application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        break;
      case "mp3":
        setType = "audio/mpeg"
        break;
      case "mp4":
      case "mp4v":
        setType = "video/mp4"
        break;
      case "txt":
        setType = "text/plain; charset=utf-8"
        break;
      case "jar":
        
      default:
        setType = ""
        break;
    }
    const params = {
      Bucket: 'tran-the-duy-208',
      Key: `${userID}.${fileType}`,
      Body: file,
      ACL: 'public-read',
      ContentType: setType
    };
    bucket.upload(params, function (err, data) {
      if (err) {
        console.error('ERROR: ', JSON.stringify(err));
        return false;
      }
      var fileName = data.Key;
      var fileURL = data.Location;
      console.log(fileName + "\n" + fileURL);
      return true;
    });
  }
}
