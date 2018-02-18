import { Component, OnInit } from '@angular/core'
import { MessageService, Type } from '../partials/messages/message.service'

@Component({
  selector: 'app-qrcode-scanner',
  templateUrl: './qrcodeScanner.component.html',
  styleUrls: ['./qrcodeScanner.component.css']
})
export class QrcodeScannerComponent implements OnInit {

  private data: Array<string>

  private camStarted = false
  private selectedDevice
  private qrResult: string
  private availableDevices: any[]

  constructor (
    private messageService: MessageService
  ) { }

  ngOnInit () {
    this.data = []
  }

  displayCameras (cams: any[]) {
    this.availableDevices = cams
    if (cams && cams.length > 0) {
      this.selectedDevice = cams[0]
      this.camStarted = true
    }
  }

  handleQrCodeResult (result: string) {
    this.qrResult = result
    this.processContent(result)
  }

  onChange (selectedValue: string) {
    this.camStarted = false
    this.selectedDevice = selectedValue
    this.camStarted = true
  }

  processContent (content): void {
    if (content) {
      this.data.push(content)
      this.messageService.add({
        origin: 'qrcode',
        text: content,
        type: Type.warning
      })
    } else {
      this.messageService.add({
        origin: 'qrcode',
        text: 'Erro na leitura. Tente novamente.',
        type: Type.error
      })
    }
  }

  getData (): string[] {
    return this.data
  }

  flushData (): void {
    this.data = []
  }

}