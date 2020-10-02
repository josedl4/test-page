import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  showMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu = (): boolean => this.showMenu = !this.showMenu;
}
