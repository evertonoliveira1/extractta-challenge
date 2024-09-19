import '@testing-library/jest-dom';
import '@testing-library/jest-dom';
import React from 'react';

class ResizeObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}
globalThis.ResizeObserver = ResizeObserverMock as any;
global.React = React;