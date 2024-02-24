import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AddFriendComponent } from "./add-friend.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("AddFriendComponent", () => {

  let fixture: ComponentFixture<AddFriendComponent>;
  let component: AddFriendComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [AddFriendComponent]
    });

    fixture = TestBed.createComponent(AddFriendComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
