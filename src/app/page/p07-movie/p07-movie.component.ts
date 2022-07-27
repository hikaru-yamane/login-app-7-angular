import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-p07-movie',
  templateUrl: './p07-movie.component.html',
  styleUrls: ['./p07-movie.component.scss']
})
export class P07MovieComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private socket: WebSocket | null = null;
  private myVideo!: HTMLVideoElement;
  private otherVideo!: HTMLVideoElement;
  private peer!: RTCPeerConnection;
  private iceCandidates!: RTCIceCandidate[];
  private stream!: MediaStream;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      media: [{
        value: 'camera',
        disabled: true,
      }],
      cameraMode: [{
        value: 'front',
        disabled: true,
      }],
      room: '',
    });
  }

  ngOnInit(): void {
    this.myVideo = <HTMLVideoElement>document.getElementById('myVideo');
    this.otherVideo = <HTMLVideoElement>document.getElementById('otherVideo');
    this.connectRTC();
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.close();
    }
    if (this.peer) {
      this.peer.close();
    }
    if (this.stream) {
      this.stream.getTracks()[0].stop();
    }
  }

  async connectRTC(): Promise<void> {
    this.peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    this.iceCandidates = [];
    
    this.peer.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        return;
      }
      this.iceCandidates.push(event.candidate);
    });
    this.peer.addEventListener('track', (event) => {
      this.otherVideo.srcObject = event.streams[0];
    });
    
    const cameraMode = this.form.controls['cameraMode'].value;
    const facingMode = cameraMode === 'front' ? 'use' : { exact: 'environment' };
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: facingMode
      }
    });
    this.myVideo.srcObject = this.stream;
    this.stream.getTracks().forEach((track: any) => {
      this.peer.addTrack(track, this.stream);
    });
  }

  connectSocket(): void {
    const room = this.form.controls['room'].value;
    if (!room) {
			alert('接続先を入力してください。');
      return;
		}
    if (this.socket) {
      this.socket.close();
      this.peer.close();
      this.connectRTC();
    }
    const isLocal = location.hostname === 'localhost';
    const ws = isLocal ? 'ws' : 'wss';
    const isDev = location.host === 'localhost:4200';
		const host = isDev ? 'localhost:8080' : location.host;
    const url = `${ws}://${host}/movie/${room}`;
    this.socket = new WebSocket(url);
    this.socket.onopen = async () => {
      const li = document.createElement('li');
      li.textContent = `${room}に接続しました。`;
      document.getElementById('messageList')!.appendChild(li);

      this.sendSdpOffer();
    };
    this.socket.onmessage = async (event) => {
      const json = event.data;
      const obj = JSON.parse(json);
      if (obj.type === 'offer') {
        const description = obj;
        this.receiveSdpOffer(description);
        this.sendSdpAnswer();
        this.sendIceCandidates();
      } else if (obj.type === 'answer') {
        const description = obj;
        this.receiveSdpAnswer(description);
        this.sendIceCandidates();
      } else {
        const iceCandidates = obj;
        this.receiveIceCandidates(iceCandidates);
      }
    };
    this.socket.onerror = () => {
      const li = document.createElement('li');
      li.textContent = `${room}に接続できませんでした。`;
      document.getElementById('messageList')!.appendChild(li);
    };
  }

  async sendSdpOffer(): Promise<void> {
    const description = await this.peer.createOffer();
    await this.peer.setLocalDescription(description);
    this.socket!.send(JSON.stringify(description));
  }

  async receiveSdpOffer(description: any): Promise<void> {
    await this.peer.setRemoteDescription(description);
  }

  async sendSdpAnswer(): Promise<void> {
    const description = await this.peer.createAnswer();
    await this.peer.setLocalDescription(description);
    this.socket!.send(JSON.stringify(description));
  }

  async receiveSdpAnswer(description: any): Promise<void> {
    await this.peer.setRemoteDescription(description);
  }

  async sendIceCandidates(): Promise<void> {
    await this.wait(200);
    this.socket!.send(JSON.stringify(this.iceCandidates));
  }

  async receiveIceCandidates(iceCandidates: any): Promise<void> {
    for (const iceCandidate of iceCandidates) {
      await this.peer.addIceCandidate(iceCandidate);
    }
  }

  wait(millisecond: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, millisecond);
    });
  }

}
