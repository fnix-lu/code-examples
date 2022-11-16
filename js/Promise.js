// 简易 Promise
// 未验证

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

class Promise {
  constructor(executor) {
    this.status = PENDING;

    this.value = undefined;
    this.reason = undefined;

    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];

    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = value;
    this.fulfilledCallbacks.forEach((fn) => fn(value));
  }

  reject(reason) {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.reason = reason;
    this.rejectedCallbacks.forEach((fn) => fn(reason));
  }

  then(onFulfilled, onRejected) {
    switch (this.status) {
      case PENDING:
        this.fulfilledCallbacks.push(onFulfilled);
        this.rejectedCallbacks.push(onRejected);
        break;

      case FULFILLED:
        onFulfilled(this.value);
        break;

      case REJECTED:
        onRejected(this.reason);
        break;
    }
  }
}
