import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteSvg from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ViteSvg(), react()],
	server: {
		port: 3000,
		open: true,
	}
});
