import MainContentIframe from './components/MainContentIframe';
import SideContentPanel from './components/SideContentPanel';
import ToastEvent from './components/ToastEvent';

const ResourceManager = () => {
	return (
		<div className='w-screen h-screen bg-slate-200'>
			<SideContentPanel />
			<MainContentIframe />
			<ToastEvent />
		</div>
	);
};

export default ResourceManager;