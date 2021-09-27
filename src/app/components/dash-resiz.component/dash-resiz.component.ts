import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'node-dash-resiz.component',
  templateUrl: './dash-resiz.component.html',
  styleUrls: ['./dash-resiz.component.css']
})
export class DashResizComponent implements OnInit {
  ngOnInit(): void {

  }

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
  }
}



