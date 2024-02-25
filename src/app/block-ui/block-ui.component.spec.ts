import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUiComponent } from './block-ui.component';

describe('BlockUiComponent', () => {
  let component: BlockUiComponent;
  let fixture: ComponentFixture<BlockUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display block UI when isBlocking is true', () => {
    component.isBlocking = true;
    component.message = 'Loading...';
    fixture.detectChanges();

    const blockUiElement =
      fixture.nativeElement.querySelector('.block-ui-overlay');
    expect(blockUiElement).toBeTruthy(); // Check if block UI is displayed

    const spinnerElement = blockUiElement.querySelector('.spinner');
    expect(spinnerElement).toBeTruthy(); // Check if spinner is displayed

    const messageElement = blockUiElement.textContent.includes('Loading...');
    expect(messageElement).toBeTruthy(); // Check if message is displayed
  });

  it('should not display block UI when isBlocking is false', () => {
    component.isBlocking = false;
    fixture.detectChanges();

    const blockUiElement =
      fixture.nativeElement.querySelector('.block-ui-overlay');
    expect(blockUiElement).toBeFalsy(); // Check if block UI is not displayed
  });
});
