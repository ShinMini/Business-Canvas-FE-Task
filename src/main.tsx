import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import './index.css';

import App from './App.tsx';
import ReduxProvider from './modules/resource-manager/stores/ReduxProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReduxProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</ReduxProvider>
	</React.StrictMode>,
);
