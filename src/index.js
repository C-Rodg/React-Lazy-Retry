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
	const LazyComponent = props => {
		const [loading, setLoading] = useState(true);
		const retry = useCallback(() => setLoading(true), []);
		const LazyPromise = useMemo(
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
				<LazyPromise {...props} />
			</Suspense>
		);
	};

	LazyComponent.displayName = `RetryableLazy(${getHOCDisplayName(
		LazyComponent
	)})`;

	return LazyComponent;
};

export default RetryableLazy;
