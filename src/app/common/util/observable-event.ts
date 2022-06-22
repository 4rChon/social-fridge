import { Subject, Subscription } from "rxjs";

export class ObservableEvent<T> {
  private action$ = this.subject.asObservable();

  constructor(private readonly subject: Subject<T>) { }

  public next(v?: T): void {
    this.subject.next(v);
  }

  public subscribe(fn: (...v: T[]) => void): Subscription {
    return this.action$.subscribe(fn);
  }
}