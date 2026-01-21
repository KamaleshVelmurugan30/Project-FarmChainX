import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MapPin, Phone, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapView } from '@/components/MapView';
import { useAppStore } from '@/store';
import { Farm, CreateFarmRequest } from '@/types';
import { farmService } from '@/services/farm.service';
import { toast } from '@/hooks/use-toast';
import { indianStates, getDistrictsByState, indiaBounds, isWithinIndia } from '@/data/indianLocations';

export default function FarmsPage() {
  const { farms, addFarm } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateFarmRequest>({
    name: '',
    lat: indiaBounds.center.lat,
    lng: indiaBounds.center.lng,
    state: '',
    district: '',
    taluk: '',
    village: '',
    pincode: '',
    address: '',
    contact: '',
  });
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const filteredFarms = farms.filter(
    (farm) =>
      farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const districts = formData.state ? getDistrictsByState(formData.state) : [];

  const handleStateChange = (stateCode: string) => {
    setFormData({ ...formData, state: stateCode, district: '' });
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (!isWithinIndia(lat, lng)) {
      toast({
        title: 'Invalid Location',
        description: 'Please select a location within India.',
        variant: 'destructive',
      });
      return;
    }
    setSelectedLocation({ lat, lng });
    setFormData((prev) => ({ ...prev, lat, lng }));
  };

  const validatePincode = (pincode: string): boolean => {
    return /^[1-9][0-9]{5}$/.test(pincode);
  };

  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.state || !formData.district) {
      toast({
        title: 'Missing Location',
        description: 'Please select state and district.',
        variant: 'destructive',
      });
      return;
    }

    if (!validatePincode(formData.pincode)) {
      toast({
        title: 'Invalid Pincode',
        description: 'Please enter a valid 6-digit Indian pincode.',
        variant: 'destructive',
      });
      return;
    }

    if (!isWithinIndia(formData.lat, formData.lng)) {
      toast({
        title: 'Invalid Location',
        description: 'Farm location must be within India.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const newFarm = await farmService.createFarm(formData);
      addFarm(newFarm);
      toast({
        title: 'Farm Created',
        description: `${newFarm.name} has been added successfully.`,
      });
      setIsCreateOpen(false);
      resetForm();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create farm. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      lat: indiaBounds.center.lat,
      lng: indiaBounds.center.lng,
      state: '',
      district: '',
      taluk: '',
      village: '',
      pincode: '',
      address: '',
      contact: '',
    });
    setSelectedLocation(null);
  };

  const selectedStateName = indianStates.find((s) => s.code === formData.state)?.name || '';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Farms</h1>
            <p className="text-muted-foreground">
              Manage your farms across India
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="farm">
                <Plus className="w-4 h-4 mr-2" />
                Add Farm
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Farm</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateFarm} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Farm Name</label>
                    <Input
                      id="name"
                      placeholder="Green Valley Farm"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact" className="text-sm font-medium">Contact</label>
                    <Input
                      id="contact"
                      placeholder="+91 98765 43210"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Indian Location Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Select value={formData.state} onValueChange={handleStateChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {indianStates.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">District</label>
                    <Select 
                      value={formData.district} 
                      onValueChange={(value) => setFormData({ ...formData, district: value })}
                      disabled={!formData.state}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={formData.state ? "Select District" : "Select State first"} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label htmlFor="taluk" className="text-sm font-medium">Taluk / Tehsil</label>
                    <Input
                      id="taluk"
                      placeholder="Enter Taluk"
                      value={formData.taluk}
                      onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="village" className="text-sm font-medium">Village</label>
                    <Input
                      id="village"
                      placeholder="Enter Village"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="pincode" className="text-sm font-medium">Pincode</label>
                    <Input
                      id="pincode"
                      placeholder="560001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">Full Address</label>
                  <Input
                    id="address"
                    placeholder="Survey No., Landmark, etc."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location on Map (Click to select within India)</label>
                  <MapView
                    center={[formData.lat, formData.lng]}
                    zoom={5}
                    onClick={handleMapClick}
                    selectedLocation={selectedLocation}
                    className="h-[200px] rounded-lg"
                    bounds={indiaBounds}
                  />
                  <p className="text-xs text-muted-foreground">
                    Coordinates: {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => { setIsCreateOpen(false); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="farm" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Farm'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search farms by name, village, district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Farms Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFarms.map((farm, index) => (
            <FarmCard key={farm.id} farm={farm} index={index} />
          ))}
        </div>

        {filteredFarms.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No farms found matching your search.</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

function FarmCard({ farm, index }: { farm: Farm; index: number }) {
  const stateName = indianStates.find((s) => s.code === farm.state)?.name || farm.state;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card variant="interactive" className="overflow-hidden">
        <div className="h-32 bg-muted relative">
          <MapView
            center={[farm.lat, farm.lng]}
            zoom={10}
            className="h-full w-full pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
        <CardHeader className="pb-2 -mt-8 relative z-10">
          <CardTitle className="flex items-center gap-2">
            {farm.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="line-clamp-2">
              <span className="font-medium">{farm.village}, {farm.taluk}</span>
              <br />
              <span>{farm.district}, {stateName} - {farm.pincode}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{farm.contact}</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{farm.totalBatches} batches</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/farms/${farm.id}`}>View Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
