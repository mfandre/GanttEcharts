import { SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
export declare class ChangeFilter {
    private changes;
    constructor(changes: SimpleChanges);
    static of(changes: SimpleChanges): ChangeFilter;
    notEmpty<T>(key: string): Observable<T>;
    has<T>(key: string): Observable<T>;
    notFirst<T>(key: string): Observable<T>;
    notFirstAndEmpty<T>(key: string): Observable<T>;
}
