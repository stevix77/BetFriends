import type { Subject } from "rxjs";

export abstract class Presenter {
    Subscribe<T>(key: string, subject: Subject<T>) {
        if(this.subjects.has(key)) {
          this.subjects.get(key)?.push(subject);
          return;
        }
        this.subjects.set(key, [subject]);
      }
    
      protected subjects: Map<string, Subject<any>[]> = new Map();
}