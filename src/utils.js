// Helper - shows wrapped component name
export const getHOCDisplayName = WrappedComponent => {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
