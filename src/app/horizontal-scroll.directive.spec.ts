import { HorizontalScrollDirective } from './horizontal-scroll.directive';

describe('HorizontalScrollDirective', () => {
  it('should create an instance', () => {
    let elRefMock = {
      nativeElement: document.createElement('div'),
    };
    const directive = new HorizontalScrollDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
