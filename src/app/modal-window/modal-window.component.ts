import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})

export class ModalWindowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  okButtonDialog() {
    console.log('Dialog OK button');
  }
}
