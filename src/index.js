// Libraries
import React, { lazy, useState, useCallback, useMemo, Suspense } from 'react';

// Utils
import { getHOCDisplayName } from './utils';

// Component
const RetryableLazy = (
	promise,
	LoaderView = () => <>Loading...</>,
	ErrorRetryView = ({ retry }) => (
		<button type="button" onClick={retry}>
			Retry
		</button>
	)
) => {
	const RetryWrapper = props => {
		const [loading, setLoading] = useState(true);
		const retry = useCallback(() => setLoading(true), []);
		const LazyComponent = useMemo(
			() =>
				lazy(() =>
					promise().catch(() => {
						setLoading(false);
						return { default: () => <ErrorRetryView retry={retry} /> };
					})
				),
			[promise, loading]
		);
		return (
			<Suspense fallback={<LoaderView />}>
				<LazyComponent {...props} />
			</Suspense>
		);
	};

	RetryWrapper.displayName = `RetryableLazy(${getHOCDisplayName(
		RetryWrapper
	)})`;

	return RetryWrapper;
};

export default RetryableLazy;
