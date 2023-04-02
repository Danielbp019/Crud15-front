import { Component, OnInit, TemplateRef } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { IArticulo } from './articulos';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})

export class ArticulosComponent implements OnInit {

  public articulos = [] as any;
  public selectedArticulo = <IArticulo>{};
  public modalTitle = '';
  public btnTitle = '';
  public titulo = new FormControl('', Validators.required);
  public cuerpo = new FormControl('', Validators.required);
  public autor = new FormControl('', Validators.required);
  public showError = false;
  modalRef?: BsModalRef;

  constructor(private service: ArticulosService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>, articulo?: IArticulo) {
    if (articulo) {
      this.modalTitle = 'Editar el articulo';
      this.btnTitle = 'Actualizar';
      this.selectedArticulo = articulo;
      this.titulo.setValue(articulo.titulo);
      this.cuerpo.setValue(articulo.cuerpo);
      this.autor.setValue(articulo.autor);
    } else {
      this.modalTitle = 'Nuevo articulo';
      this.btnTitle = 'Guardar';
      this.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.list()
      .subscribe(response => this.articulos = response);
  }

  delete(articulo: IArticulo) {
    this.service.delete(articulo)
      .subscribe(response => this.getList());
  }

  save() {
    if (!this.titulo.value || !this.cuerpo.value || !this.autor.value) {
      this.showError = true;
      return;
    }

    this.selectedArticulo.titulo = this.titulo.value;
    this.selectedArticulo.cuerpo = this.cuerpo.value;
    this.selectedArticulo.autor = this.autor.value;

    if (this.btnTitle == 'Actualizar') {
      this.service.update(this.selectedArticulo)
        .subscribe(response => {
          this.getList();
          this.reset();
          this.showError = false;
          this.modalRef?.hide();
        });
    } else {
      this.service.add(this.selectedArticulo)
        .subscribe(response => {
          this.getList();
          this.reset();
          this.showError = false;
          this.modalRef?.hide();
        });
    }
  }

  reset() {
    this.titulo.reset();
    this.cuerpo.reset();
    this.autor.reset();
  }

}