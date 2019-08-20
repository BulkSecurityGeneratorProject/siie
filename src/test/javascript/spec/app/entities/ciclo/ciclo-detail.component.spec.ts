/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SiieTestModule } from '../../../test.module';
import { CicloDetailComponent } from 'app/entities/ciclo/ciclo-detail.component';
import { Ciclo } from 'app/shared/model/ciclo.model';

describe('Component Tests', () => {
  describe('Ciclo Management Detail Component', () => {
    let comp: CicloDetailComponent;
    let fixture: ComponentFixture<CicloDetailComponent>;
    const route = ({ data: of({ ciclo: new Ciclo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SiieTestModule],
        declarations: [CicloDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CicloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CicloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ciclo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
