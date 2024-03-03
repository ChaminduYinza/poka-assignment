import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantComponent } from './plant.component';
import { provideHttpClient } from '@angular/common/http';
import { Store, provideStore } from '@ngrx/store';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PlantRes } from '../model/plant.model';
import { environment } from '../../environments/environment';
import * as PlantAction from '../state-management/actions/plant.action';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import swal from 'sweetalert2';

describe('PlantComponent', () => {
  let component: PlantComponent;
  let fixture: ComponentFixture<PlantComponent>;
  let httpTestingController: HttpTestingController;
  const initialState: PlantRes = {
    next: null,
    results: [],
  };
  let store: Store;
  const validMockResult: PlantRes = {
    next: '?offset=10',
    results: [
      {
        address: 'TEST',
        country: 'TT',
        division: 'TEST',
        id: 1,
        name: 'TEST',
      },
    ],
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        provideHttpClient(),
        provideStore(),
        provideHttpClientTesting(),
        provideMockStore({ initialState }),
      ],
    })
      .overrideComponent(PlantComponent, {
        // to overcome fixture.detection on mock
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PlantComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'loadMoreResults');
  });

  it('should create plant component', () => {
    expect(component).toBeTruthy();
  });

  it('should not call loadMoreResults() when data.results has items', () => {
    component.plantOb$ = of({
      next: null,
      results: [
        {
          address: 'TEST',
          country: 'TT',
          division: 'TEST',
          id: 1,
          name: 'TEST',
        },
      ],
    });
    component.ngOnInit();
    expect(component.loadMoreResults).toBeDefined();
    expect(component.loadMoreResults).not.toHaveBeenCalled();
  });

  it('should call loadMoreResults() when plant data.results is empty', () => {
    component.plantOb$ = of({ next: null, results: [] });
    component.ngOnInit();
    expect(component.loadMoreResults).toBeDefined();
    expect(component.loadMoreResults).toHaveBeenCalled();
  });

  it('should trigger an api to get plant list data', () => {
    component.loadMoreResults();
    const req = httpTestingController.expectOne(environment.api_plant_base_url);
    req.flush(initialState);
    httpTestingController.verify();
  });

  it('should not push to store if response is null or result is empty', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.loadMoreResults();
    const req = httpTestingController.expectOne(environment.api_plant_base_url);
    req.flush({});
    expect(dispatchSpy).not.toHaveBeenCalled();
    httpTestingController.verify();
  });

  it('should log an error message when API return error', async () => {
    const consoleSpy = spyOn(console, 'error');

    component.loadMoreResults();
    const req = httpTestingController.expectOne(environment.api_plant_base_url);
    await req.error(new ErrorEvent('There was an error'));
    expect(swal.isVisible()).toBeTruthy();
    expect(swal.getHtmlContainer()?.textContent).toEqual(
      'Something went wrong. Please try again later'
    );
    swal.clickConfirm();
    expect(consoleSpy).toHaveBeenCalledWith('There was an error!');
  });

  it('should dispatch setPlantsData action when the API returns valid response', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.loadMoreResults();

    const req = httpTestingController.expectOne(environment.api_plant_base_url);
    req.flush(validMockResult);

    expect(dispatchSpy).toBeDefined();
    expect(dispatchSpy).toHaveBeenCalledWith(
      PlantAction.setPlantsData({ plantRes: validMockResult })
    );
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    httpTestingController.verify();
  });

  it('should not dispatch setPlantsData action when the API returns empty response', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.loadMoreResults();
    const req = httpTestingController.expectOne(environment.api_plant_base_url);
    req.flush(initialState);

    expect(dispatchSpy).toBeDefined();
    expect(dispatchSpy).not.toHaveBeenCalledWith(
      PlantAction.setPlantsData({ plantRes: initialState })
    );

    httpTestingController.verify();
  });

  it('should create card for each result returned from the API', () => {
    component.plantOb$ = of(validMockResult);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const cardElements = fixture.debugElement.queryAll(By.css('.plant-card'));
      expect(cardElements.length).toEqual(validMockResult.results.length);
    });
  });

  it('should call loadMoreResults when #loadMoreButton button click', fakeAsync(() => {
    component.plantOb$ = of(validMockResult);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      tick();
      expect(component.loadMoreResults).toBeDefined();
      expect(component.loadMoreResults).toHaveBeenCalled();
    });
  }));

  it('should unsubscribe on ngOnDestroy', () => {
    const mockSubscription = jasmine.createSpyObj('Subscription', [
      'unsubscribe',
    ]);
    component.subscription = mockSubscription;
    component.ngOnDestroy();

    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });

  xit('should show only one card per row on small screens (767px)', fakeAsync(() => {
    window.innerWidth = 767;
    window.dispatchEvent(new Event('resize'));

    component.plantOb$ = of(validMockResult);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const cardElement = fixture.debugElement.nativeElement.querySelector(
        'app-plant-list-card'
      );
      const parentWidth = cardElement.parentElement.offsetWidth;
      const computedWidth = parseInt(
        window.getComputedStyle(cardElement).width,
        10
      );
      expect(computedWidth).toBe(parentWidth);
    });
  }));
});
