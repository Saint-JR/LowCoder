import { RenderLifeCycle } from './type';

class LifeCycle {
  private beforeRender: (() => void)[];
  private afterRender: (() => void)[];

  constructor() {
    this.beforeRender = [];
    this.afterRender = [];
  }

  public addLifeCycle(lifeCycle: RenderLifeCycle | null) {
    if (!lifeCycle) {
      return;
    }

    if (Array.isArray(lifeCycle.beforeRender)) {
      this.beforeRender.push(...lifeCycle.beforeRender);
    } else if (typeof lifeCycle.beforeRender === 'function') {
      this.beforeRender.push(lifeCycle.beforeRender);
    }

    if (Array.isArray(lifeCycle.afterRender)) {
      this.afterRender.push(...lifeCycle.afterRender);
    } else if (typeof lifeCycle.afterRender === 'function') {
      this.afterRender.push(lifeCycle.afterRender);
    }
  }

  public setLifeCycle(lifeCycle: RenderLifeCycle | null) {
    if (!lifeCycle) {
      return;
    }

    if (Array.isArray(lifeCycle.beforeRender)) {
      this.beforeRender = lifeCycle.beforeRender;
    } else if (typeof lifeCycle.beforeRender === 'function') {
      this.beforeRender = [lifeCycle.beforeRender];
    }

    if (Array.isArray(lifeCycle.afterRender)) {
      this.afterRender = lifeCycle.afterRender;
    } else if (typeof lifeCycle.afterRender === 'function') {
      this.afterRender = [lifeCycle.afterRender];
    }
  }

  public triggerBeforeRender() {
    this.beforeRender.forEach(
      (beforeRender) => typeof beforeRender === 'function' && beforeRender(),
    );
  }

  public triggerAfterRender() {
    this.afterRender.forEach(
      (afterRender) => typeof afterRender === 'function' && afterRender(),
    );
  }
}

export default LifeCycle;
