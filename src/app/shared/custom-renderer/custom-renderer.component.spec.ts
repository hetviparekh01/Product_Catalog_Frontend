import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRendererComponent } from './custom-renderer.component';

describe('CustomRendererComponent', () => {
  let component: CustomRendererComponent;
  let fixture: ComponentFixture<CustomRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomRendererComponent]
    });
    fixture = TestBed.createComponent(CustomRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
