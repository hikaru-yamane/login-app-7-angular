import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-p05-forum',
  templateUrl: './p05-forum.component.html',
  styleUrls: ['./p05-forum.component.scss']
})
export class P05ForumComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private socket: WebSocket | null = null;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      room: '',
      message: '',
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  connect(): void {
    const room = this.form.controls['room'].value;
    if (!room) {
      alert('接続先を入力してください。');
      return;
  }
    if (this.socket) {
      this.socket.close();
    }
    const isLocal = location.hostname === 'localhost';
    const ws = isLocal ? 'ws' : 'wss';
    const isDev = location.host === 'localhost:4200';
    const host = isDev ? 'localhost:8080' : location.host;
    const url = `${ws}://${host}/forum/${room}`;
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      const li = document.createElement('li');
      li.textContent = `${room}に接続しました。`;
      document.getElementById('messageList')!.appendChild(li);
    };
    this.socket.onmessage = (event) => {
      const li = document.createElement('li');
      li.textContent = event.data;
      document.getElementById('messageList')!.appendChild(li);
    };
    this.socket.onerror = () => {
      const li = document.createElement('li');
      li.textContent = `${room}に接続できませんでした。`;
      document.getElementById('messageList')!.appendChild(li);
    };
  }

  send(): void {
    const message = this.form.controls['message'].value;
    if (!message) {
      alert('送信するメッセージを入力してください。');
      return;
    }
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      alert('先に接続して下さい。');
      return;
    }
    this.socket.send(message);
    this.form.controls['message'].setValue('');
  }

}
