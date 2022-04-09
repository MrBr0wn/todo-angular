import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showModalWindow() {
    console.log('Show modal button click')
  }

  constructor() { }

  ngOnInit(): void {
  }

}
