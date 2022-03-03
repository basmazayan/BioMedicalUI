import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.css']
})
export class QrGeneratorComponent implements OnInit {

  constructor(private http: HttpClient) { }
  // public elementType =NgxQrcodeElementTypes.URL;
 public value = 'https://vaiz10.medium.com/a-simple-way-to-generate-and-download-a-qrcode-with-angular-dc64969b476a';
  public elementType = NgxQrcodeElementTypes.IMG;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  ngOnInit(): void {
  }
  upload(val: string) {
    console.log("qr")
    console.log(this.value)
    val = this.value
    return this.http.post(`${'http://localhost:51368/api/QRCoder/Index/'}`, val).subscribe(data => {
      console.log(this.value, data)
    })
  }
}
