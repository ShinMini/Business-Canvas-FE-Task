import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ImageState {
	contentType: 'image';
	src: string;
	imageType: string;
}

export interface UrlState {
	contentType: 'url';
	src: string;
}

export type ResourceState = {
	id: string;
	resource: ImageState | UrlState;
}

interface ResourceListState {
	currentUrl: string;
  resourceList: ResourceState[];
}
const initialState: ResourceListState= {
	currentUrl: 'https://www.robinwieruch.de/react-libraries',
	resourceList: [
		{
			id: 'https://www.youtube.com/embed/0OSUw7hJfVs',
			resource: {
				contentType: 'url',
				src: 'https://www.youtube.com/embed/0OSUw7hJfVs'
			},
		},
		{
			id: 'https://typed.do/blog-kr/how-to-make-good-usability-product',
			resource: {
				contentType: 'url',
				src: 'https://typed.do/blog-kr/how-to-make-good-usability-product/'
			},
		},
		{
			id: 'https://www.robinwieruch.de/react-libraries',
			resource: {
				contentType: 'url',
				src: 'https://www.robinwieruch.de/react-libraries/'
			},
		},
	]
};

export const resourceSlice = createSlice({
	name: 'resource',
	initialState,
	reducers: {
		RESOURCE_EVENT_TRIGGER: (state, action: PayloadAction<ResourceState>) => {
			if (state.resourceList.find(resource => resource.id === action.payload.id)) {
				throw new Error('already exist');
			}
		},
		addResource: (state, action: PayloadAction<ResourceState>) => {
			state.resourceList = [...state.resourceList, action.payload];
		},
		deleteResource: (state, action: PayloadAction<{id: string}>) => {
			state.resourceList = [...state.resourceList.filter(resource => resource.id !== action.payload.id)];
		},
		updateResource: (state, action: PayloadAction<{targetId: string;  updateId: string}>) => {
			const {targetId, updateId} = action.payload;
			state.resourceList = [...state.resourceList.map(res => (res.id === targetId ? {...res, id: updateId} : res))];
		},
		SET_CURRENT_URL: (state, action: PayloadAction<string>) => {
			state.currentUrl = action.payload;
		}
	},
});

export const { addResource, deleteResource, updateResource, RESOURCE_EVENT_TRIGGER, SET_CURRENT_URL } = resourceSlice.actions;

export default resourceSlice.reducer;
