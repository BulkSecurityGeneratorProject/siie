import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFuncion } from 'app/shared/model/funcion.model';
import { FuncionService } from './funcion.service';

@Component({
  selector: 'jhi-funcion-delete-dialog',
  templateUrl: './funcion-delete-dialog.component.html'
})
export class FuncionDeleteDialogComponent {
  funcion: IFuncion;

  constructor(protected funcionService: FuncionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.funcionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'funcionListModification',
        content: 'Deleted an funcion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-funcion-delete-popup',
  template: ''
})
export class FuncionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ funcion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FuncionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.funcion = funcion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/funcion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/funcion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
