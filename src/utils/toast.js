// Simple event-driven toast dispatcher for instant notifications
class ToastEmitter {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  show(title, message, type = 'success') {
    this.listeners.forEach(listener => listener({ title, message, type, id: Date.now() }));
  }
}

export const toast = new ToastEmitter();
