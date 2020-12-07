import { UPLOADAPIService } from './_services/upload-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userForm: FormGroup;
  fileMessage: any;
  file: File;
  isFileExist: boolean = false;
  count: number = 0;

  @ViewChild('message') div: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private uploadAPI: UPLOADAPIService,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      avatar: ["", [Validators.required]]
    });
  }

  onFileChange(event): void {
    this.file = event.target.files[0];
    if (this.file.size !== 0) {
      this.isFileExist = true;
    }
  }


  onSubmit(): void {
    if (this.file.size !== 0) {
      this.uploadAPI.uploadFile(this.file).subscribe((response) => {
        if (response.status === 200) {
          this.fileMessage = 'Image uploaded successfully';
          const img: HTMLImageElement = this.renderer.createElement('img');
          img.src = response.body.fileURL;
          img.width = 100;
          img.height = 100;
          this.renderer.appendChild(this.div.nativeElement, img);

          const matIcon = this.renderer.createElement('mat-icon');
          this.renderer.setAttribute(matIcon, 'role', 'img');
          this.renderer.setAttribute(matIcon, 'aria-hidden', 'true');
          this.renderer.setAttribute(matIcon, 'data-mat-icon-type', 'font');
          this.renderer.addClass(matIcon, 'mat-icon');
          this.renderer.addClass(matIcon, 'notranslate');
          this.renderer.addClass(matIcon, 'material-icons');
          this.renderer.addClass(matIcon, 'mat-icon-no-color');
          this.renderer.appendChild(matIcon, this.renderer.createText('save_alt'));

          const span1 = this.renderer.createElement('span');
          this.renderer.addClass(span1, 'mat-button-wrapper');
          this.renderer.appendChild(span1, matIcon);

          const span2 = this.renderer.createElement('span');
          this.renderer.addClass(span2, 'mat-ripple');
          this.renderer.addClass(span2, 'mat-button-ripple');
          this.renderer.addClass(span2, 'mat-button-ripple-round');
          this.renderer.setAttribute(span2, 'ng-reflect-centered', 'true');
          this.renderer.setAttribute(span2, 'ng-reflect-trigger', '[object HTMLButtonElement]');

          const span3 = this.renderer.createElement('span');
          this.renderer.addClass(span3, 'mat-button-focus-overlay');

          const button: HTMLButtonElement = this.renderer.createElement('button');
          this.renderer.setAttribute(button, 'mat-icon-button', '');
          this.renderer.addClass(button, 'mat-focus-indicator');
          this.renderer.addClass(button, 'mat-icon-button');
          this.renderer.addClass(button, 'mat-button-base');
          this.renderer.addClass(button, response.body.fileName.split('.')[0]);
          // this.renderer.appendChild(button, link);
          this.renderer.appendChild(button, span1);
          this.renderer.appendChild(button, span2);
          this.renderer.appendChild(button, span3);

          this.renderer.appendChild(this.div.nativeElement, button);

          // event
          this.renderer.listen(button, 'click', (event) => {
            location.href = `http://localhost:8089/s3/download/${response.body.fileName}`
          })
        } else {
          this.fileMessage = 'Image not uploaded successfully';
        }
        this.file = undefined;
        this.isFileExist = false;
        this.fileMessage = '';
      })
    }
  }

}
