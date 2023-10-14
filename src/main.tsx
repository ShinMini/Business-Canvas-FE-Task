import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App.tsx';
import ReduxProvider from './modules/resource-manager/stores/ReduxProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReduxProvider>
			<App />
		</ReduxProvider>
	</React.StrictMode>,
);
