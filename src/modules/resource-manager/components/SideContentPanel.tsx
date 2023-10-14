import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import AddContentButton from './AddContentButton';
import { useRef, useState } from 'react';
import { ResourceState } from '../stores/slices/resourceSlice';

import ResourceCard from './ResourceCard';
import styled from '@emotion/styled';

const ToggleInputField = styled.input`
	position: absolute;
	top: 40px;

	display: flex;
	width: 80%;
	height: 40px;
	box-sizing: border-box;
	padding: 10px;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;

	border-radius: 5px;
	border: 1px solid #38A5E1;
	background: white;
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.10);
`;

const SideContentPanel = () => {
	const multiFileRef = useRef<HTMLInputElement>(null);
	const urlTextRef = useRef<HTMLInputElement>(null);
	const [isOpenUrlInput, setIsOpenUrlInput] = useState(false);

	const originResourceList = useAppSelector(state => state.resource.resourceList);
	const dispatch = useAppDispatch();

	const resourceList = [...originResourceList].reverse();

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
		const file = event.target.files;

		if (!file) return alert('파일을 선택해주세요.');

		const fileList = Array.from(file);

		fileList.forEach((file) => {
			const url = URL.createObjectURL(file);
			const id = file.name;
			const imageType = file.type.slice(-3);

			if(!['png', 'jpg'].includes(imageType)) return alert('이미지 파일만 업로드 가능합니다.');
			if(resourceList.find((value) => value.resource.src === url)) return alert('이미 존재하는 파일입니다.');

			const payload = {
				id,
				resource: {
					contentType: 'image',
					src: url,
					imageType
				}
			} satisfies ResourceState;

			dispatch({ type: 'resource/RESOURCE_EVENT_TRIGGER', payload });
		});
	}

	function handleUrlSubmit(event: React.KeyboardEvent<HTMLInputElement>){
		const url = `${event.currentTarget.value}`;	// prevent event.currentTarget.value from being null and copy for type safety
		console.log(url);
		if(!url.startsWith('http://') && !url.startsWith('https://')) return alert('올바른 URL을 입력해주세요.');

		if(resourceList.find((value) => value.id === url)) {
			alert('이미 존재하는 파일입니다.');
			return setIsOpenUrlInput(false);
		}
		const src = (url.match(/youtube.com/)) ? `https://www.youtube.com/embed/${url.split('=')[1]}` : url;

		const payload = {
			id: src,
			resource: {
				contentType: 'url',
				src,
			}
		} satisfies ResourceState;

		try {
			dispatch({ type: 'resource/RESOURCE_EVENT_TRIGGER', payload });
		}catch(e) {
			console.error(e);
		} finally {
			setIsOpenUrlInput(false);
			urlTextRef.current!.value = '';
		}
	}

	const onClickAddUrl = () => {
		setIsOpenUrlInput(true);
		setTimeout(() => urlTextRef.current?.focus());	// wait for urlTextRef to be rendered
	};

	const onClickAddImage = () => {
		multiFileRef.current?.click();
	};

	return (
		<aside className='flex flex-col w-1/6 min-w-min h-screen bg-slate-100 border-r-2 border-gray-300'>
			<header className="h-12 w-full flex justify-center items-center gap-3 p-3 shadow bg-white relative">
				<AddContentButton onClick={onClickAddUrl}>URL 추가</AddContentButton>
				<AddContentButton  onClick={onClickAddImage}>이미지 추가</AddContentButton>
				<input ref={multiFileRef} type="file" className="hidden" onChange={handleFileChange} multiple/>
				{isOpenUrlInput && <ToggleInputField ref={urlTextRef} type="text" placeholder="http(s)://..." onBlur={() => setIsOpenUrlInput(false)} 
					onKeyDown={(event) => event.key === 'Enter' && handleUrlSubmit(event)}
				/>}
			</header>

			<section className='flex flex-col w-full h-full overflow-y-scroll gap-3 py-3'>
				{resourceList.map((media, index) => <ResourceCard key={`${media.id}-${index}`} media={media} />)}
			</section>
		</aside>
	);
};

export default SideContentPanel;