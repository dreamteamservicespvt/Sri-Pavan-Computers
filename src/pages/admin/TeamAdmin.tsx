  import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  AlertTriangle,
  Upload,
  Loader2,
  Users,
  X,
  Image as ImageIcon,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '@/lib/firebase';
import { TeamMember } from '@/lib/firebase-admin';

const TeamAdmin: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showMemberDialog, setShowMemberDialog] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      website: ''
    }
  });
  
  const { toast } = useToast();
  const storage = getStorage();

  // Fetch team members
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const teamSnapshot = await getDocs(collection(db, "team"));
        const teamData = teamSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as TeamMember[];
        
        setTeamMembers(teamData);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError("Failed to load team members. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle social link changes
  const handleSocialLinkChange = (network: string, value: string) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [network]: value
      }
    });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setImageFile(e.target.files[0]);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      bio: '',
      socialLinks: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        website: ''
      }
    });
    setImageFile(null);
    setSelectedMember(null);
    setIsEditMode(false);
  };

  // Open create dialog
  const openCreateDialog = () => {
    resetForm();
    setShowMemberDialog(true);
  };

  // Open edit dialog
  const openEditDialog = (member: TeamMember) => {
    setSelectedMember(member);
    setIsEditMode(true);
    
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      socialLinks: {
        facebook: member.socialLinks?.facebook || '',
        twitter: member.socialLinks?.twitter || '',
        instagram: member.socialLinks?.instagram || '',
        linkedin: member.socialLinks?.linkedin || '',
        website: member.socialLinks?.website || ''
      }
    });
    
    setShowMemberDialog(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate form
      if (!formData.name.trim() || !formData.position.trim()) {
        toast({
          title: "Missing Information",
          description: "Name and position are required",
          variant: "destructive",
        });
        return;
      }
      
      let imageUrl = isEditMode && selectedMember ? selectedMember.image : '';
      
      // Upload image if provided
      if (imageFile) {
        const storageRef = ref(storage, `team/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
        
        // Delete old image if exists and being replaced
        if (isEditMode && selectedMember?.image) {
          try {
            const oldImageRef = ref(storage, selectedMember.image);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.error("Error deleting old image:", error);
            // Continue even if deletion fails
          }
        }
      }
      
      if (isEditMode && selectedMember) {
        // Update existing team member
        const memberRef = doc(db, "team", selectedMember.id);
        await updateDoc(memberRef, {
          name: formData.name,
          position: formData.position,
          bio: formData.bio,
          socialLinks: formData.socialLinks,
          image: imageUrl,
          updatedAt: Timestamp.now()
        });
        
        // Update local state
        setTeamMembers(prev => 
          prev.map(member => 
            member.id === selectedMember.id 
              ? {
                  ...member,
                  name: formData.name,
                  position: formData.position,
                  bio: formData.bio,
                  socialLinks: formData.socialLinks,
                  image: imageUrl,
                  updatedAt: Timestamp.now()
                } 
              : member
          )
        );
        
        toast({
          title: "Team Member Updated",
          description: "The team member has been updated successfully",
        });
      } else {
        // Add new team member
        const newMember = {
          name: formData.name,
          position: formData.position,
          bio: formData.bio,
          socialLinks: formData.socialLinks,
          image: imageUrl,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        };
        
        const docRef = await addDoc(collection(db, "team"), newMember);
        
        // Update local state
        setTeamMembers([...teamMembers, { id: docRef.id, ...newMember } as TeamMember]);
        
        toast({
          title: "Team Member Added",
          description: "The new team member has been added successfully",
        });
      }
      
      // Reset and close dialog
      resetForm();
      setShowMemberDialog(false);
      
    } catch (error) {
      console.error("Error saving team member:", error);
      toast({
        title: "Error",
        description: "Failed to save the team member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete team member
  const handleDeleteMember = async (memberId: string, imageUrl?: string) => {
    if (!window.confirm("Are you sure you want to delete this team member? This action cannot be undone.")) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Delete from Firestore
      await deleteDoc(doc(db, "team", memberId));
      
      // Delete image from storage if exists
      if (imageUrl) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        } catch (error) {
          console.error("Error deleting image:", error);
          // Continue even if image deletion fails
        }
      }
      
      // Update local state
      setTeamMembers(teamMembers.filter(member => member.id !== memberId));
      
      toast({
        title: "Team Member Deleted",
        description: "The team member has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast({
        title: "Error",
        description: "Failed to delete the team member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter team members by search
  const filteredMembers = teamMembers.filter(member => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchLower) ||
      member.position.toLowerCase().includes(searchLower) ||
      (member.bio && member.bio.toLowerCase().includes(searchLower))
    );
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading team members...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full p-8 flex flex-col items-center justify-center text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button 
          onClick={() => window.location.reload()}
          variant="default"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search team members..." 
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <Button 
            onClick={openCreateDialog}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
        </div>
      </div>
      
      {/* Team members grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {filteredMembers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? "Try adjusting your search" 
                : "Start by adding team members to your organization"}
            </p>
            {searchQuery ? (
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            ) : (
              <Button 
                onClick={openCreateDialog}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Team Member
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-gray-400">
                      <Users className="h-16 w-16 mb-2" />
                      <span>No image</span>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <Badge variant="outline" className="mt-1 w-fit">{member.position}</Badge>
                </CardHeader>
                
                <CardContent>
                  {member.bio && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                  
                  {/* Social links */}
                  {member.socialLinks && Object.values(member.socialLinks).some(link => link) && (
                    <div className="flex gap-2 mb-4">
                      {member.socialLinks.facebook && (
                        <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">
                          <Facebook className="h-4 w-4" />
                        </Badge>
                      )}
                      {member.socialLinks.twitter && (
                        <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">
                          <Twitter className="h-4 w-4" />
                        </Badge>
                      )}
                      {member.socialLinks.instagram && (
                        <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">
                          <Instagram className="h-4 w-4" />
                        </Badge>
                      )}
                      {member.socialLinks.linkedin && (
                        <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">
                          <Linkedin className="h-4 w-4" />
                        </Badge>
                      )}
                      {member.socialLinks.website && (
                        <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">
                          <Globe className="h-4 w-4" />
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openEditDialog(member)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteMember(member.id, member.image)}
                      disabled={isSubmitting}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Team Member Dialog - Create/Edit */}
      <Dialog open={showMemberDialog} onOpenChange={setShowMemberDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Update the team member information below" 
                : "Fill in the details to add a new team member"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input 
                  id="position" 
                  name="position" 
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Enter job position"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Enter a brief biography"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Profile Image</Label>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image')?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {imageFile ? 'Change Image' : 'Upload Image'}
                    </Button>
                  </div>
                  
                  <div className="h-20 w-20 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                    {imageFile ? (
                      <img 
                        src={URL.createObjectURL(imageFile)} 
                        alt="Preview" 
                        className="h-full w-full object-cover"
                      />
                    ) : isEditMode && selectedMember?.image ? (
                      <img 
                        src={selectedMember.image} 
                        alt="Current Image" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Social Media Links</Label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center">
                    <div className="w-10 flex-shrink-0">
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </div>
                    <Input 
                      placeholder="Facebook URL"
                      value={formData.socialLinks.facebook}
                      onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 flex-shrink-0">
                      <Twitter className="h-5 w-5 text-blue-400" />
                    </div>
                    <Input 
                      placeholder="Twitter URL"
                      value={formData.socialLinks.twitter}
                      onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 flex-shrink-0">
                      <Instagram className="h-5 w-5 text-pink-500" />
                    </div>
                    <Input 
                      placeholder="Instagram URL"
                      value={formData.socialLinks.instagram}
                      onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 flex-shrink-0">
                      <Linkedin className="h-5 w-5 text-blue-700" />
                    </div>
                    <Input 
                      placeholder="LinkedIn URL"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 flex-shrink-0">
                      <Globe className="h-5 w-5 text-gray-600" />
                    </div>
                    <Input 
                      placeholder="Website URL"
                      value={formData.socialLinks.website}
                      onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setShowMemberDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Update Member' : 'Add Member'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamAdmin;
