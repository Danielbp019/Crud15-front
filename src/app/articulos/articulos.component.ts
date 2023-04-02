import { Component, OnInit, TemplateRef } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { IArticulos } from './articulos';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  public articulo = [] as any;

  constructor(private service: ArticulosService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.list()
    .subscribe(Response => this.articulo= Response);
  }
}
