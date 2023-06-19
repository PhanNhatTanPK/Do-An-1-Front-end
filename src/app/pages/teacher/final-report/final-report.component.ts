import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.css']
})
export class FinalReportComponent {
  filenames: string[] = [];
  fileStatus = {status: '', requestType: '', percent: 0 };
  arrFilename:any
  filenameJSON = sessionStorage.getItem('filenames');      
  arr = JSON.parse(this.filenameJSON);

  constructor(private fileService: FileService) {
      
   }

  //Định nghĩa function upload
  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name)
    }
    this.fileService.upload(formData).subscribe(
      event => {
        console.log(event)
        this.resportProgress(event)
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  //Định nghĩa function download
  onDownloadFile(filename: string): void {
    this.fileService.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress: 
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading...')
        break
      case HttpEventType.DownloadProgress: 
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading...')
        break
      case HttpEventType.ResponseHeader: 
        console.log('Header returned', httpEvent)
        break
      case HttpEventType.Response: 
        if(httpEvent.body instanceof Array) {
          this.fileStatus.status = "done"
          for(const filename of httpEvent.body) {
              this.filenames.unshift(filename)                                        
          } 
        }
        else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}))
        }      
            
        break
        default:
          console.log(httpEvent)
          break
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress'
    this.fileStatus.requestType = requestType
    this.fileStatus.percent = Math.round(100 * loaded / total)
  }

}
