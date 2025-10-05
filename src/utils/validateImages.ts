// Validation script to check that all 75 slides have unique images
import adventureImages from '../adventure_75_unique_images.json';

interface AdventureImage {
  slide_id: number;
  title: string;
  image_url: string;
  description: string;
}

interface ImageData {
  adventure_images: AdventureImage[];
}

const validateImageMapping = () => {
  const imageData = adventureImages as ImageData;
  const images = imageData.adventure_images;
  
  console.log(`Total images in JSON: ${images.length}`);
  
  // Check that we have 75 images
  if (images.length !== 75) {
    console.error(`Expected 75 images, but found ${images.length}`);
    return false;
  }
  
  // Check that all slide IDs from 1 to 75 are present
  const slideIds = images.map(img => img.slide_id).sort((a, b) => a - b);
  const expectedIds = Array.from({length: 75}, (_, i) => i + 1);
  
  const missingIds = expectedIds.filter(id => !slideIds.includes(id));
  if (missingIds.length > 0) {
    console.error(`Missing slide IDs: ${missingIds.join(', ')}`);
    return false;
  }
  
  // Check that all images are unique
  const imageUrls = images.map(img => img.image_url);
  const uniqueUrls = new Set(imageUrls);
  
  if (imageUrls.length !== uniqueUrls.size) {
    console.error(`Found duplicate images! Expected ${imageUrls.length} unique images, but got ${uniqueUrls.size}`);
    
    // Find duplicates
    const duplicates: string[] = [];
    const seen = new Set<string>();
    for (const url of imageUrls) {
      if (seen.has(url)) {
        duplicates.push(url);
      } else {
        seen.add(url);
      }
    }
    console.error(`Duplicate URLs: ${[...new Set(duplicates)].join(', ')}`);
    return false;
  }
  
  console.log('✅ All validations passed!');
  console.log(`✅ Found 75 slides with unique images`);
  console.log(`✅ All slide IDs from 1-75 are present`);
  console.log(`✅ All ${uniqueUrls.size} images are unique`);
  
  // Show first few mappings as examples
  console.log('\nFirst 5 slide mappings:');
  images.slice(0, 5).forEach(img => {
    console.log(`Slide ${img.slide_id}: ${img.title} -> ${img.image_url}`);
  });
  
  return true;
};

validateImageMapping();