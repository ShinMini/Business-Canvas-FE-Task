import { useAppSelector } from '../hooks/useRedux';

const MainContentIframe = () => {
	// const [iframe, setIframe] = React.useState<HTMLIFrameElement | null>(null);
	const {resource } = useAppSelector(state => state);

	return (
		<div>{resource.resourceList.map((value, index) => {

			return (
				<div key={index}>
					<p className="text-lg">
						{value.resource.src}
					</p>
				</div>
			);
		}
		)}</div>
	);
};

export default MainContentIframe;