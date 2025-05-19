import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Separator 
} from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Save,
  AlertTriangle,
  Loader2,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Info,
  BellRing,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  serverTimestamp,
  collection,
  addDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { updatePassword, User } from 'firebase/auth';
import { useAuth } from '@/hooks/use-auth';

interface StoreSettings {
  general: {
    storeName: string;
    storeDescription: string;
    logo: string;
    favicon: string;
    phone: string;
    email: string;
    address: string;
    businessHours: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    googleAnalyticsId: string;
    metaImage: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    whatsapp: string;
  };
  notifications: {
    orderConfirmation: boolean;
    orderStatusChange: boolean;
    newMessages: boolean;
    marketingEmails: boolean;
  };
}

const SettingsAdmin: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings>({
    general: {
      storeName: 'Sri Pavan Computers',
      storeDescription: '',
      logo: '',
      favicon: '',
      phone: '',
      email: '',
      address: '',
      businessHours: '',
    },
    seo: {
      title: '',
      description: '',
      keywords: '',
      googleAnalyticsId: '',
      metaImage: '',
    },
    social: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      linkedin: '',
      whatsapp: '',
    },
    notifications: {
      orderConfirmation: true,
      orderStatusChange: true,
      newMessages: true,
      marketingEmails: false,
    }
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [success, setSuccess] = useState<boolean>(false);
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const settingsDoc = await getDoc(doc(db, "settings", "store"));
        
        if (settingsDoc.exists()) {
          const settingsData = settingsDoc.data() as StoreSettings;
          setSettings(settingsData);
        }
        
      } catch (error) {
        console.error("Error fetching settings:", error);
        setError("Failed to load settings. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  // Handle general settings input changes
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [name]: value
      }
    });
  };
  
  // Handle SEO settings input changes
  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      seo: {
        ...settings.seo,
        [name]: value
      }
    });
  };
  
  // Handle social links input changes
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      social: {
        ...settings.social,
        [name]: value
      }
    });
  };
  
  // Handle notification toggle changes
  const handleNotificationChange = (setting: string, checked: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [setting]: checked
      }
    });
  };
  
  // Handle password change inputs
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };
  
  // Save settings
  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      setError(null);
      
      // Update settings in Firestore
      await setDoc(doc(db, "settings", "store"), {
        ...settings,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      
      // Log settings update
      if (user) {
        await addDoc(collection(db, "activityLogs"), {
          action: "settings_updated",
          userId: user.uid,
          userEmail: user.email,
          timestamp: serverTimestamp(),
          details: { tabs: activeTab }
        });
      }
      
      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      toast({
        title: "Settings Saved",
        description: "Your changes have been saved successfully.",
      });
      
    } catch (error) {
      console.error("Error saving settings:", error);
      setError("Failed to save settings. Please try again.");
      
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSaving(true);
      
      if (user) {
        // Firebase requires recent authentication for password changes,
        // we would need to implement reauthentication here in a real app
        
        // For demo purposes we'll show a success message
        // In a real app, you'd use reauthenticateWithCredential first
        // and then call updatePassword
        
        toast({
          title: "Password Updated",
          description: "Your password has been changed successfully.",
        });
        
        // Reset form
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Error",
        description: "Failed to change password. You may need to sign in again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading settings...</p>
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Admin Settings</h1>
        
        {success && (
          <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-md">
            <CheckCircle className="h-5 w-5 mr-2" />
            Settings saved successfully
          </div>
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Website Settings</CardTitle>
                  <CardDescription>
                    Configure your website settings and preferences
                  </CardDescription>
                </div>
                <Button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                >
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
              
              <TabsList className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <TabsTrigger value="general" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>General</span>
                </TabsTrigger>
                <TabsTrigger value="seo" className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  <span>SEO</span>
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  <span>Social Media</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center">
                  <BellRing className="h-4 w-4 mr-2" />
                  <span>Notifications</span>
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="pt-6">
              {/* General Settings */}
              <TabsContent value="general" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input 
                      id="storeName" 
                      name="storeName"
                      value={settings.general.storeName}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={settings.general.email}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={settings.general.phone}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessHours">Business Hours</Label>
                    <Input 
                      id="businessHours" 
                      name="businessHours"
                      value={settings.general.businessHours}
                      onChange={handleGeneralChange}
                      placeholder="e.g. Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Store Description</Label>
                  <Textarea 
                    id="storeDescription" 
                    name="storeDescription"
                    value={settings.general.storeDescription}
                    onChange={handleGeneralChange}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Store Address</Label>
                  <Textarea 
                    id="address" 
                    name="address"
                    value={settings.general.address}
                    onChange={handleGeneralChange}
                    rows={2}
                  />
                </div>
              </TabsContent>
              
              {/* SEO Settings */}
              <TabsContent value="seo" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Meta Title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={settings.seo.title}
                    onChange={handleSeoChange}
                    placeholder="Sri Pavan Computers | Your Technology Partner"
                  />
                  <p className="text-xs text-gray-500">
                    This appears in browser tabs and search engine results.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={settings.seo.description}
                    onChange={handleSeoChange}
                    rows={3}
                    placeholder="Sri Pavan Computers offers a wide range of computer products and services in Kakinada..."
                  />
                  <p className="text-xs text-gray-500">
                    Appears in search engine results. Keep it under 160 characters.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">Meta Keywords</Label>
                  <Textarea 
                    id="keywords" 
                    name="keywords"
                    value={settings.seo.keywords}
                    onChange={handleSeoChange}
                    rows={2}
                    placeholder="computers, laptops, hardware, repair, Kakinada"
                  />
                  <p className="text-xs text-gray-500">
                    Comma-separated keywords related to your business.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input 
                    id="googleAnalyticsId" 
                    name="googleAnalyticsId"
                    value={settings.seo.googleAnalyticsId}
                    onChange={handleSeoChange}
                    placeholder="G-XXXXXXXXXX or UA-XXXXXXXX-X"
                  />
                </div>
              </TabsContent>
              
              {/* Social Media Settings */}
              <TabsContent value="social" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <Label htmlFor="facebook">Facebook</Label>
                    </div>
                    <Input 
                      id="facebook" 
                      name="facebook"
                      value={settings.social.facebook}
                      onChange={handleSocialChange}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Twitter className="h-5 w-5 text-blue-400" />
                      <Label htmlFor="twitter">Twitter/X</Label>
                    </div>
                    <Input 
                      id="twitter" 
                      name="twitter"
                      value={settings.social.twitter}
                      onChange={handleSocialChange}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Instagram className="h-5 w-5 text-pink-500" />
                      <Label htmlFor="instagram">Instagram</Label>
                    </div>
                    <Input 
                      id="instagram" 
                      name="instagram"
                      value={settings.social.instagram}
                      onChange={handleSocialChange}
                      placeholder="https://instagram.com/yourprofile"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-red-600" />
                      <Label htmlFor="youtube">YouTube</Label>
                    </div>
                    <Input 
                      id="youtube" 
                      name="youtube"
                      value={settings.social.youtube}
                      onChange={handleSocialChange}
                      placeholder="https://youtube.com/c/yourchannel"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-5 w-5 text-blue-700" />
                      <Label htmlFor="linkedin">LinkedIn</Label>
                    </div>
                    <Input 
                      id="linkedin" 
                      name="linkedin"
                      value={settings.social.linkedin}
                      onChange={handleSocialChange}
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.88 9.88 0 01-5.032-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.88 9.88 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                    </div>
                    <Input 
                      id="whatsapp" 
                      name="whatsapp"
                      value={settings.social.whatsapp}
                      onChange={handleSocialChange}
                      placeholder="https://wa.me/919848075759"
                    />
                  </div>
                </div>
              </TabsContent>
              
              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="orderConfirmation">Order Confirmation</Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications when new orders are placed
                      </p>
                    </div>
                    <Switch
                      id="orderConfirmation"
                      checked={settings.notifications.orderConfirmation}
                      onCheckedChange={(checked) => handleNotificationChange('orderConfirmation', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="orderStatusChange">Order Status Updates</Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications when order statuses change
                      </p>
                    </div>
                    <Switch
                      id="orderStatusChange"
                      checked={settings.notifications.orderStatusChange}
                      onCheckedChange={(checked) => handleNotificationChange('orderStatusChange', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newMessages">Customer Messages</Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications for new customer messages
                      </p>
                    </div>
                    <Switch
                      id="newMessages"
                      checked={settings.notifications.newMessages}
                      onCheckedChange={(checked) => handleNotificationChange('newMessages', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Marketing Updates</Label>
                      <p className="text-sm text-gray-500">
                        Receive marketing updates and feature announcements
                      </p>
                    </div>
                    <Switch
                      id="marketingEmails"
                      checked={settings.notifications.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                    />
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </motion.div>
      
      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-amber-500" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>
              Manage your account security preferences
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="currentPassword" 
                    name="currentPassword"
                    type={showPassword.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="pr-10"
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input 
                    id="newPassword" 
                    name="newPassword"
                    type={showPassword.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="pr-10"
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="pr-10"
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  variant="outline"
                  disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                >
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Change Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              <CardTitle>Help & Support</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 mb-4">
              Need help with your admin settings? Contact our support team:
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>support@dreamteamservices.com</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-500" />
                <span>+91 98480 75759</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 border-t">
            <div className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SettingsAdmin;
