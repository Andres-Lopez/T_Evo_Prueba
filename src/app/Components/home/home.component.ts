import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { EPS } from 'src/app/Entities/EPS';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  updateIco = faPencilAlt;
  deleteIco = faTrash;

  @ViewChild('update') update : NgbModalRef;
  @ViewChild('insert') insert : NgbModalRef;
  @ViewChild('delete') delete : NgbModalRef;
  @ViewChild('lost') lostConection : NgbModalRef;

  closeResult = '';
  ListEps:EPS[];
  modalRef : NgbModalRef;
  updateEps:EPS;
  deleteEps:EPS;
  insertEps:EPS = { consecutivo:0,nombre:'',nit:'',codigoMinisterio:'' };




  constructor(private api:ApiService,private modalService: NgbModal, private router:Router,private toastr:ToastrService) { }



  ngOnInit(): void {
    this.GetEps();
  }

  GetEps(){
    this.api.GetEps().subscribe((data:any)=>{
      this.ListEps = data;
    })
  }


  /* Toastr*/

  showSuccess(message,title) {
    this.toastr.success(message,title);
  }
  showError(message,title) {
    this.toastr.error(message,title);
  }

  /* End Toastr*/

  /* Insert Eps*/

  ConfirmInsert(){
    let list:EPS[] = [];
    list.push(this.insertEps);

    this.api.InsertEps(list).subscribe((data:any)=>{
      console.log(data);
      this.GetEps();
      this.showSuccess("Se agrego el registro","Agregar")
      this.closeModal();
      this.insertEps = {} as EPS;
    }, error=>{
      if(error.statusText == "Unknown Error"){
        this.showError("Cierre la sesión e ingrese de nuevo","Error");
      }else{
        this.showError(error.error,"Error");
      }
      this.insertEps = {} as EPS;
      this.closeModal();
    })
  }

  /*End insert*/

  /*Update*/

  UpdateEps(item:any){
    this.updateEps = item;
    this.modalRef = this.modalService.open(this.update);
  }

  ConfirmUpdate(){
    this.api.UpdateEps(this.updateEps).subscribe((data:any)=>{
      console.log(data);
      this.closeModal();
      this.showSuccess("Se actualizo el registro","Actualizar")
      this.GetEps();
      this.updateEps = {} as EPS;
    }, error=>{
      if(error.statusText == "Unknown Error"){
        this.showError("Cierre la sesión e ingrese de nuevo","Error");
      }else{
        this.showError(error.error,"Error");
      }
      this.updateEps = {} as EPS;
      this.closeModal();
    })
  }
  /* End Update*/


  /* Delete */

  DeleteEps(item:any){
    this.deleteEps = item;
    this.modalRef = this.modalService.open(this.delete);

  }

  ConfirmDelete(){
    this.api.DeleteEps(this.deleteEps).subscribe((data)=>{
        this.closeModal();
        this.GetEps();
        this.deleteEps = {} as EPS;
        this.showSuccess("Se elimino el registro","Eliminar")
    }, error=>{
      if(error.statusText == "Unknown Error"){
        this.showError("Cierre la sesión e ingrese de nuevo","Error");
      }else{
        this.showError(error.error,"Error");
      }
      this.updateEps = {} as EPS;
      this.closeModal();
    })
  }

  /* End Delete */




  open(content) {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  closeModal(){
    this.modalRef.close();
  }

  CloseSession(){
    sessionStorage.removeItem("Token");
    this.showSuccess("Se cerro la sesión","Salir")
    this.router.navigate(['/']);
  }


}
