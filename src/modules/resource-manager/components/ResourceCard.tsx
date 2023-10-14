import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { ResourceState, deleteResource, updateResource } from '../stores/slices/resourceSlice';

import Edit from './../assets/icons/edit.svg';
import Delete from './../assets/icons/delete.svg';

type ResourceCardProps = {
  media: ResourceState
}

const ResourceCard: React.FC<ResourceCardProps> = ({media}) => {
	const resourceIdRef = useRef<HTMLInputElement>(null);
	const currentUrl = useAppSelector(state => state.resource.currentUrl);
	const dispatch = useAppDispatch();
	const [isEdit, setIsEdit] = React.useState(false);

	function handleEditEvent(){
		if(!resourceIdRef.current) return;
		if(!isEdit) return;

		const payload = {
			targetId: media.id,
			updateId: resourceIdRef.current.value,
		};
		dispatch(updateResource(payload));
		setIsEdit(false);
	}

	const onClickEditIcon = () => {
		setIsEdit(true);
		setTimeout(() => resourceIdRef.current?.focus());
	};

	const onClickDeleteIcon = () => {
		dispatch(deleteResource({ id: media.id }));
	};

	const onClickCard = () => {
		dispatch({ type: 'resource/SET_CURRENT_URL', payload: media.resource.src});
	};

	return (
		<div className='flex flex-col items-center gap-3 mx-3 px-3 py-2 bg-white rounded shadow h-24' 
			style={{borderWidth: (currentUrl === media.resource.src) ? 1 : 0, borderColor: '#38A5E1', borderStyle: 'solid' }}
			onClick={onClickCard}
		>
			<input ref={resourceIdRef} className="text-sm font-light w-full h-8 text-ellipsis select-none cursor-auto" defaultValue={media.id} readOnly={!isEdit} onBlur={handleEditEvent} onKeyDown={(e) => e.key === 'Enter' ? resourceIdRef.current?.blur() : null}/>
			<div className='w-full h-16 flex justify-end items-center gap-2'>
				<img src={Edit} alt='edit-icon' className='cursor-pointer'  onClick={onClickEditIcon} />
				<img src={Delete} alt='delete-icon' className='cursor-pointer' onClick={onClickDeleteIcon} />
			</div>
		</div>
	);
};

export default ResourceCard;