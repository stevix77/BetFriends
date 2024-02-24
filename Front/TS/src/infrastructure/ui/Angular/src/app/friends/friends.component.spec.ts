import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FriendsComponent } from "./friends.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("FriendsComponent", () => {

  let fixture: ComponentFixture<FriendsComponent>;
  let component: FriendsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [FriendsComponent]
    });

    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
