import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getLeadById } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Mail, Phone, Building2, Calendar, User, MessageSquare, PhoneCall, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LeadStatus } from '@/types/lead';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const lead = getLeadById(id || '');

  const [newActivity, setNewActivity] = useState({ type: 'note', content: '' });

  if (!lead) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Lead not found</h2>
        <Button onClick={() => navigate('/leads')} className="mt-4">
          Back to Leads
        </Button>
      </div>
    );
  }

  const handleAddActivity = () => {
    if (!newActivity.content.trim()) {
      toast({
        title: 'Error',
        description: 'Activity content cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Activity added',
      description: 'New activity has been added successfully',
    });
    setNewActivity({ type: 'note', content: '' });
  };

  const handleStatusChange = (newStatus: LeadStatus) => {
    toast({
      title: 'Status updated',
      description: `Lead status changed to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/leads')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{lead.name}</h1>
          <p className="text-muted-foreground mt-1">{lead.company}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lead Info Card */}
        <Card className="lg:col-span-1 shadow-enterprise">
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
            <CardDescription>Contact and assignment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <p className="text-sm font-medium">{lead.email}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              <p className="text-sm font-medium">{lead.phone}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company
              </Label>
              <p className="text-sm font-medium">{lead.company}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Owner
              </Label>
              <p className="text-sm font-medium">{lead.owner}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Created
              </Label>
              <p className="text-sm font-medium">{lead.createdAt.toLocaleDateString()}</p>
            </div>

            <div className="space-y-2 pt-4">
              <Label>Change Status</Label>
              <Select value={lead.status} onValueChange={(value) => handleStatusChange(value as LeadStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="CONTACTED">Contacted</SelectItem>
                  <SelectItem value="QUALIFIED">Qualified</SelectItem>
                  <SelectItem value="WON">Won</SelectItem>
                  <SelectItem value="LOST">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card className="lg:col-span-2 shadow-enterprise">
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Track all interactions and notes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="calls">Calls</TabsTrigger>
                <TabsTrigger value="meetings">Meetings</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {lead.activities.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No activities yet</p>
                ) : (
                  <div className="space-y-4">
                    {lead.activities.map((activity) => {
                      const Icon = activity.type === 'call' ? PhoneCall : activity.type === 'meeting' ? Users : MessageSquare;
                      return (
                        <div key={activity.id} className="flex gap-4 rounded-lg border border-border bg-muted/30 p-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium uppercase text-muted-foreground">{activity.type}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{activity.createdAt.toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm">{activity.content}</p>
                            <p className="text-xs text-muted-foreground">by {activity.createdBy}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                {lead.activities
                  .filter((a) => a.type === 'note')
                  .map((activity) => (
                    <div key={activity.id} className="rounded-lg border border-border bg-muted/30 p-4">
                      <p className="text-sm">{activity.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {activity.createdAt.toLocaleDateString()} by {activity.createdBy}
                      </p>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="calls" className="space-y-4">
                {lead.activities
                  .filter((a) => a.type === 'call')
                  .map((activity) => (
                    <div key={activity.id} className="rounded-lg border border-border bg-muted/30 p-4">
                      <p className="text-sm">{activity.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {activity.createdAt.toLocaleDateString()} by {activity.createdBy}
                      </p>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="meetings" className="space-y-4">
                {lead.activities
                  .filter((a) => a.type === 'meeting')
                  .map((activity) => (
                    <div key={activity.id} className="rounded-lg border border-border bg-muted/30 p-4">
                      <p className="text-sm">{activity.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {activity.createdAt.toLocaleDateString()} by {activity.createdBy}
                      </p>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>

            {/* Add Activity Form */}
            <div className="mt-6 space-y-4 rounded-lg border border-border bg-accent/30 p-4">
              <h3 className="font-semibold">Add New Activity</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Activity Type</Label>
                  <Select value={newActivity.type} onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="note">Note</SelectItem>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    placeholder="Enter activity details..."
                    value={newActivity.content}
                    onChange={(e) => setNewActivity({ ...newActivity, content: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button onClick={handleAddActivity} className="w-full">
                  Add Activity
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadDetail;
