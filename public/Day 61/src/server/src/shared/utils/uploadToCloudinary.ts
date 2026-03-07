import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = async (files: any) => {
  try {
    const uploadPromises = files.map(
      (file: any) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                fetch_format: "webp",
                quality: "auto",
                flags: "progressive",
              },
              (error, result) => {
                if (error) return reject(error);
                if (!result) return reject(new Error("Upload failed"));
                resolve({
                  url: result.secure_url,
                  public_id: result.public_id,
                });
              }
            )
            .end(file.buffer);
        })
    );

    const results = await Promise.allSettled(uploadPromises);
    const successfulUploads = results
      .filter((result) => result.status === "fulfilled")
      .map((result: any) => result.value);

    return successfulUploads;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return [];
  }
};
