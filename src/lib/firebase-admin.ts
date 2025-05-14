import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  Timestamp,
  serverTimestamp,
  writeBatch,
  runTransaction,
  WhereFilterOp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { v4 as uuidv4 } from 'uuid';

// Generic interface for all database entities
export interface BaseEntity {
  id?: string;
  createdAt?: any;
  updatedAt?: any;
}

// Generic CRUD operations for any collection
export const createDocument = async <T extends BaseEntity>(
  collectionName: string, 
  data: T
): Promise<T> => {
  try {
    const newData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, collectionName), newData);
    return { ...newData, id: docRef.id } as T;
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
};

export const getDocument = async <T extends BaseEntity>(
  collectionName: string, 
  id: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as T;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
};

export const getAllDocuments = async <T extends BaseEntity>(
  collectionName: string,
  orderByField: string = 'createdAt',
  orderDirection: 'asc' | 'desc' = 'desc'
): Promise<T[]> => {
  try {
    const q = query(
      collection(db, collectionName),
      orderBy(orderByField, orderDirection)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as T);
  } catch (error) {
    console.error(`Error getting all documents from ${collectionName}:`, error);
    throw error;
  }
};

export const updateDocument = async <T extends BaseEntity>(
  collectionName: string, 
  id: string, 
  data: Partial<T>
): Promise<T> => {
  try {
    const docRef = doc(db, collectionName, id);
    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(docRef, updateData);
    const updatedDoc = await getDoc(docRef);
    
    return { ...updatedDoc.data(), id } as T;
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

export const deleteDocument = async (
  collectionName: string, 
  id: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

// File upload helpers
export const uploadFile = async (
  file: File,
  path: string = 'uploads'
): Promise<string> => {
  try {
    const fileName = `${path}/${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (fileUrl: string): Promise<void> => {
  try {
    // Extract the path from the URL
    const storageRef = ref(storage, fileUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Entity-specific interfaces and functions
export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  specifications?: Record<string, any>;
  inStock?: boolean;
  featured?: boolean;
}

export interface Service extends BaseEntity {
  title: string;
  description: string;
  icon: string;
  backgroundImage: string;
  featured?: boolean;
}

export interface BrandEntity extends BaseEntity {
  name: string;
  logoUrl: string;
  website?: string;
  featured?: boolean;
}

export interface TeamMember extends BaseEntity {
  name: string;
  position: string;
  image: string;
  bio?: string;
  socialLinks?: Record<string, string>;
}

export interface GalleryItem extends BaseEntity {
  title: string;
  image: string;
  description?: string;
  category?: string;
}

export interface Message extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read?: boolean;
  responded?: boolean;
}

export interface Order extends BaseEntity {
  customer: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed';
}

export interface Testimonial extends BaseEntity {
  name: string;
  role: string;
  content: string;
  image?: string;
  rating?: number;
  approved?: boolean;
}

// Collection names constants
export const COLLECTIONS = {
  PRODUCTS: 'products',
  SERVICES: 'services',
  BRANDS: 'brands',
  TEAM: 'team',
  GALLERY: 'gallery',
  MESSAGES: 'messages',
  ORDERS: 'orders',
  TESTIMONIALS: 'testimonials',
  SETTINGS: 'settings',
};

// Enhanced query function with filtering and pagination
export interface QueryOptions<T> {
  orderByField?: keyof T | 'createdAt' | 'updatedAt';
  orderDirection?: 'asc' | 'desc';
  filters?: Array<{
    field: keyof T | string;
    operator: WhereFilterOp;
    value: any;
  }>;
  limitTo?: number;
  startAfterId?: string;
}

export const queryDocuments = async <T extends BaseEntity>(
  collectionName: string,
  options: QueryOptions<T> = {}
): Promise<T[]> => {
  try {
    const {
      orderByField = 'createdAt',
      orderDirection = 'desc',
      filters = [],
      limitTo,
      startAfterId
    } = options;

    const constraints: QueryConstraint[] = [];

    // Add filters
    filters.forEach(filter => {
      constraints.push(where(filter.field as string, filter.operator, filter.value));
    });

    // Add ordering
    constraints.push(orderBy(orderByField as string, orderDirection));

    // Add pagination
    if (limitTo) {
      constraints.push(limit(limitTo));
    }

    // Add starting point for pagination
    if (startAfterId) {
      const startDoc = await getDoc(doc(db, collectionName, startAfterId));
      if (startDoc.exists()) {
        constraints.push(startAfter(startDoc));
      }
    }

    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as T);
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    throw error;
  }
};

// Batch operations for multiple documents
export const batchCreateDocuments = async <T extends BaseEntity>(
  collectionName: string,
  items: T[]
): Promise<void> => {
  try {
    const batch = writeBatch(db);
    
    items.forEach(item => {
      const newDocRef = doc(collection(db, collectionName));
      batch.set(newDocRef, {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });
    
    await batch.commit();
  } catch (error) {
    console.error(`Error batch creating documents in ${collectionName}:`, error);
    throw error;
  }
};

export const batchUpdateDocuments = async <T extends BaseEntity>(
  collectionName: string,
  items: Array<{ id: string; data: Partial<T> }>
): Promise<void> => {
  try {
    const batch = writeBatch(db);
    
    items.forEach(item => {
      const docRef = doc(db, collectionName, item.id);
      batch.update(docRef, {
        ...item.data,
        updatedAt: serverTimestamp()
      });
    });
    
    await batch.commit();
  } catch (error) {
    console.error(`Error batch updating documents in ${collectionName}:`, error);
    throw error;
  }
};

export const batchDeleteDocuments = async (
  collectionName: string,
  ids: string[]
): Promise<void> => {
  try {
    const batch = writeBatch(db);
    
    ids.forEach(id => {
      const docRef = doc(db, collectionName, id);
      batch.delete(docRef);
    });
    
    await batch.commit();
  } catch (error) {
    console.error(`Error batch deleting documents from ${collectionName}:`, error);
    throw error;
  }
};

// Transaction for atomic operations
export const runTransactionOperation = async <T>(
  callback: (transaction: any) => Promise<T>
): Promise<T> => {
  try {
    return await runTransaction(db, callback);
  } catch (error) {
    console.error('Error running transaction:', error);
    throw error;
  }
};

// Statistics functions
export const getCollectionStats = async (
  collectionName: string
): Promise<{ count: number }> => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return { count: snapshot.size };
  } catch (error) {
    console.error(`Error getting stats for ${collectionName}:`, error);
    throw error;
  }
};

// Entity-specific query functions
export const getFeaturedProducts = async (limit: number = 3): Promise<Product[]> => {
  return queryDocuments<Product>(COLLECTIONS.PRODUCTS, {
    filters: [{ field: 'featured', operator: '==', value: true }],
    limitTo: limit
  });
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return queryDocuments<Product>(COLLECTIONS.PRODUCTS, {
    filters: [{ field: 'category', operator: '==', value: category }]
  });
};

export const getFeaturedServices = async (limit: number = 3): Promise<Service[]> => {
  return queryDocuments<Service>(COLLECTIONS.SERVICES, {
    filters: [{ field: 'featured', operator: '==', value: true }],
    limitTo: limit
  });
};

export const getUnreadMessages = async (): Promise<Message[]> => {
  return queryDocuments<Message>(COLLECTIONS.MESSAGES, {
    filters: [{ field: 'read', operator: '==', value: false }],
    orderByField: 'createdAt',
    orderDirection: 'desc'
  });
};

export const getRecentOrders = async (limit: number = 10): Promise<Order[]> => {
  return queryDocuments<Order>(COLLECTIONS.ORDERS, {
    orderByField: 'createdAt',
    orderDirection: 'desc',
    limitTo: limit
  });
};

export const getOrdersByStatus = async (
  status: Order['status']
): Promise<Order[]> => {
  return queryDocuments<Order>(COLLECTIONS.ORDERS, {
    filters: [{ field: 'status', operator: '==', value: status }],
    orderByField: 'createdAt',
    orderDirection: 'desc'
  });
};

// Helper for setting up the initial admin account
export const setupAdminAccount = async (
  uid: string,
  userData: { email: string; displayName: string }
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await updateDoc(userRef, {
        ...userData,
        isAdmin: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`Admin account set up for ${userData.email}`);
    } else {
      // Update existing user to be admin
      await updateDoc(userRef, {
        isAdmin: true,
        updatedAt: serverTimestamp()
      });
      console.log(`Updated existing user to admin: ${userData.email}`);
    }
  } catch (error) {
    console.error('Error setting up admin account:', error);
    throw error;
  }
};
