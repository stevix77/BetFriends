import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CompleteBetViewModel } from '../CompleteBetViewModel';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-complete-bet',
  templateUrl: './complete-bet.component.html',
  styleUrl: './complete-bet.component.css'
})
export class CompleteBetComponent implements OnInit, OnDestroy {
  constructor(protected vm: CompleteBetViewModel,
            private route: ActivatedRoute
  ){}

  protected betId!: string;
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.betId = params.get('betId')!;
      })
    return Promise.resolve();
  }
  ngOnDestroy(): void {
    this.vm.Reset();
  }

  selectedResult(result: boolean) {
    this.vm.result = result
  }

    onPickFile () {
        // event.preventDefault();
        this.fileInput?.nativeElement.click();
    }

    onFilePicked () {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
            this.vm!.proof = fileReader.result;
        })
        if(this.fileInput!.nativeElement.files?.item(0)) {
            fileReader.readAsDataURL(this.fileInput!.nativeElement.files!.item(0)!)
        }
    }
}