import EditIcon from './../assets/icons/edit.svg';
import DeleteIcon from './../assets/icons/delete.svg';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import AddContentButton from './AddContentButton';
import { useRef } from 'react';
import { ResourceState } from '../stores/slices/resourceSlice';

const SideContentPanel = () => {
	const resourceList = useAppSelector(state => state.resource.resourceList);
	const inputRef = useRef<HTMLInputElement>(null);

	const dispatch = useAppDispatch();


	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files;

		if (!file) return alert('파일을 선택해주세요.');
		const fileList = Array.from(file);

		fileList.forEach((file) => {

			const url = URL.createObjectURL(file);
			const id = file.name;
			const imageType = file.type.slice(-3);

			if(!['png', 'jpg', 'gif'].includes(imageType)) return alert('이미지 파일만 업로드 가능합니다.');
			if(resourceList.find((value) => value.id === id)) return alert('이미 존재하는 파일입니다.');

			const payload = {
				id,
				resource: {
					contentType: 'image',
					src: url,
					imageType
				}
			} satisfies ResourceState;

			dispatch({ type: 'resource/RESOURCE_EVENT_TRIGGER', payload });
			// const reader = new FileReader();
			// reader.readAsDataURL(file);
			// reader.onload = () => {
			// 	console.log(reader.result);
			// };
		});
	};

	return (
		<aside className='flex flex-col w-1/6 min-w-min h-full bg-slate-100 border-r-2 border-gray-300 gap-3'>
			<header className="h-12 w-full flex justify-center items-center gap-3 px-3 shadow bg-white">
				<AddContentButton >URL 추가</AddContentButton>
				<AddContentButton  onClick={() => inputRef.current?.click()}>이미지 추가</AddContentButton>
				<input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} multiple/>
			</header>

			{resourceList.map((value, index) => {
				return (
					<div key={index} className='flex flex-col items-center gap-3 mx-3 px-3 py-2 bg-white rounded shadow h-24'>
						<p className="text-sm font-light w-full h-8 text-ellipsis">
							{value.id}
						</p>
						<div className='w-full h-16 flex justify-end items-center gap-1'>
							<img src={EditIcon} alt='edit-icon' className='cursor-pointer' />
							<img src={DeleteIcon} alt='delete-icon' className='cursor-pointer'/>
						</div>
					</div>
				);
			})
			}
		</aside>
	);
};

export default SideContentPanel;