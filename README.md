# React Lazy Retry

A way to retry with your lazy-loaded React components.

## Purpose

React.lazy is great, but out-of-the-box if it fails, that's it. This library allows for you to provide users with a way to manually retry to load the lazy-loaded route without requiring them to do a page refresh.

## Implementation Guide

##### 1. Installation

- Yarn:

  `yarn add react-lazy-retry`

- NPM:

  `npm install react-lazy-retry --save`

##### 2. Use

```javascript
import React from 'react';

// Import the component
import RetryableLazy from 'react-lazy-retry';

// Create a component to show while loading (optional)
const LoaderComponent = () => <>Loading...</>;

// Create a component to show when there is an error (optional)
const ErrorRetryComponent = ({ retry }) => (
	<button type="button" onClick={retry}>
		Retry
	</button>
);

// Wrap your async component and provide loading and error components
const MyAsyncComponent = RetryableLazy(() =>
	import('./path/to/component/to/wrap')
);

// Use the component in your application
const App = ({ shouldShowAsyncComponent }) => {
	return (
		<div>
			<h1>My App</h1>
			{shouldShowAsyncComponent && <MyAsyncComponent />}
		</div>
	);
};
```

## Creator

[Curtis](https://curtisrodgers.com/)
