import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

import { Search, PlusCircle, Pencil, Trash, FileEdit, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import TeamForm, { TeamFormValues } from '@/components/admin/TeamForm';
import { TeamMember, getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember, getNextOrderNumber } from '@/services/teamMemberService';

const TeamAdmin = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [activeTab, setActiveTab] = useState('table');

  // Fetch team members on component mount
  useEffect(() => {
    loadTeamMembers();
  }, []);

  // Filter members when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMembers(teamMembers);
      return;
    }
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = teamMembers.filter(member => 
      member.name.toLowerCase().includes(lowerCaseQuery) ||
      member.position.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredMembers(filtered);
  }, [searchQuery, teamMembers]);

  // Load team members from Firebase
  const loadTeamMembers = async () => {
    setIsLoading(true);
    try {
      const members = await getTeamMembers();
      setTeamMembers(members);
      setFilteredMembers(members);
    } catch (error) {
      console.error('Error loading team members:', error);
      toast({
        title: "Error",
        description: "Failed to load team members. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission (add/edit)
  const handleSubmit = async (data: TeamFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Handling team member submission:", data);
      
      // Create a formatted socialLinks object
      const socialLinks = {
        linkedin: data.linkedin || '',
        twitter: data.twitter || '',
        email: data.email || '',
      };
      
      if (currentMember) {
        // Update existing member
        console.log(`Updating team member with ID: ${currentMember.id}`);
        await updateTeamMember(currentMember.id!, {
          name: data.name,
          position: data.position,
          bio: data.bio,
          image: data.image,
          socialLinks
        });

        toast({
          title: "Success",
          description: `${data.name} has been updated.`,
        });
      } else {
        // Add new member
        const nextOrder = await getNextOrderNumber();
        console.log("Adding new team member, order:", nextOrder);
        await addTeamMember({
          name: data.name,
          position: data.position,
          bio: data.bio,
          image: data.image,
          socialLinks,
          order: nextOrder
        });

        toast({
          title: "Success",
          description: `${data.name} has been added to the team.`,
        });
      }

      // Reload team members and reset form
      await loadTeamMembers();
      setOpenDialog(false);
      setCurrentMember(null);
    } catch (error) {
      console.error('Error submitting team member:', error);
      toast({
        title: "Error",
        description: "Failed to save team member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit button click
  const handleEdit = (member: TeamMember) => {
    setCurrentMember(member);
    setOpenDialog(true);
  };

  // Handle delete button click
  const handleDeleteClick = (member: TeamMember) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (!memberToDelete) return;
    
    try {
      await deleteTeamMember(memberToDelete.id!);
      toast({
        title: "Success",
        description: `${memberToDelete.name} has been removed from the team.`,
      });
      
      // Reload team members
      loadTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        title: "Error",
        description: "Failed to delete team member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Leadership Team Management</h1>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentMember ? `Edit ${currentMember.name}` : 'Add New Team Member'}
              </DialogTitle>
            </DialogHeader>
            
            <TeamForm 
              defaultValues={currentMember ? {
                name: currentMember.name,
                position: currentMember.position,
                bio: currentMember.bio,
                image: currentMember.image,
                linkedin: currentMember.socialLinks?.linkedin || '',
                twitter: currentMember.socialLinks?.twitter || '',
                email: currentMember.socialLinks?.email || '',
              } : undefined}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search team members..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="ml-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="table" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage your leadership team displayed on the About page.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Bio</TableHead>
                        <TableHead className="w-24">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={member.image} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{member.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{member.position}</TableCell>
                            <TableCell className="max-w-xs truncate">{member.bio}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleEdit(member)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() => handleDeleteClick(member)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                            {searchQuery ? 'No team members matched your search' : 'No team members added yet'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <Card key={member.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button 
                            variant="secondary" 
                            size="icon"
                            className="h-8 w-8 bg-white/80 backdrop-blur-sm"
                            onClick={() => handleEdit(member)}
                          >
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon"
                            className="h-8 w-8 bg-white/80 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => handleDeleteClick(member)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.position}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 line-clamp-3">{member.bio}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center py-12 text-gray-500">
                    {searchQuery ? 'No team members matched your search' : 'No team members added yet'}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Delete confirmation dialog */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will remove {memberToDelete?.name} from the leadership team. 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
};

export default TeamAdmin;
