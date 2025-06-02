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
  Timestamp,
  serverTimestamp,
  setDoc,
  where
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Collection name for team members
const COLLECTION_NAME = 'team';

// Flag to track if we're using mock data
let usingMockData = false;

// Interface definitions
export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  email?: string;
  facebook?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  order?: number;
  socialLinks?: SocialLinks;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Mock data for team members
const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Srikanth Varma",
    position: "Founder & CEO",
    bio: "With over 20 years in the IT industry, Srikanth leads our company with expertise and vision. He founded Sri Pavan Computers in 2000 with a mission to provide quality technology solutions to the region.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974",
    order: 1,
    socialLinks: {
      linkedin: " ",
      twitter: " ",
      email: "sales@sripavancomputers.in"
    }
  },
  {
    id: "2",
    name: "Priya Reddy",
    position: "Technical Director",
    bio: "Priya oversees all technical operations and ensures top-quality service delivery. With her expertise in hardware and networking, she has been instrumental in our growth since 2005.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
    order: 2,
    socialLinks: {
      linkedin: " ",
      twitter: " ",
      email: "sales@sripavancomputers.in"
    }
  },
  {
    id: "3",
    name: "Rajesh Kumar",
    position: "Customer Relations Manager",
    bio: "Rajesh ensures our customers receive exceptional service and support. His people-first approach has helped us maintain a loyal customer base for over a decade.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974",
    order: 3,
    socialLinks: {
      linkedin: " ",
      twitter: " ",
      email: "sales@sripavancomputers.in"
    }
  },
];

/**
 * Fetch team members data 
 * Uses Firebase if connected, otherwise falls back to mock data
 */
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    console.log("Attempting to fetch team members from Firebase...");
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('order', 'asc'), // Order by position
      orderBy('createdAt', 'desc') // Then by creation date
    );
    
    const querySnapshot = await getDocs(q);
    
    // If we got data from Firebase, use it
    if (!querySnapshot.empty) {
      console.log(`Found ${querySnapshot.docs.length} team members in Firebase`);
      usingMockData = false;
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as TeamMember));
    }
    
    // If Firebase returned empty but connected, seed with mock data
    console.log("No team members found in Firebase, using mock data");
    usingMockData = true;
    
    // Create mock data in Firebase for future use
    try {
      console.log("Seeding Firebase with mock team data...");
      for (const member of mockTeamMembers) {
        const { id, ...memberWithoutId } = member;
        await setDoc(doc(db, COLLECTION_NAME, id), {
          ...memberWithoutId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      console.log("Successfully seeded Firebase with mock team data");
    } catch (seedError) {
      console.warn("Failed to seed Firebase with mock data:", seedError);
    }
    
    // Return mock data
    return mockTeamMembers;
  } catch (error) {
    console.warn('Error fetching team members from Firebase:', error);
    console.warn('Falling back to mock data');
    usingMockData = true;
    
    // Fallback to mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTeamMembers);
      }, 800);
    });
  }
};

// Get a specific team member by ID
export async function getTeamMember(id: string): Promise<TeamMember | null> {
  try {
    console.log(`Fetching team member with ID: ${id}`);
    // Check if we're using mock data
    if (usingMockData) {
      const mockMember = mockTeamMembers.find(member => member.id === id);
      return mockMember || null;
    }
    
    const teamMemberDoc = await getDoc(doc(db, COLLECTION_NAME, id));
    
    if (teamMemberDoc.exists()) {
      return { 
        id: teamMemberDoc.id, 
        ...teamMemberDoc.data() 
      } as TeamMember;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching team member with ID ${id}:`, error);
    throw error;
  }
}

// Add a new team member
export async function addTeamMember(teamMember: Omit<TeamMember, 'id'>): Promise<string> {
  try {
    console.log("Adding new team member:", teamMember);
    // Ensure we have all required fields
    if (!teamMember.name || !teamMember.position || !teamMember.bio || !teamMember.image) {
      throw new Error("Missing required team member fields");
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...teamMember,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log(`Team member added with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
}

// Update an existing team member
export async function updateTeamMember(id: string, teamMember: Partial<TeamMember>): Promise<void> {
  try {
    console.log(`Updating team member with ID: ${id}`, teamMember);
    const teamMemberRef = doc(db, COLLECTION_NAME, id);
    
    // Check if document exists before updating
    const docSnapshot = await getDoc(teamMemberRef);
    
    if (docSnapshot.exists()) {
      console.log("Document exists, updating it...");
      // Format social links if they exist
      let updateData: any = {
        ...teamMember,
        updatedAt: serverTimestamp()
      };

      // Make sure we're not accidentally setting socialLinks to an empty object
      if (teamMember.socialLinks && Object.keys(teamMember.socialLinks).length === 0) {
        delete updateData.socialLinks;
      }
      
      await updateDoc(teamMemberRef, updateData);
      console.log(`Team member ${id} updated successfully`);
    } else {
      // Document doesn't exist, create it
      console.log(`Document with ID ${id} doesn't exist, creating it...`);
      await setDoc(teamMemberRef, {
        ...teamMember,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`Team member ${id} created successfully`);
    }
  } catch (error) {
    console.error(`Error updating team member with ID ${id}:`, error);
    throw error;
  }
}

// Delete a team member
export async function deleteTeamMember(id: string): Promise<void> {
  try {
    console.log(`Deleting team member with ID: ${id}`);
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    console.log(`Team member ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting team member with ID ${id}:`, error);
    throw error;
  }
}

// Get the next available order number
export async function getNextOrderNumber(): Promise<number> {
  try {
    const teamMembers = await getTeamMembers();
    const maxOrder = teamMembers.reduce(
      (max, member) => (member.order && member.order > max ? member.order : max), 
      0
    );
    return maxOrder + 1;
  } catch (error) {
    console.error('Error calculating next order number:', error);
    return 1; // Default to 1 if we can't determine
  }
}

// Reorder team members
export async function reorderTeamMembers(orderedIds: string[]): Promise<void> {
  try {
    for (let i = 0; i < orderedIds.length; i++) {
      const teamMemberRef = doc(db, COLLECTION_NAME, orderedIds[i]);
      await updateDoc(teamMemberRef, {
        order: i + 1,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error reordering team members:', error);
    throw error;
  }
}
