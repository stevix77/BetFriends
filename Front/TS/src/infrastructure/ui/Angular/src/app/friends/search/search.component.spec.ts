import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SearchComponent } from "./search.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SearchComponent", () => {

  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SearchComponent]
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
