import { v2 as cloudinary } from 'cloudinary';

export function getSignedImageUrl(publicId: string, expiresInSeconds = 600): string {
  const expireAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
  return cloudinary.url(publicId, {
    type: 'authenticated',
    secure: true,
    sign_url: true,
    expire_at: expireAt,
  });
}
