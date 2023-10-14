import { ResourceState, UrlState, ImageState } from '../stores/slices/resourceSlice';

export const isUrlType = (media: Pick<ResourceState, 'resource'>): media is {id: string, resource: UrlState} => {

	return (media.resource.contentType === 'url');
};

export const isImageType = (media: Pick<ResourceState, 'resource'>): media is {id: string, resource: ImageState} => {

	return (media.resource.contentType === 'image');
};

const mediaTypeValidator = (media: ResourceState) => {
	if(isImageType(media)) return media;
	if(isUrlType(media)) return media;
	return media as never;
};

export default mediaTypeValidator;

