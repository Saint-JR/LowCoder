import { uniqueId } from 'lodash';

class EventBus {
  private events: Record<string, Record<string, (...args: any[]) => void>>;

  constructor() {
    this.events = {};
  }

  public createEvent(event: string) {
    if (!this.events[event]) {
      this.events[event] = {};
    }
  }

  public trigger(event: string, ...args: any[]) {
    if (!this.events[event]) {
      return;
    }

    Object.values(this.events[event]).forEach(
      (callback) => typeof callback === 'function' && callback(...args),
    );
  }

  public subscribe(event: string, callback: (...args: any[]) => void) {
    if (!this.events[event]) {
      this.events[event] = {};
    }

    const id = uniqueId();

    this.events[event][id] = callback;

    return () => {
      if (Reflect.has(this.events[event], id)) {
        Reflect.deleteProperty(this.events[event], id);
      }
    };
  }
}

export default EventBus;
