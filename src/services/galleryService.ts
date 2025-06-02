import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Collection name
const COLLECTION_NAME = 'gallery';

// Gallery item categories
export type GalleryCategory = 'Store' | 'Products' | 'Services' | 'Events';

// Gallery item interface
export interface GalleryItem {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  title: string;
  description?: string;
  category: GalleryCategory;
  uploadedBy?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Get all gallery items
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as GalleryItem));
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    throw error;
  }
}

// Get gallery items by category
export async function getGalleryItemsByCategory(category: GalleryCategory): Promise<GalleryItem[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as GalleryItem));
  } catch (error) {
    console.error(`Error fetching gallery items for category ${category}:`, error);
    throw error;
  }
}

// Get a gallery item by ID
export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  try {
    const galleryItemDoc = await getDoc(doc(db, COLLECTION_NAME, id));
    
    if (galleryItemDoc.exists()) {
      return { 
        id: galleryItemDoc.id, 
        ...galleryItemDoc.data() 
      } as GalleryItem;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching gallery item with ID ${id}:`, error);
    throw error;
  }
}

// Add a new gallery item
export async function addGalleryItem(
  galleryItem: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...galleryItem,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding gallery item:', error);
    throw error;
  }
}

// Update an existing gallery item
export async function updateGalleryItem(
  id: string, 
  updates: Partial<Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  try {
    const galleryItemRef = doc(db, COLLECTION_NAME, id);
    
    await updateDoc(galleryItemRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error updating gallery item with ID ${id}:`, error);
    throw error;
  }
}

// Delete a gallery item
export async function deleteGalleryItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error(`Error deleting gallery item with ID ${id}:`, error);
    throw error;
  }
}
