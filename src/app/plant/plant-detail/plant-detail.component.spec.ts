import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { PlantDetailComponent } from './plant-detail.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { By } from '@angular/platform-browser';
import { PlantDetail } from '../../model/plant.mode';

describe('PlantDetailComponent', () => {
  let component: PlantDetailComponent;
  let fixture: ComponentFixture<PlantDetailComponent>;
  let paramMapSubject: BehaviorSubject<Map<string, string>>;
  let httpTestingController: HttpTestingController;
  const mockPlantDetail: PlantDetail = {
    address: '119 Webb View Apt. 563',
    description: 'Test desc',
    division: 'Aerospace',
    id: 1,
    phone: '123',
    manager: 'Jorge Bowen',
    city: 'TEST',
    country: 'TEST',
    name: 'Wallace-Patton',
  };

  beforeEach(async () => {
    paramMapSubject = new BehaviorSubject(new Map([['index', '1']]));
    await TestBed.configureTestingModule({
      imports: [PlantDetailComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: Location,
          useValue: {
            back: jasmine.createSpy('back'),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: paramMapSubject.asObservable() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantDetailComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    spyOn(component, 'getPlantDetails').and.callThrough();
    fixture.detectChanges();
  });

  it('should create plant detail component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPlantDetails with the correct index', () => {
    const expectedIndex = 1;
    expect(component.getPlantDetails).toHaveBeenCalledWith(expectedIndex);

    // Simulate a route parameter change
    paramMapSubject.next(new Map([['index', '2']]));
    fixture.detectChanges();

    expect(component.getPlantDetails).toHaveBeenCalledWith(2);
  });

  it('should set plant detail on init', () => {
    // since ActivatedRoute is defined it will trigger automatically on each test case
    const req = httpTestingController.expectOne(
      environment.api_plant_base_url + '/1/'
    );
    req.flush(mockPlantDetail);
    expect(component.plantDetail).toEqual(mockPlantDetail);
  });

  it('should set browser title based on the plant detail recived from the API', () => {
    const req = httpTestingController.expectOne(
      environment.api_plant_base_url + '/1/'
    );
    req.flush(mockPlantDetail);
    expect(document.title).toBe(`Poka | ${mockPlantDetail.name}`);
  });

  it('should trigger an api to get plant details', () => {
    component.getPlantDetails(1);
    const req = httpTestingController.expectOne(
      environment.api_plant_base_url + '/1/'
    );
    req.flush(mockPlantDetail);
    httpTestingController.verify();
  });

  it('check addressData assigned required data', () => {
    component.getPlantDetails(1);
    const req = httpTestingController.expectOne(
      environment.api_plant_base_url + '/1/'
    );
    req.flush(mockPlantDetail);
    httpTestingController.verify();

    expect(component.addressData).toEqual({
      address: mockPlantDetail.address,
      city: mockPlantDetail.city,
      country: mockPlantDetail.country,
      manager: mockPlantDetail.manager,
      phone: mockPlantDetail.phone,
    });
  });

  it('should call location.back() when goBack is called', () => {
    spyOn(component.location, 'back');
    component.goBack();
    expect(component.goBack).toBeDefined();
    expect(component.location.back).toHaveBeenCalled();
  });

  it('should call location.back() when user click #goback', fakeAsync(() => {
    spyOn(component.location, 'back');
    const link = fixture.debugElement.query(By.css('#goback')).nativeElement;
    link.click();
    expect(component.goBack).toBeDefined();
    expect(component.location.back).toHaveBeenCalled();
  }));

  it('should unsubscribe on ngOnDestroy', () => {
    const mockSubscription = jasmine.createSpyObj('Subscription', [
      'unsubscribe',
    ]);
    component.subscription = mockSubscription;
    component.ngOnDestroy();

    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should show two column on larger screens (767px)', fakeAsync(() => {
    const req = httpTestingController.expectOne(
      environment.api_plant_base_url + '/1/'
    );
    req.flush(mockPlantDetail);
    httpTestingController.verify();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstDiv = fixture.debugElement.query(By.css('.detail-content'));
      const style = window.getComputedStyle(firstDiv.nativeElement);
      expect(style.flexDirection).toBe('row');
    });
  }));

  xit('should show one column on small screens (767px)', fakeAsync(() => {
    const req = httpTestingController.expectOne(
      environment.api_plant_base_url + '/1/'
    );
    req.flush(mockPlantDetail);
    httpTestingController.verify();

    spyOnProperty(window, 'innerWidth').and.returnValue(430);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstDiv = fixture.debugElement.query(By.css('.detail-content'));
      const style = window.getComputedStyle(firstDiv.nativeElement);
      expect(style.flexDirection).toBe('column');
    });
  }));
});
