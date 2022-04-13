import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})

export class ModalWindowComponent implements OnInit {

  value: string = 'Clear me';

  constructor() { }

  ngOnInit(): void {
  }

}
