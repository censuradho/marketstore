
import { v2 } from 'cloudinary';
import { environments } from 'src/config/environments';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: environments.cloudinary.name,
      api_key: environments.cloudinary.key,
      api_secret: environments.cloudinary.secret,
    });
  },
};
