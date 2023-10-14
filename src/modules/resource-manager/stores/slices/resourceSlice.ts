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

export interface ResourceState {
	id: string;
	resource: ImageState | UrlState;
}

interface ResourceListState {
  resourceList: ResourceState[];
}
const initialState: ResourceListState= {
	resourceList: [
		{
			id: 'b38c2829-5cfc-4f4b-adc0-1e100bc636e8',
			resource: {
				contentType: 'url',
				src: 'https://www.robinwieruch.de/react-libraries/'
			},
		},
		{
			id: '90b15b0e-315f-40ef-86f5-1ed267e8ec67',
			resource: {
				contentType: 'url',
				src: 'https://typed.do/blog-kr/how-to-make-good-usability-product/'
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
			console.log('addResource: ',action);
			state.resourceList = [...state.resourceList, action.payload];
		},
		deleteResource: (state, action: PayloadAction<{id: string}>) => {
			state.resourceList = [...state.resourceList.filter(resource => resource.id !== action.payload.id)];
		},
		updateResource: (state, action: PayloadAction<{ id: string; resource: ResourceState }>) => {
			const { id, resource} = action.payload;
			state.resourceList = [...state.resourceList.map(res => (res.id !== id ? resource : res))];
		},
	},
});

export const { addResource, deleteResource, updateResource, RESOURCE_EVENT_TRIGGER } = resourceSlice.actions;

export default resourceSlice.reducer;
