import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import CloseIcon from './../assets/icons/close.svg';

const Title = styled.h1`
	color: #000;
	font-family: Roboto;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const MainContentIframe = () => {
	const currentUrl  = useAppSelector(state => state.resource.currentUrl);
	const dispatch = useAppDispatch();

	const onClickCloseIcon = () => {
		dispatch({ type: 'resource/SET_CURRENT_URL', payload: ''});
	};

	return (
		<div className='flex flex-col w-full h-screen'>
			<header className='flex w-full justify-between items-center box-border px-3 py-2 bg-white shadow h-12'>
				<Title>{currentUrl}</Title>
				<img src={CloseIcon} alt='close-icon' className='cursor-pointer' onClick={onClickCloseIcon} />
			</header>
			<section className="w-full h-full">
				<iframe className='w-full h-full' src={currentUrl} referrerPolicy='same-origin'/>
			</section>
		</div>
	);
};

export default MainContentIframe;