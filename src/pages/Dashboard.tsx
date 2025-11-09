import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockLeads } from '@/data/mockData';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatusBadge } from '@/components/StatusBadge';

const Dashboard = () => {
  // Calculate KPIs
  const totalLeads = mockLeads.length;
  const wonDeals = mockLeads.filter((l) => l.status === 'WON').length;
  const lostDeals = mockLeads.filter((l) => l.status === 'LOST').length;
  const qualifiedLeads = mockLeads.filter((l) => l.status === 'QUALIFIED').length;
  const conversionRate = totalLeads > 0 ? ((wonDeals / totalLeads) * 100).toFixed(1) : '0';

  // Status distribution for bar chart
  const statusData = [
    { name: 'New', count: mockLeads.filter((l) => l.status === 'NEW').length },
    { name: 'Contacted', count: mockLeads.filter((l) => l.status === 'CONTACTED').length },
    { name: 'Qualified', count: mockLeads.filter((l) => l.status === 'QUALIFIED').length },
    { name: 'Won', count: mockLeads.filter((l) => l.status === 'WON').length },
    { name: 'Lost', count: mockLeads.filter((l) => l.status === 'LOST').length },
  ];

  // Success ratio for pie chart
  const successData = [
    { name: 'Won', value: wonDeals, color: '#10b981' },
    { name: 'Lost', value: lostDeals, color: '#ef4444' },
    { name: 'In Progress', value: totalLeads - wonDeals - lostDeals, color: '#3b82f6' },
  ];

  // Recent activities
  const recentActivities = mockLeads
    .flatMap((lead) =>
      lead.activities.map((activity) => ({
        ...activity,
        leadName: lead.name,
        leadStatus: lead.status,
      }))
    )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your sales overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="shadow-enterprise">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>

        <Card className="shadow-enterprise">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Won Deals</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{wonDeals}</div>
          </CardContent>
        </Card>

        <Card className="shadow-enterprise">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lost Deals</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{lostDeals}</div>
          </CardContent>
        </Card>

        <Card className="shadow-enterprise">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Qualified</CardTitle>
            <Target className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{qualifiedLeads}</div>
          </CardContent>
        </Card>

        <Card className="shadow-enterprise">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{conversionRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bar Chart */}
        <Card className="shadow-enterprise">
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
            <CardDescription>Overview of leads across all stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-enterprise">
          <CardHeader>
            <CardTitle>Success Ratio</CardTitle>
            <CardDescription>Win/Loss distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={successData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {successData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="shadow-enterprise">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest updates across all leads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{activity.leadName}</p>
                    <StatusBadge status={activity.leadStatus} />
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.type.toUpperCase()} • {activity.createdBy} • {activity.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
