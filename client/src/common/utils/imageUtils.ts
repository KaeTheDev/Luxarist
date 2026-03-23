/**
 * Utility to handle multi-part form data uploads for images.
 */
export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
  
    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error("Image upload failed");
    }
  
    const data: { url: string } = await res.json();
    return data.url;
  }