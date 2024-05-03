import { Test, Reporter } from '@playwright/test/reporter';

class MyCustomReporter implements Reporter {
  onTestBegin(test: Test) {
    console.log(`Starting test: ${test.title}`);
    test.startTime = Date.now();
  }

  onTestEnd(test: Test) {
    const duration = Date.now() - test.startTime;
    console.log(`Test ${test.result}: ${test.title} (Duration: ${duration}ms)`);
  }
}

export default MyCustomReporter;
